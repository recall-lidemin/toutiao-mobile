<template>
  <!--  -->
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="successText">
      <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
        <!-- 循环生成内容 -->
        <van-cell-group>
          <van-cell v-for="item in articleList" :key="item.art_id.toString()" :to="`/article?artId=${item.art_id}`">
            <!-- 文章列表 -->
            <div class="article_item">
              <!-- 文章标题 -->
              <h3 class="van-ellipsis">{{ item.title }}</h3>
              <!-- 三图模式 -->
              <div class="img_box" v-if="item.cover.images.length === 3">
                <!-- vant组件库的图片组件,需要使用它的懒加载lazy-load -->
                <van-image lazy-load class="w33" fit="cover" :src="item2" v-for="item2 in item.cover.images" :key="item2" />
              </div>
              <!-- 单图模式 -->
              <div class="img_box" v-if="item.cover.images.length === 1">
                <van-image lazy-load class="w100" fit="cover" :src="item.cover.images[0]" />
              </div>
              <!-- 作者信息 -->
              <div class="info_box">
                <span>{{ item.aut_name }}</span>
                <span>{{ item.comm_count }}评论</span>
                <span>{{ item.pubdate | transTime }}</span>
                <!-- 叉号的显示应该根据登录状态判断，登录了才显示，没有登录不显示 -->
                <!-- 触发父组件事件，并传值文字id -->
                <span class="close" v-if="user.token" @click.stop="$emit('show',item.art_id.toString())">
                  <van-icon name="cross"></van-icon>
                </span>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>

</template>

<script>
import { getArticleList } from '@/api/article.js'
import { mapState } from 'vuex'
import EventBus from '@/utils/eventBus.js'
export default {
  // 接收父组件传递的频道id
  // 1.数组方式:props: ['channelId'],  // 字符串数组接收
  // 2.对象方式:key(props属性名):value(配置对象)
  props: {
    channelId: {
      required: true, // 规定该属性必须传
      type: Number, // 表示要传入的props的属性类型
      default: null
    }
  },
  data () {
    return {

      loading: false, // 表示是否正在加载
      finished: false, // 表示全部数据是否都被加载完成
      // 文章列表数组
      articleList: [],
      // 控制是否正在下拉刷新
      isLoading: false,
      // 下拉刷新显示文字
      successText: '',
      // 推荐文章接口参数
      articleParams: {
        channel_id: this.channelId,
        // 用来存放历史时间戳
        timestamp: this.timestamp || Date.now()
      },
      // 存放历史时间戳
      timestamp: null

    }
  },
  methods: {
    // 实现上拉刷新，获取数据，添加到尾部
    async onLoad () {
      await this.$sleep()
      // van-list有个bug，第一次加载必须要出现滚动条，不然以后触发不了load事件
      // 如果数据全部加载完毕，设置finished为true
      const res = await getArticleList(this.articleParams)
      // 判断历史时间戳,如果为0说明没有数据了,直接结束,并返回
      if (!res.pre_timestamp) {
        this.finished = true
        return
      }
      this.articleList.push(...res.results)
      this.timestamp = res.pre_timestamp
      this.loading = false
    },
    // 下拉刷新
    // 下拉刷新要获取最新的数据，直接替换原来数据
    async onRefresh () {
      await this.$sleep()
      const res = await getArticleList({
        channel_id: this.channelId,
        // 始终使用最新的时间戳
        timestamp: Date.now()
      })

      // 首先判断是否返回了新数据
      // 有,直接替换原来旧数据
      // 没有,提示没有最新数据
      if (res.results.length) {
        this.articleList = res.results
        // 覆盖旧数据后,如果返回了新数据,要判断是否有历史时间戳,如果有,需要唤醒之前关闭的finished
        if (res.pre_timestamp) {
          this.finished = false
          this.timestamp = res.pre_timestamp
        }
        this.successText = `更新了${res.results.length}条数据`
      } else {
        this.successText = '当前已是最新数据'
      }
      // 关闭下拉加载状态
      this.isLoading = false
    }
  },

  created () {
    // 监听删除文章事件
    EventBus.$on('delArticle', (artId, channelId) => {
      // 判断传递过来的频道id是否等于自身频道
      if (this.channelId === channelId) {
        const articleIndex = this.articleList.findIndex(item => item.art_id.toString() === artId)
        if (articleIndex > -1) {
          this.articleList.splice(articleIndex, 1)
        }
        if (this.articleList.length < 8) {
          this.onLoad()
        }
      }
    })
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>

<template>
  <div class="container">
    <van-tabs>
      <!-- v-for循环渲染tab页签 -->
      <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
       <!-- 文章列表 -->
       <!-- 组件传值props
            $emit()
        -->
        <ArticleList :channelId="item.id" @show = "show"></ArticleList>
      </van-tab>

    </van-tabs>
    <span class="bar_btn">
      <van-icon name="wap-nav" />
    </span>
    <!-- 更多操作弹层组件 -->
    <van-popup v-model="showMoreAction" style="width:80%" >
      <MoreAction @dislike = "dislike"></MoreAction>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/article-list.vue'
import MoreAction from './components/moreAction.vue'
import { getMyChannel } from '../../api/user.js'
import { dislike } from '../../api/article.js'

export default {
  components: {
    ArticleList,
    MoreAction
  },
  data () {
    return {
      // 频道列表数据
      channelList: [],
      // 控制是否显示弹层
      showMoreAction: false,
      // 接收存储子组件传递的文章id
      artId: null
    }
  },
  methods: {
    async getChannelList () {
      const res = await getMyChannel()
      this.channelList = res.channels
    },
    show (artId) {
      // 接收存储id
      this.artId = artId
      // 显示更多操作图层
      this.showMoreAction = true
    },
    async dislike () {
      try {
        const res = await dislike(this.artId)
        console.log(res)
        this.showMoreAction = false
        this.$notice({
          type: 'success',
          message: '操作成功'
        })
      } catch (error) {
        this.$notice({
          type: 'danger',
          message: '操作失败'
        })
      }
    }
  },
  created () {
    this.getChannelList()
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content{
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane{
    height: 100%;
    .scroll-wrapper{
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>

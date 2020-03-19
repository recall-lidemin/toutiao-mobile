<template>
  <!--  -->
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="successText">
      <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
        <!-- 循环生成内容 -->
        <van-cell-group>
          <van-cell v-for="item in articleList" :key="item">
            <!-- 文章列表 -->
            <div class="article_item">
              <!-- 文章标题 -->
              <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
              <!-- 三图模式 -->
              <div class="img_box">
                <!-- vant组件库的图片组件,需要使用它的懒加载 -->
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </div>
              <!-- 单图模式 -->
              <!-- <div class="img_box">
                <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </div> -->
              <!-- 作者信息 -->
              <div class="info_box">
                <span>你像一阵风</span>
                <span>8评论</span>
                <span>10分钟前</span>
                <span class="close">
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
export default {
  data () {
    return {
      loading: false, // 表示是否正在加载
      finished: false, // 表示全部数据是否都被加载完成
      // 文章列表数组
      articleList: [],
      // 控制是否正在下拉刷新
      isLoading: false,
      successText: ''
    }
  },
  methods: {
    // 实现上拉刷新，获取数据，添加到尾部
    onLoad () {
      // van-list有个bug，第一次加载必须要出现滚动条，不然以后触发不了load事件
      console.log('开始加载数据')
      // 如果数据全部加载完毕，设置finished为true
      if (this.articleList.length > 50) {
        this.finished = true
      } else {
        // 生成一个数组,添加数据
        const arrData = Array.from(Array(13), (value, index) => index + 1)
        this.articleList.push(...arrData)
        // 数据加载完毕，关loading
        this.loading = false
      }
    },
    // 下拉刷新
    // 下拉刷新要获取最新的数据，然后添加到头部
    onRefresh () {
      console.log('开始加载数据')
      setTimeout(() => {
        // 关闭加载状态
        this.isLoading = false
        this.successText = `更新了${arr.length}条数据`
      }, 500)
      const arr = Array.from(Array(5), (value, index) => '追加' + index)
      // 数据添加到头部
      this.articleList.unshift(...arr)
    }
  },
  created () {}
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

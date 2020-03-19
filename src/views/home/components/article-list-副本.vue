<template>
  <!--  -->
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="successText">
      <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
        <!-- 循环生成内容 -->
        <van-cell-group>
          <van-cell v-for="item in articleList" :key="item" title="美股又熔断了" :value="'天台排队'+ item"></van-cell>
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

<style>
</style>

<template>
  <!--  -->
  <div class="scroll-wrapper">
    <van-list v-model="loading" :finished="finished" @load="onLoad"></van-list>
  </div>

</template>

<script>
export default {
  data () {
    return {
      loading: false, // 表示是否正在加载
      finished: false // 表示全部数据是否都被加载完成
    }
  },
  methods: {
    onLoad () {
      // 一秒后关闭加载
      setTimeout(() => {
        this.finished = true
      }, 1000)
    }
  },
  created () { }
}
</script>

<style>
</style>

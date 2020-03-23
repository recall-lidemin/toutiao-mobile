<template>
  <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航 -->
    <van-search  placeholder="请输入搜索关键词" shape="round" v-model.trim="query" />

    <van-cell-group class="suggest-box" v-if="query">
      <van-cell icon="search">
        <span>j</span>ava
      </van-cell>
    </van-cell-group>
    <!--  -->
    <div class="history-box" v-else >
      <!-- 只有存在历史记录时才会显示 -->
      <div class="head" v-if="historyList.length">
        <span>历史记录</span>
        <van-icon name="delete" @click="clearAll"></van-icon>
      </div>
      <van-cell-group>
        <!-- 动态加载历史记录 -->
        <van-cell v-for="(item,index) in historyList" :key="index" @click="toResult(item)">
          <a class="word_btn">{{ item }}</a>
          <!-- 注册叉号删除事件 -->
          <van-icon class="close_btn" slot="right-icon" name="cross" @click.stop="delHistory(index)" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
// 存储搜索记录本地缓存的key
const key = 'toutiao-history'
export default {
  data () {
    return {
      // 查询字段
      query: '',
      // 存储历史记录
      historyList: []
    }
  },
  methods: {
    // 删除历史记录
    delHistory (index) {
      this.historyList.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(this.historyList))
    },
    // 清空历史记录
    clearAll () {
      this.historyList = []
      localStorage.setItem(key, JSON.stringify(this.historyList))
    },
    // 点击历史记录跳转到搜索结果页
    toResult (query) {
      // 当前路由页面信息对象 this.$route,包含当前页面路由的一些信息，path，query，fullPath等
      // 路由对象实例 this.$router
      // 路由传参：query传参
      // 1.地址拼接：this.$router.push(`/search/result?q=${item}`)
      // 2.对象形式：
      this.$router.push({
        path: '/search/result',
        query: {
          q: query
        }
      })
      // params传参
    }
  },
  created () {
    // 读取本地缓存数据
    this.historyList = JSON.parse(localStorage.getItem(key) || '[]')
  }
}
</script>

<style lang='less' scoped>
.history-box {
  padding: 0 20px;
  .head{
    line-height: 36px;
    color: #999;
    .van-icon{
      font-size: 16px;
      float: right;
      margin-top: 10px;;
    }
  }
  .van-cell{
    padding: 10px 0;
  }
  .word_btn{
    color:#3296fa;
  }
  .close_btn{
    margin-top:5px;
    color: #999;
  }
}
.suggest-box{
  /deep/ .van-cell{
    padding: 10px 20px;
    color: #999;
    p{
      span{
        color: red;
      }
    }
  }
}
</style>

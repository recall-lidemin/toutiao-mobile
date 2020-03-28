<template>
  <div class="container">
    <!-- 头部导航组件 -->
    <van-search class="search"
    @focus="$router.push('/search')"
    shape="round" background="rgb(243, 72, 72)"
    placeholder="请输入搜索关键词"
    v-if="$route.path!=='/user'" />

    <!-- <van-nav-bar title="头条" :fixed="true" v-if="$route.path!=='/user'"
      @click-right="$router.push('/search')">
      <van-icon name="search" slot="right" />
    </van-nav-bar> -->

    <!-- 二级路由容器占位符 -->
    <div class="my-wrapper" :class="{ noTop: $route.path === '/user' }">
      <!-- 使用keep-alive包裹后,里面得组件就不会被销毁了,这里把整个二级路由组件进行了缓存
           缓存得是虚拟DOM
       -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <!-- 顶部标签栏组件 -->
    <van-tabbar route>
      <van-tabbar-item to="/" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  // 控制二级路由容器的高宽
  .my-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop {
      padding-top: 0;
    }
  }

  .search{
    position: fixed;
    width: 100%;
    height: 46px;
  }
}
</style>

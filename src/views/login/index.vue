<template>
  <div class="container">
    <van-nav-bar title="登录" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-cell-group>
      <!-- 手机号 -->
      <van-field label="手机号" placeholder="请输入手机号"></van-field>
      <!-- 验证码 -->
      <van-field label="验证码" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <van-button class="login" type="info" block round size="small">登录</van-button>
  </div>
</template>

<script>
export default {}
</script>

<style>
.login{
  margin: 20px 0;
}
</style>

<template>
  <div class="container">
    <van-nav-bar class="bar" title="" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <!-- 登录表单 -->
      <van-cell-group>
      <!-- 手机号 -->
      <van-field label="手机号"
      placeholder="请输入手机号"
      v-model="loginForm.mobile"
      :error-message="errMessage.mobile"
      required

      autofocus
      @blur="checkMobile">
      </van-field>
      <!-- 验证码 -->
      <van-field label="验证码" placeholder="请输入验证码" @blur="checkCode" v-model="loginForm.code" :error-message="errMessage.code" required maxlength="6">
        <van-button class="codeBtn" slot="button" size="small" type="default" @click="getCode" :disabled="codeBtn" > {{ codeMessage }}</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <van-button  class="login-button" type="info" block size="small" round @click="login">登录</van-button>
  </div>
</template>

<script>
import { login, getCode } from '../../api/user.js'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 登录表单
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 保证验证码状态
      codeMessage: '获取验证码',
      codeBtn: false,
      code: 60,
      errMessage: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    // 解构mutations方法
    ...mapMutations(['updateToken']),
    // 校验手机号
    checkMobile () {
      if (!this.loginForm.mobile) {
        this.errMessage.mobile = '手机号不能为空'
        return false
      }
      const regMobile = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
      if (!regMobile.test(this.loginForm.mobile)) {
        this.errMessage.mobile = '请输入正确格式手机号'
        return false
      }
      this.errMessage.mobile = ''
      return true
    },
    // 校验验证码
    checkCode () {
      if (!this.loginForm.code) {
        this.errMessage.mobile = '验证码不能为空'
        return false
      }
      const regCode = /^\d{6}$/
      if (!regCode.test(this.loginForm.code)) {
        this.errMessage.code = '验证码不正确'
        return false
      }
      this.errMessage.code = ''
      return true
    },
    // 登录
    async login () {
      // 以下代码，可以解决bug，短路表达式的bug
      const mobileValidate = this.checkMobile()
      const codeValidate = this.checkCode()
      if (mobileValidate && codeValidate) {
        try {
          const res = await login(this.loginForm)
          console.log(res)

          this.updateToken({ user: res })
          const { redirectUrl } = this.$route.query
          this.$router.push(redirectUrl || '/')
        } catch (error) {
          this.$notice({ message: '手机号或验证码错误' })
        }
      }
    },
    // 获取验证码
    getCode () {
      this.codeBtn = true
      this.codeMessage = this.code + 's后重新获取'
      getCode(this.loginForm.mobile)
      const timer = setInterval(() => {
        this.code--
        this.codeMessage = this.code + 's后重新获取'

        if (this.code === -1) {
          clearInterval(timer)
          this.codeMessage = '获取验证码'
          this.codeBtn = false
          this.code = 60
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.login-button{
  margin: 20px 0;
}
.codeBtn{
  width: 100px;
}
</style>

/**
 * vuex模块，处理共享状态
 * create by LiDemin 2020/3/16
 */
import Vue from 'vue'
import Vuex from 'vuex'
// 引入token操作模块
import * as auth from '../utils/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 放置需要共享的状态
    user: auth.getUser()
  },
  mutations: {
    // 修改token
    updateToken (state, payload) {
      state.user = payload.user // 更新state中token状态，本地获取token
      auth.setUser(state.user) // 本地持久化，更新本地缓存token
    },
    // 删除token
    delToken (state) {
      state.user = {} // 更新state中token状态，清空token
      auth.delUser() // 删除本地缓存token
    }
  },
  actions: {

  },
  modules: {
  }
})

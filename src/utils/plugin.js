/*****
 *
 * 封装各类小工具
 *
 ****/
export default {
  install (Vue) {
    // 重写vant的notify组件，修改其默认显示时间为800毫秒
    Vue.prototype.$notice = function (params) {
      return Vue.prototype.$notify({ duration: 800, ...params })
    }
  }
}

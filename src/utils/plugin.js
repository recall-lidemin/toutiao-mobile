/*****
 *
 * 封装各类小工具
 *
 ****/
export default {
  install (Vue) {
    // 重写vant的notify组件，修改其默认显示时间为800毫秒
    Vue.prototype.$notice = params => Vue.prototype.$notify({ duration: 800, ...params })
    Vue.prototype.$sleep = sleep
  }
}

// 延迟处理函数
function sleep (time = 500) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), time)
  })
}

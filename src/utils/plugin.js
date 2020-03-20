/*****
 *
 * 封装各类小工具
 *
 ****/
// 引入dayjs
import dayjs from 'dayjs'
// 引入语言包
import 'dayjs/locale/zh-cn.js'
// 引入相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime.js'
// dayjs扩展相对插件的方法
dayjs.extend(relativeTime)

export default {
  install (Vue) {
    // 重写vant的notify组件，修改其默认显示时间为800毫秒
    Vue.prototype.$notice = params => Vue.prototype.$notify({ duration: 800, ...params })
    Vue.prototype.$sleep = sleep
    // Vue.filter(名称，函数)
    Vue.filter('transTime', transTime) // 注册全局过滤器
  }
}

// 延迟处理函数
function sleep (time = 500) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), time)
  })
}

/***
 *
 * 日期转换函数，转换为相对时间
***/
function transTime (date) {
  // locale()本地语言包转换
  return dayjs().locale('zh-cn').from(date) // from中是日期，或dayjs得到的时间
}

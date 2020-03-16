/**
 * 封装axios请求管理模块
 * create by LiDemin 2020/3/15
 */
import axios from 'axios'
import JSONBig from 'json-bigint'
// 引入vuex公共状态管理模块
import store from '../store/index.js'

// axios.defaults是对原有默认值进行修改
// axios.create相当于new了一个新实例
const instance = axios.create({
// 构造参数，相当于defaults
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
  // 此属性是个数组，响应处理队列数组,此时数据还没有进到拦截器
  transformRequest: [function (data) {
    return data ? JSONBig.parse(data) : {}
    // 写法二：
    // try {
    //   return JSONBig.parse(data)
    // } catch (error) {
    //   return data
    // }
  }]
})

// 请求拦截器，token注入
instance.interceptors.request.use(config => {
  // 读取token,设置
  store.state.user.token && (config.headers.Authorization = `Bearer ${store.state.user.token}`)
  return config
}, err => {
  // 这样直接进入 axios 的catch
  return Promise.reject(err)
})

// 响应拦截器，处理返回数据
instance.interceptors.response.use(response => {
  // 解构数据，axios会默认给数据包一层data，接口本身几乎所有也都包一层data
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, err => {
  return Promise.reject(err)
})

// 导出新的axios实例工具
export default instance

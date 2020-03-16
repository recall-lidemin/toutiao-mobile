/**
 * 封装axios请求管理模块
 * create by LiDemin 2020/3/15
 */
import axios from 'axios'
import JSONBig from 'json-bigint'
// 引入vuex公共状态管理模块
import store from '../store/index.js'
// 引入router
import router from '../router/index.js'

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
}, async error => {
  // 如果请求失败，或者其他错误，会进入响应拦截器的err
  // 只要是401就是token失效（导航守卫把没有token的拦截在外面）
  /*****
   * error
   *   config   出现这次错误的请求的配置信息
   *   request  请求对象
   *   response 响应对象(status属性,响应状态码)
   *****/
  if (error.response && error.response.status === 401) {
    // 如果状态码是401，说明token失效了
    const path = {
      path: '/login',
      // 路由传参：动态路由，query传参
      query: {
        redirectUrl: router.currentRoute.fullPath // 表示登录页需要跳转的地址
      }
    }
    if (store.state.user.refreshToken) {
      // 如果有refreshToken，就取换取token，直到refreshToken过期
      // 此处必须用axios，不能用instance，因为instance有拦截器，注入了旧token了，所以要用新axios
      try {
        const res = await axios({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: { Authorization: `Bearer ${store.state.user.refreshToken}` }
        })
        // 换取新的token，提交mutations，更新vuex状态
        store.commit('updateToken', {
          user: {
            token: res.data.data.token,
            refreshToken: store.state.user.refreshToken
          }
        })
        // 换取新的token后，把之前的错误请求再次发送出去，此时token已经是最新的了，可以直接用instance了
        return instance(error.config)
      } catch (err) {
        // 尝试refreshToken刷新token失败，回到登录页面
        store.commit('delToken')
        router.push(path)
      }
    } else {
      // 如果没有refreshToken,直接跳转登录
      // router.push('/login')
      // 重新登录成功后，继续回到该页面，在哪个页面失效，就回到哪个页面
      // 所以跳转的时候，要把当前地址传给登录页
      // router.currentRoute 表示当前路由信息对象
      // 获取当前路由的带参数地址 router.currentRoute.fullPath 完整地址
      // router可以push一个对象
      store.commit('delToken')
      router.push(path)
    }
  }
  return Promise.reject(error)
})

// 导出新的axios实例工具
export default instance

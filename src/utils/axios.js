import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '../store/index.js'
import router from '../router/index.js'

// 新建axios实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
  transformResponse: [function (data) {
    return data ? JSONBig.parse(data) : {}
  }]
})

// 配置请求拦截器，添加token认证
instance.interceptors.request.use(config => {
  store.state.user.token && (config.headers.Authorization = `Bearer ${store.state.user.token}`)
  return config
}, error => {
  return Promise.reject(error)
})

// 配置响应拦截器，解构响应数据，处理失效token
instance.interceptors.response.use(response => {
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, async error => {
  if (error.response && error.response.status === 401) {
    const path = {
      path: '/login',
      query: {
        redirectUrl: router.currentRoute.fullPath
      }
    }
    if (store.state.user.refresh_token) {
      try {
        const res = await axios({
          methods: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: { Authorization: `Bearer ${store.state.user.refresh_token}` }
        })

        store.commit('updateToken', {
          user: {
            token: res.data.data.token,
            refresh_token: store.state.user.refresh_token
          }
        })

        return instance(error.config)
      } catch (error) {
        store.commit('delToken')
        router.push(path)
      }
    } else {
      store.commit('delToken')
      router.push(path)
    }
  }
  return Promise.reject(error)
})

export default instance

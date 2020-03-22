/****
 * 频道操作接口模块
 * created by LiDemin 20200322
 *
 ****/

import $http from '../utils/request.js'
import store from '../store/index.js'
// 登录用户的key
const CACHE_CHANNEL_V = 'user-v'
// 游客的key
const CACHE_CHANNEL_T = 'user-t'

/**
 * 获取用户频道列表
 * 重构频道api,实现本地化
 */
export function getMyChannel () {
  // return $http.get('user/channels')
  return new Promise(function (resolve, reject) {
    // 支持本地化缓存
    // 根据当前登录状态(有无token)，判断使用哪个用户的key
    const key = store.state.user.token ? CACHE_CHANNEL_V : CACHE_CHANNEL_T
    // 获取本地的数据
    const str = localStorage.getItem(key)
    // 根据本地缓存有无数据，判断是否需要请求数据
    if (str) {
      resolve({ channels: JSON.parse(str) })
    } else {
      // 本地如果没有数据，就去接口请求
      $http.get('user/channels').then(res => {
        localStorage.setItem(key, JSON.stringify(res.channels))
        resolve(res)
      })
    }
  })
}

/**
 * 获取全部频道接口
 */
export function getAllChannels () {
  return $http.get('channels')
}

/**
 * 封装本地删除频道接口
 * @param {*} params
 */
export function delChannel (params) {
  return new Promise(function (resolve, reject) {
    // 根据当前登录状态(有无token)，判断使用哪个用户的key
    const key = store.state.user.token ? CACHE_CHANNEL_V : CACHE_CHANNEL_T
    const channels = JSON.parse(localStorage.getItem(key))
    const index = channels.findIdnex(item => item.id === params)
    if (index > -1) {
      channels.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(channels))
      resolve({ messgae: '删除成功' })
    } else {
      reject(new Error('没有找到对应频道'))
    }
  })
}

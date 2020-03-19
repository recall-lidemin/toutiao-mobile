/**
 * 封装用户请求接口模块
 * LiDemin by 2020.3.15
 */
import $http from '../utils/request.js'

/**
 * 登录接口
 * @param {*} loginForm
 */
export function login (data) {
  return $http({
    method: 'post',
    url: 'authorizations',
    data
  })
}

/**
 * 获取手机验证码接口
 * @param {*} mobile
 */
export function getCode (mobile) {
  return $http.get(`sms/codes/${mobile}`)
}

/**
 * 获取用户频道列表
 */
export function getMyChannel () {
  return $http.get('user/channels')
}

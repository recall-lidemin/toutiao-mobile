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
 * 关注用户
 * @param {*} id
 */
export function followUser (id) {
  return $http.post('user/followings', { target: id })
}

/**
 * 取消关注
 * @param {*} id
 */
export function unFollowUser (id) {
  return $http.delete(`user/followings/${id}`)
}

/**
 * 获取用户信息
 */
export function getUserInfo () {
  return $http.get('user')
}

/**
 * 获取用户资料
 */
export function getUserPtofile () {
  return $http.get('user/profile')
}

/**
 * 更新用户头像
 * @param {*} data
 */
export function updatePhoto (data) {
  return $http.patch('user/photo', data)
}

/**
 * 更新用户资料
 * @param {*} data
 */
export function saveUserInfo (data) {
  return $http.patch('user/profile', { ...data, photo: null })
}

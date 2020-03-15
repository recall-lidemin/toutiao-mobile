/***
 * 封装token处理模块
 *
 */
const USER_TOKEN = 'my-token'

// 设置用户token
export function setUser (user) {
  window.localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
// 获取用户token
export function getUser () {
  // 表达式1 || 表达式2 短路表达式，前面是false后面才会执行，前面是true，就不会执行后面，直接执行前面了
  return JSON.parse(window.localStorage.getItem(USER_TOKEN) || '{}')
}
// 删除用户token
export function delUser () {
  window.localStorage.removeItem(USER_TOKEN)
}

import $http from '../utils/request.js'

/**
 * 获取全部频道接口
 */
export function getAllChannels () {
  return $http.get('channels')
}

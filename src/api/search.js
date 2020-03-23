/****
 * 封装查询接口模块
 *
 ****/
import $http from '../utils/request.js'

/**
 * 联想搜索接口
 * @param {*} query
 */
export function getSuggestion (query) {
  return $http.get('suggestion', { params: { q: query } })
}

/**
 * 获取搜索结果接口
 * @param {*} params
 */
export function getResults (params) {
  return $http.get('search', { params })
}

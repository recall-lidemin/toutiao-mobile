/****
 * 封装查询接口模块
 *
 ****/
import $http from '../utils/request.js'

export function getSuggestion (query) {
  return $http.get('suggestion', { params: { q: query } })
}

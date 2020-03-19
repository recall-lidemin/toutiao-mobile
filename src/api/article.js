/****
 * 封装文章接口模块
 *
 ***/

import $http from '../utils/request.js'

/**
 * 获取推荐文章接口
 * @param {*} params
 */
export function getArticleList (params) {
  return $http.get('http://ttapi.research.itcast.cn/app/v1_1/articles',
    {
      params: {
        with_top: 1,
        ...params
      }
    })
}

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

/**
 * 不感兴趣文章接口
 * @param {*} artid
 */
export function dislike (artid) {
  return $http.post('article/dislikes', { target: artid })
}

/**
 * 举报文章接口
 * @param {*} params
 */
export function report (params) {
  return $http.post('article/reports', params)
}

/**
 * 获取文章详情
 * @param {*} id
 */
export function getArticleInfo (id) {
  return $http.get(`articles/${id}`)
}

/**
 * 获取文章评论
 * @param {*} params
 */
export function getComments (params) {
  return $http.get('comments', { params })
}

/**
 * 发表评论，回复评论接口
 * @param {*} data
 */
export function comments (data) {
  return $http.post('comments', data)
}

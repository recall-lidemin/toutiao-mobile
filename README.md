# toutiao-mobile(移动端项目)

## 1. 预览地址

 - 

## 2. 技术选型

 - Vue.js / Vue-router / Vuex
 - axios
 - Vant组件库
 - Rem适配
 - 模块化、组件化

## 3. 项目简介

### 3.1. 初始化

 - 初始化router、vuex文件
 - 引入vant组件库
 - 做rem适配
 - 设计路由

### 3.2. Token管理

 - 封装Token处理模块(get、set、delete)
 - 使用vuex状态管理token
   - vuex管理共享状态，而token正需要共享，所以选用vuex解决token共享问题
   - vuex中对状态进行持久化 ==> vuex + 前端缓存 ==实现==> 前端持久化 
- **处理token失效(要难点)**：
  - token两个小时过期，refresh_token14天过期，可以用refresh_token换取新的token，直到refresh_token过期
  - 优点：
    - 对于用户来说是无感的，用户什么都感觉不到，不会知道失效获取失效获取的过程
    - 对于服务器来说，是安全的
  - **处理逻辑**：
    - 当页面抛出错误时，会在响应拦截器的error中捕获，此时判断error对象的response对象中的status属性值
    - 如果值为401表示token失效，token不存在的情况会被路由导航守卫拦截，这里不用担心，只要是401肯定是失效了
    - 401时，此时首先去取vuex中的refreshToken公共状态
    - refreshToken存在：
      - 此时，拿到refreshToken，发起请求
      - 请求成功：会返回一个新的token，将新token更新到vuex，然后将之前发送失败的请求重新发送出去
      - 请求失败：清空token，跳转到登录页，同时将当前页面完整路径传给登录页，登录成功后，判断路径是否存在，存在直接跳回来，不存在就跳到首页 
    - refreshToken不存在：
      - 直接跳转到登录页面，重新登录后再回到本页面
      - 为了能再次回到本页面，所以跳转采用push一个对象，其中将当前页面完整路径传给登录页面
      - ```js
        // router.currentRoute 当前路由对象，包含一个fullPath属性，是当前完整路径
        router.push({ 
          path: '/', 
          redirectUrl: router.currentRoute.fullPath 
        })
        ```
      - 登录页重新登录时判断redirectUrl是否存在，存在跳转地址的跳到对于地址；不存在的，直接跳到首页



### 3.3. Axios封装(同步处理大数字)

 - **`axios.create({ })`**创建新的axios实例，并传入配置参数(功能等同于axios.defaults)
```js
// create相当于 new 了一个新的axios实例，与原来axios没有关系，之后使用这个new出来的新实例 
axios.create({
     // 构造参数，传入一些配置，和axios.defaults一样的功能
 })
```
 - 在transformRequest中处理一下大数字

### 登录
 
 - 自定义检验规则
 - ajax获取验证码，登录
 - 登录接口返回token，更新vuex公共状态
 - 重写vant组件，定义新的指向Vue.prototype上方法的方法

### 首页

 - 封装文章列表组件

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```


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

### 3.3. Axios封装(同步处理大数字)

 - **`axios.create({ })`**创建新的axios实例，并传入配置参数(功能等同于axios.defaults)
```js
// create相当于 new 了一个新的axios实例，与原来axios没有关系，之后使用这个new出来的新实例 
axios.create({
     // 构造参数，传入一些配置，和axios.defaults一样的功能
 })
```



### 首页

 - 


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```


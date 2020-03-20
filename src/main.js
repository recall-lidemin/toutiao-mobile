import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant(默认对象)组件，Lazyload(平常对象) 图片懒加载组件
import Vant, { Lazyload } from 'vant'
import Plugin from './utils/plugin.js'
// 引入vant的less样式，方便自定义主题，在vue.config.js中修改变量
import 'vant/lib/index.less'
// 引入路由权限配置模块
import './permession/index.js'
// 调整屏幕html根元素的font-size
import 'amfe-flexible'
// 引入全局样式,覆盖vant样式
import './styles/index.less'

Vue.use(Vant) // 全局注册Vant
Vue.use(Lazyload) // 全局注册lazyload指令
Vue.use(Plugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// export default {} 导出默认对象
// export function {} 导出平常对象

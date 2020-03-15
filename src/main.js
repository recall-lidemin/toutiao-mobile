import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
// 调整屏幕html根元素的font-size
import 'amfe-flexible'
// 引入全局样式,覆盖vant样式
import './styles/index.less'

Vue.use(Vant) // 全局注册Vant

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

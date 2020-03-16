import router from '../router/index.js'
import store from '../store/index.js'

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/user') && !store.state.user.token) {
    next({
      path: '/login',
      query: {
        redirectUrl: to.fullPath
      }
    })
  } else {
    // 地址不是/user开头或地址以/user开始，但是有token的，都放行
    next()
  }
})
export default router

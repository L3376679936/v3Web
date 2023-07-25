//路由守卫
import router from './index'
import store from '@/store'

// 设立白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('./login')
    }
  }
})

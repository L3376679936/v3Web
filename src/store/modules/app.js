import { login as loginApi } from '@/api/login'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'
import { ElMessage } from 'element-plus'

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: localStorage.getItem('userInfo') || '',

    siderType: true,
    lang: localStorage.getItem('lang') || 'zh' //语言
  }),
  mutations: {
    // 把token设置到localstorage和state中
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    userInfo(state, userInfo){
      state.userInfo = userInfo
      localStorage.setItem('userInfo', userInfo)
    },
    // 切换sider状态
    changeSiderType(state) {
      state.siderType = !state.siderType
    },
    //语言切换
    changeLang(state, lang) {
      state.lang = lang
    }
  },
  actions: {
    //发起登录请求，并获得token
    async login( {commit} , userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            // console.log(res,'res')
            // console.log(res.token)
            commit('userInfo',res.data)
              ElMessage.success('登录成功')
              commit('setToken', res.token) //把拿到的token给mutation
              setTokenTime() //设置登录时间
              router.replace('/') //成功之后跳转到首页
              resolve()
            

          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 退出操作
    logout({ commit }) {
      commit('setToken', '')
      localStorage.clear()
      router.replace('/login')
    }
  }
}

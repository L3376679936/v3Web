import axios from 'axios'
import { ElMessage } from 'element-plus/es'
import { diffTokenTime } from '@/utils/auth'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器 给请求头配置token
service.interceptors.request.use(
  (config) => {
    // 判断是否过期，如果过期退出登录
    if (localStorage.getItem('token')) {
      if (diffTokenTime()) {
        //推退出操作
        store.dispatch('app/logout')
        return Promise.reject(new Error('token失效了！'))
      }
    }
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

// 响应拦截器  剥离出来想要的数据
service.interceptors.response.use(
  (response) => {
    const { data, meta } = response.data
    console.log(response)
    if (meta.status === 200 || meta.status === 201) {
      return response.data
    } else {
      // 如果请求失败，在这里直接弹出失败信息
      ElMessage.error(meta.msg)
      return Promise.reject(new Error(meta.msg))
    }
  },
  (error) => {
    console.dir(error)
    error.response && ElMessage.error(error.response.data)
    return Promise.reject(new Error(error.response.data))
  }
)

export default service

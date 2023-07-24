import { TOKEN_TIME, TOKEN_TIME_VALUE } from './constant'

// 登录时设置时间
export const setTokenTime = () => {
  localStorage.setItem(TOKEN_TIME, Date.now())
}

// 获取登录时的时间
export const getTokenTime = () => {
  return localStorage.getItem(TOKEN_TIME)
}

// 判断是否过期
export const diffTokenTime = () => {
  const tokenTime = getTokenTime()
  const currentTime = Date.now()
  const t = currentTime - tokenTime
  return currentTime - tokenTime > TOKEN_TIME_VALUE
}

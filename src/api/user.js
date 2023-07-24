import request from './request'

export const userData = () => {
  return request({
    url: '/user'
    // params
  })
}

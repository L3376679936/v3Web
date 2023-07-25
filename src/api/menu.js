import request from './request'
let baseURL = 'http://localhost:7090/api'

export const menuList =() =>{
    return request({
        url: baseURL+ '/menu',
    })

}
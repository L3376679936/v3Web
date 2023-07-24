import request from './request'
let baseURL = 'http://localhost:7090/api'

export const login =(data) =>{
    return request({
        url: baseURL +'/login',
        method:'POST',
        data
    })

}
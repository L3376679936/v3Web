import request from '@/api/request.js'

export const getGoodsList =() =>{
    return request({
        url:'http://localhost:7090/api/liuaobo',
    })

}
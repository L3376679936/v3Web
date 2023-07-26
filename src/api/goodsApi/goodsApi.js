import request from '@/api/request.js'

let baseURL = 'http://localhost:7090/api'


export const getGoodsList =(data) =>{
    return request({
        url:baseURL+ '/getGoodsList',
        method:'post',
        data
    })
}

// 获取商品名称下拉框数据
export const getProductList =() =>{
    return request({
        url:baseURL+ '/productList',
    })
}

// 删除商品
export const delGoods =(data) =>{
    return request({
        url:baseURL+ '/delGoods',
        method:'post',
        data
    })
}

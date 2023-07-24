// src/api/mock.js
import Mock from 'mockjs'
import loginApi from './mockData/login'
import menuApi from './mockData/menu'
import userApi from './mockData/userdata'

// 模拟登陆接口
Mock.mock('/api/login', loginApi.getLoginData)

// 模拟请求左侧菜单
Mock.mock('/api/menu', menuApi.getMenuData)

// 模拟表格用户数据
Mock.mock('/api/user', userApi.getUserData)

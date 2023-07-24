export default {
  getUserData: () => {
    return {
      data: {
        total: 15,
        pagenum: 1,
        user: [
          {
            id: 9874,
            username: '张三',
            createTime: 1642564721,
            mg_state: true,
            mobile: '13500000000'
          },
          {
            id: 9878,
            username: '李四',
            createTime: 1642564721,
            mg_state: true,
            mobile: '13500000000'
          },
          {
            id: 2633,
            username: '张三f',
            createTime: 1642564721,
            mg_state: true,
            mobile: '13500000000'
          },
          {
            id: 3232,
            username: '张三',
            createTime: 1642564721,
            mg_state: true,
            mobile: '13500000000'
          }
        ]
      },
      meta: {
        msg: '用户信息获取成功',
        status: 200
      }
    }
  }
}

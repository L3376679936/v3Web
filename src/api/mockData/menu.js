export default {
  getMenuData: () => {
    return {
      data: [
        {
          id: '101',
          authName: '商品管理',
          path: 'goods',
          children: [
            {
              id: 201,
              authName: '商品列表',
              path: 'goods',
              children: []
            }
          ]
        },
        {
          id: '102',
          authName: '订单管理',
          path: 'orders',
          children: [
            {
              id: 201,
              authName: '订单列表',
              path: 'orders',
              children: []
            }
          ]
        },
        {
          id: '103',
          authName: '权限管理',
          path: 'rights',
          children: [
            {
              id: 301,
              authName: '权限列表',
              path: 'rights',
              children: []
            }
          ]
        },
        {
          id: '104',
          authName: '用户管理',
          path: 'users',
          children: [
            {
              id: 401,
              authName: '用户列表',
              path: 'users',
              children: []
            }
          ]
        },
        {
          id: '105',
          authName: '数据统计',
          path: 'reports',
          children: [
            {
              id: 501,
              authName: '人员统计',
              path: 'reports',
              children: []
            }
          ]
        }
      ],
      meta: {
        msg: '获取菜单列表成功',
        status: 200
      }
    }
  }
}

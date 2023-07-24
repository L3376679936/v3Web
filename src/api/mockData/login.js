// export default {
//   getLoginData: (req,res) => {
//     let item = JSON.parse(req.body)
//     let username = item.username
//     let password = item.password
//     if (username === 'admin' && password === '123456') {
//       return {
//         data: {
//           id:'666',
//           username:'admin',
//           orgCode: '35002',
//           mobile:'13500000000',
//           token:
//             'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJvcmdDb2RlIjoiMzUwMDAiLCJkZXB0Q29kZSI6IjM1MDAwIiwiYXVkIjoiYWRtaW4iLCJpc3MiOiJhZG1pbiIsImV4cCI6MTU5MzUzNTU5OH0.0pJAojRtT5lx6PS2gH_Q9BmBxeNlgBL37ABX22HyDlebbr66cCjVYZ0v0zbLO_9241FX9-FZpCkEqE98MQOyWw'
//         },
//         meta:{
//           msg:'登陆成功',
//           status:200
//         }
//       }
//     } else {
//       return {
//         meta:{
//           msg:'登陆失败',
//           status:999
//         }
//       }
//     }
//   }
// }

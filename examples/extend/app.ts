import axios from '../../src/index'

// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// axios.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// axios 不同的函数传递方式
// axios('/extend/post', {
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// });

// 给接口返回参数定义接口类型
interface RespnseData<T=any>{
  code: number
  result: T
  message: string
}

interface User{
  name: string
  age: number
}

function getUser<T>() {
  return axios<RespnseData<T>>('/extend/user')
  .then(res => res.data)
  .catch(error => console.error(error))
}

async function test() {
  const user = await getUser<User>();
  if (user) {
    console.log(user.result.name)
  }
}
test()
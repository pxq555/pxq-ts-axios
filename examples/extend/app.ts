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
axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
});
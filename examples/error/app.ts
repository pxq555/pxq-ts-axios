import axios, {AxiosError} from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log('then1')
  console.log(res)
}).catch((e) => {
  console.log('catch1')
  console.log(e)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log('then2')
  console.log(res)
}).catch((e) => {
  console.log('catch2')
  console.log(e)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log('then3')
    console.log(res)
  }).catch((e) => {
    console.log('catch3')
    console.log(e)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log('then4')
  console.log(res)
}).catch((e: AxiosError) => {
  console.log('catch4')
  console.log(e.message)
  console.log(e.code)
})
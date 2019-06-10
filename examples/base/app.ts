import axios from '../../src/index'
/*
验证params参数的demo
// 参数值为数组
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

// 参数值为对象
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

// 参数值为 Date 类型
const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

// 特殊字符支持  对于字符 @、:、$、,、、[、]，我们是允许出现在 url 中的，不希望被 encode。

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

// 空值忽略  对于值为 null 或者 undefined 的属性，我们是不会添加到 url 参数中的。

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

// 丢弃 url 中的哈希标记
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

// 保留 url 中已存在的参数
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})
 *  */


 /*
 测试传递data
axios({
  method: 'POST',
  url: '/base/post',
  data: {
    a: '1',
    b: '2'
  }
})

const arr = new Int32Array([21, 31])
axios({
  method: 'POST',
  url: '/base/buffer',
  data: arr
})
*/

axios({
  method: 'POST',
  url: '/base/post',
  data: {
    a: '1',
    b: '2'
  },
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  }
})

const paramString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramString);
axios({
  method: 'POST',
  url: '/base/post',
  data: searchParams
})
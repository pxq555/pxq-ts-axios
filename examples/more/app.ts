import axios from '../../src/index'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { AxiosError } from '../../src/helpers/error';
import qs from 'qs';

// withCredentials功能 --
// document.cookie = 'a=b'

// axios.get('/more/get').then(res => {
//   console.log(res)
// })

// axios.post('http://127.0.0.1:8088/more/server2', { }, {
//   withCredentials: true
// }).then(res => {
//   console.log(res)
// })

// xsrfCookieName与xsrfHeaderName功能
// let instance = axios.create({
//     xsrfCookieName: 'XSRF-TOKEN-D',
//     xsrfHeaderName: 'X_XSRF-TOKEN-D'
// })

// instance.get('/more/get').then((res) => {
//     console.log(res)
// })

// 上传下载监测功能  --
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const instance = axios.create()

function calculatePercentage(loaded: number, total: number) {
    return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
    const setupStartProgress = () => {
        instance.interceptors.request.use(config => {
            console.log('请求之前')
            NProgress.start()
            return config
        })
    }

    const setupUpdateProgress = () => {
        const update = (e: ProgressEvent) => {
            console.log('unloading')
            console.log(e)
            NProgress.set(calculatePercentage(e.loaded, e.total))
        }
        instance.defaults.onDownloadProgress = update
        instance.defaults.onUploadProgress = update
    }

    const setupStopProgress = () => {
        instance.interceptors.response.use(response => {
            console.log('响应之后')
            NProgress.done()
            return response
        }, error => {
            NProgress.done()
            return Promise.reject(error)
        })
    }

    setupStartProgress()
    setupUpdateProgress()
    setupStopProgress()
}

loadProgressBar()

const downloadEl = document.getElementById('download')

downloadEl!.addEventListener('click', e => {
    source.cancel('结束上传。');
    // instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
})

const uploadEl = document.getElementById('upload')

uploadEl!.addEventListener('click', e => {
    const data = new FormData()
    const fileEl = document.getElementById('file') as HTMLInputElement
    if (fileEl.files) {
        data.append('file', fileEl.files[0])

        instance.post('/more/upload', data, {
            cancelToken: source.token
        })
    }
})
setTimeout(() => {
    console.log('setTimeout')
    const data = new FormData()
    const fileEl = document.getElementById('file') as HTMLInputElement
    if (fileEl.files) {
        data.append('file', fileEl.files[0])

        instance.post('/more/upload', data, {
            cancelToken: source.token
        })
    }
}, 10000)

// authorization 功能的验证。
// axios.post('/more/post', {
//     a: 1
// }, {
//     auth: {
//         username: 'pxq',
//         password: '123456'
//     }
// }).then((res) => {
//     console.log(res)
// })

// validateStatus 的功能验证，自定义状态码的正确范围。
// axios.get('/more/304').then(res => {
//     console.log(res)
//   }).catch((e: AxiosError) => {
//     console.log(e.message)
//   })

//   axios.get('/more/304', {
//     validateStatus(status) {
//       return status >= 200 && status < 400
//     }
//   }).then(res => {
//     console.log(res)
//   }).catch((e: AxiosError) => {
//     console.log(e.message)
//   })

// paramsSerializer 的功能，自定义params参数的序列化
// axios.get('/more/get', {
//     params: new URLSearchParams('a=b&c=d')
//   }).then(res => {
//     console.log(res)
//   })

//   axios.get('/more/get', {
//     params: {
//       a: 1,
//       b: 2,
//       c: ['a', 'b', 'c']
//     }
//   }).then(res => {
//     console.log(res)
//   })

//   const instance = axios.create({
//     paramsSerializer: (params) => {
//       return qs.stringify(params, { arrayFormat: 'brackets' })
//     }
//   })

//   instance.get('/more/get', {
//     params: {
//       a: 1,
//       b: 2,
//       c: ['a', 'b', 'c']
//     }
//   }).then(res => {
//     console.log(res)
//   })

// baseURL 功能，相对路径的请求地址，拼接上baseURL。
// const instance = axios.create({
//     baseURL: 'https://img.mukewang.com/'
//   })

//   instance.get('5cc01a7b0001a33718720632.jpg')

//   instance.get('https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg')

// axios.all axios.spread axios.getUri等功能
function getA() {
    return axios.get('/more/A')
}

function getB() {
    return axios.get('/more/B')
}

axios.all([getA(), getB()])
    .then(axios.spread(function (resA, resB) {
        console.log(resA.data)
        console.log(resB.data)
    }))


axios.all([getA(), getB()])
    .then(([resA, resB]) => {
        console.log(resA.data)
        console.log(resB.data)
    })

const fakeConfig = {
    baseURL: 'https://www.baidu.com/',
    url: '/user/12345',
    params: {
        idClient: 1,
        idTest: 2,
        testString: 'thisIsATest'
    }
}
console.log(axios.getUri(fakeConfig))
import axios from '../../src/index'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

// withCredentials功能
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
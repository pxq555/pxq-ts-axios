import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'

export function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        let { url, data = null, method = 'get', headers, responseType, timeout } = config

        let request = new XMLHttpRequest()

        if (responseType) {
            request.responseType = responseType
        }
        if (timeout) {
            request.timeout = timeout
        }
        request.open(method.toUpperCase(), url, true)

        request.onerror = () => {
            reject(new Error('网络错误'))
        }
        request.ontimeout = () => {
            reject(new Error(`超时请求，超时时间${timeout}`))
        }
        request.onreadystatechange = () => {
            if (request.readyState !== 4) {
                return
            }
            if (request.status === 0) {
                return;
            }
            const responseHeaders = parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType && responseType === 'text' ? request.responseText : request.response
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            handleResponse(response)
        }
        // open之后添加headers
        Object.keys(headers).forEach(name => {
            if (data === null && name.toLocaleLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })
        request.send(data)

        function handleResponse (res: AxiosResponse): void {
            if (res.status >= 200 && res.status <=300) {
                resolve(res)
            } else {
                reject(new Error(`请求失败，状态码为:${res.status}`))
            }
        }
    })
}

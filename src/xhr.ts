import {AxiosRequestConfig} from './types'
export function xhr (config: AxiosRequestConfig): void {
    let {url, data = null, method = 'get', headers} = config;

    let request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url, true);
    // open之后添加headers
    Object.keys(headers).forEach((name) => {
        if (data === null && name.toLocaleLowerCase() === 'content-type') {
            delete headers[name]
        } else {
            request.setRequestHeader(name, headers[name]);
        }
    })
    request.send(data)
}
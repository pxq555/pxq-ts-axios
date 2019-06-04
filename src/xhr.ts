import {AxiosRequestConfig} from './types'
export function xhr (config: AxiosRequestConfig): void {
    let {url, data = null, method = 'get'} = config;

    let request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url, true);
    request.send(data)
}
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { xhr } from './xhr'
import { buildUrl } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders, flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // TODO
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // config.headers = transformHeaders(config) // 在处理data之前处理headers，因为headers中判断data是否为一个普通对象。transformRequestData函数会将data处理成字符串形式。
  // config.data = transformRequestData(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}
// 处理请求的url
function transformURL(config: AxiosRequestConfig): string {
  let { url, params } = config
  return buildUrl(url!, params)
}
// // 处理请求的body参数
// function transformRequestData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data)
// }
// // 处理请求的headers
// function transformHeaders(config: AxiosRequestConfig): any {
//   let { headers = {}, data } = config
//   return processHeaders(headers, data)
// }
// 将返回结果为字符串时转换为对象方便使用
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  // 定义axios配置参数接口，接口就是给对象定义一个规则
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType // 定义一个配置参数，配置后台返回参数是什么类型。
  timeout?: number // 定义一个配置参数，该参数定义了超时时间。
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken // 用来中断正在请求的接口
  withCredentials?: boolean // 此参数如果配置了，会对request.withCredentials的属性设置为true，就可以实现在跨域请求时携带上cookie
  xsrfCookieName?: string // 此参数用来配置在请求时，获取cookie中的token参数，在请求时添加进请求header中。
  xsrfHeaderName?: string // 此参数是用来将获取的token值存入headers中的name
  onDownloadProgress?: (e: ProgressEvent) => void // 配置下载事件
  onUploadProgress?: (e: ProgressEvent) => void // 配置上传事件
  auth?: AxiosBasicCredentials // 配置了该配置，会在headers中添加Authorization属性，该属性的格式是Basic username: password
  validateStatus?: (status: number) => boolean // 该配置为函数配置，有默认值，监测返回的res中的status的区间范围为多少为正常请求返回。

  [propName: string]: any
}

export interface AxiosResponse<T = any> {
  // 定义返回对象的接口
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: any
}

export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(utl: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(utl: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(utl: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (val: any) => boolean
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}
export interface AxiosBasicCredentials {
  username: string
  password: string
}

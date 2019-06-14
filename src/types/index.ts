import { config } from 'shelljs'

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
}

export interface AxiosResponse<T=any> {
  // 定义返回对象的接口
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: any
}

export interface Axios {
    request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>

    get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    options<T=any>(url: string, config?: AxiosRequestConfig):AxiosPromise<T>

    post<T=any>(utl: string, data?: any, config?: AxiosRequestConfig):AxiosPromise<T>

    put<T=any>(utl: string, data?: any, config?: AxiosRequestConfig):AxiosPromise<T>

    patch<T=any>(utl: string, data?: any, config?: AxiosRequestConfig):AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
    <T=any>(config: AxiosRequestConfig): AxiosPromise<T>
    <T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
import dispatchRequest from './dispatchRequest'
import { AxiosRequestConfig, AxiosPromise } from '../types';

export default class Axios {
    request(config: AxiosRequestConfig): AxiosPromise{
        return dispatchRequest(config)
    }
}
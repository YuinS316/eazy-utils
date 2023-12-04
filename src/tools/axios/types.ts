import type { AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';

export interface Interceptors<D> {
  //  请求拦截
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  //  响应拦截
  responseInterceptors?: (data: D) => D
  responseInterceptorsCatch?: (err: any) => any
}

//  创建实例的配置
export interface InstanceConfig<T = AxiosResponse> extends CreateAxiosDefaults {
  interceptors?: Interceptors<T>
}

//  接口级别的配置
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: Interceptors<T>
}

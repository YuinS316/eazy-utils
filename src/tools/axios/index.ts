import axios, { isAxiosError } from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { InstanceConfig, RequestConfig } from './types';

export class Request {
  public instance: AxiosInstance;
  public config: InstanceConfig;

  constructor(config: InstanceConfig) {
    this.config = config;
    this.instance = axios.create(config);
    this.setupInterceptors();
  }

  //  初始化实例拦截器
  setupInterceptors() {
    //  请求拦截
    this.instance.interceptors.request.use(
      this.config.interceptors?.requestInterceptors,
      this.config.interceptors?.requestInterceptorsCatch,
    );

    //  响应拦截
    this.instance.interceptors.response.use(
      this.config.interceptors?.responseInterceptors,
      this.config.interceptors?.responseInterceptorsCatch,
    );

    //  全局拦截，主要是解构掉axios默认返回的data
    this.instance.interceptors.response.use((res: AxiosResponse) => res.data, (err: any) => {
      // if (isAxiosError(err))
      //   return err;
      return Promise.reject(err);
    });
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    if (config.interceptors?.requestInterceptors)
      config = config.interceptors.requestInterceptors(config as any);

    return new Promise((resolve, reject) => {
      this.instance.request<any, T>(config).then((res) => {
        if (config.interceptors?.responseInterceptors)
          res = config.interceptors.responseInterceptors(res);

        resolve(res);
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  get<T>(url: string, params?: Record<string, string>, config?: RequestConfig<T>): Promise<T> {
    return this.request<T>({
      url,
      params,
      method: 'get',
      ...config,
    });
  }

  post<T>(url: string, data?: Record<string, any>, config?: RequestConfig<T>): Promise<T> {
    return this.request<T>({
      url,
      data,
      method: 'post',
      ...config,
    });
  }
}

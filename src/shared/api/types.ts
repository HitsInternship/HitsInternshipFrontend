import { AxiosRequestConfig } from 'axios';

export type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: AxiosRequestConfig }
  : { params: Params; config?: AxiosRequestConfig };

import { LoginFormValues } from '../model';

import { api, type RequestConfig } from '@/shared/api';

type LoginConfig = RequestConfig<LoginFormValues>;

export const login = ({ params, config }: LoginConfig) => {
  console.log(params, config);
  return api.post('/login', params, config);
};

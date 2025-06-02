import { LoginFormValues } from '../model';
import { LoginResponse } from '../model/types.ts';

import { api, type RequestConfig } from '@/shared/api';

type LoginConfig = RequestConfig<LoginFormValues>;

export const login = ({ params, config }: LoginConfig) => {
  return api.post<LoginResponse>('/api/auth/login', params, config);
};

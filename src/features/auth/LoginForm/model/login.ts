import { LoginFormValues } from './schema';

import type { RequestConfig } from '@/shared/api';
import { api } from '@/shared/api';

export type LoginConfig = RequestConfig<LoginFormValues>;
export const login = ({ params, config }: LoginConfig) =>
  api.post('/login', params, config);

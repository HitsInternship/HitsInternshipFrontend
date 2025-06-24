import { COMPANY_ENDPOINTS, CreateCompanyDTO } from '../models';

import { api, RequestConfig } from '@/shared/api';

export type CreateCompanyConfig = RequestConfig<CreateCompanyDTO>;
export const createCompany = ({ params, config }: CreateCompanyConfig) =>
  api.post(COMPANY_ENDPOINTS.ADD_COMPANY, params, config);

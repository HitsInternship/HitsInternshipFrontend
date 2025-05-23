import { Company, COMPANY_ENDPOINTS } from '../models';

import { api, RequestConfig } from '@/shared/api';

export type GetCompanyConfig = RequestConfig<{ id: string }>;
export const getCompany = ({ params, config }: GetCompanyConfig) =>
  api.get<Company>(COMPANY_ENDPOINTS.GET_COMPANY(params.id), config);

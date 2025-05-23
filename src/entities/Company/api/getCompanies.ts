import { Company, COMPANY_ENDPOINTS } from '../models';

import { api, RequestConfig } from '@/shared/api';

export type GetCompaniesConfig = RequestConfig;
export const getCompanies = ({ config }: GetCompaniesConfig) =>
  api.get<Company[]>(COMPANY_ENDPOINTS.GET_COMPANIES, config);

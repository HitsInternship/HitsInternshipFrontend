import { CompanyFormValues } from '../model';

import { api, RequestConfig } from '@/shared/api';
import { COMPANY_ENDPOINTS } from '@/entities/Company/models';

export type CreateCompanyConfig = RequestConfig<CompanyFormValues>;
export const createCompany = ({ params, config }: CreateCompanyConfig) =>
  api.put(COMPANY_ENDPOINTS.ADD_COMPANY, params, config);

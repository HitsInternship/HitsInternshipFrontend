import { COMPANY_ENDPOINTS, UpdateCompanyDTO } from '../models';

import { api, RequestConfig } from '@/shared/api';

export type EditCompanyConfig = RequestConfig<{
  companyId: string;
  dto: UpdateCompanyDTO;
}>;

export const editCompany = ({ params, config }: EditCompanyConfig) =>
  api.put(COMPANY_ENDPOINTS.EDIT_COMPANY(params.companyId), params.dto, config);

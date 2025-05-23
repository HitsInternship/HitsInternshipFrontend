import { IEditCompanyParams } from './types';

import { api, RequestConfig } from '@/shared/api';
import { COMPANY_ENDPOINTS } from '@/entities/Company/models';

export type EditCompanyConfig = RequestConfig<IEditCompanyParams>;
export const editCompany = ({ params, config }: EditCompanyConfig) =>
  api.put(COMPANY_ENDPOINTS.EDIT_COMPANY(params.companyId), params.dto, config);

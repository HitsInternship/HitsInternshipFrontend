import { IEditCompanyStatus } from './types';

import { COMPANY_ENDPOINTS } from '@/entities/Company/models';
import { api, RequestConfig } from '@/shared/api';

export type UpdateCompanyStatusConfig = RequestConfig<IEditCompanyStatus>;
export const updateCompanyStatus = ({
  params,
  config,
}: UpdateCompanyStatusConfig) =>
  api.put(
    COMPANY_ENDPOINTS.CHANGE_COMPANY_STATUS(params.companyId, params.status),
    null,
    config,
  );

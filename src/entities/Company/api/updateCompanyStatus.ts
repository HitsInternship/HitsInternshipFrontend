import { ChangeCompanyStatusParams } from '../models';
import { COMPANY_ENDPOINTS } from '../models';

import { api, RequestConfig } from '@/shared/api';

export type UpdateCompanyStatusConfig =
  RequestConfig<ChangeCompanyStatusParams>;
export const updateCompanyStatus = ({
  params,
  config,
}: UpdateCompanyStatusConfig) =>
  api.put(
    COMPANY_ENDPOINTS.CHANGE_COMPANY_STATUS(params.companyId, params.status),
    null,
    config,
  );

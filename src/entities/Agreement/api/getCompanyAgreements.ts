import { Agreement } from '../model';

import { api, RequestConfig } from '@/shared/api';

export type GetCompanyAgreementsConfig = RequestConfig<{ companyId: string }>;
export const getCompanyAgreements = ({
  params,
  config,
}: GetCompanyAgreementsConfig) =>
  api.get<Agreement[]>(`/api/companies/${params.companyId}/agreements`, config);

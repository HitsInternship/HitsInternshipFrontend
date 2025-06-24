import { Curator } from '../model';

import { api, RequestConfig } from '@/shared/api';

export type GetCompanyCuratorsConfig = RequestConfig<{ companyId: string }>;

export const getCompanyCurators = ({
  params,
  config,
}: GetCompanyCuratorsConfig) =>
  api.get<Curator[]>(`/api/companies/${params.companyId}/curators`, config);

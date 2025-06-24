import { AddCompanyCuratorParams, Curator } from '../model';

import { api, RequestConfig } from '@/shared/api';

export type AddCompanyCuratorConfig = RequestConfig<AddCompanyCuratorParams>;

export const addCompanyCurator = ({
  params,
  config,
}: AddCompanyCuratorConfig) =>
  api.post<Curator>(
    `/api/companies/${params.companyId}/curators/add`,
    params.dto,
    config,
  );

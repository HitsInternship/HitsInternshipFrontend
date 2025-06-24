import { Curator } from '../model';

import { api, RequestConfig } from '@/shared/api';

export type GetCuratorInfoConfig = RequestConfig;
export const getCuratorInfo = ({ config }: GetCuratorInfoConfig) =>
  api.get<Curator>('/api/companies/curator', config);

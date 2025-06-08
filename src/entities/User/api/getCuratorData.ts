import { ICurator } from '../models';

import { api } from '@/shared/api';

export const getCuratorData = async (): Promise<ICurator> => {
  const { data } = await api.get<ICurator>(`/api/companies/curator`, {});

  return data;
};

import { IApplicationDetails } from '../models';

import { api } from '@/shared/api';

export const getApplicationInfo = async (
  id: string,
): Promise<IApplicationDetails> => {
  const { data } = await api.get<IApplicationDetails>(`/applications/${id}`);

  return data;
};

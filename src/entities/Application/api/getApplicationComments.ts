import { IComment } from '../models';

import { api } from '@/shared/api';

export const getApplicationComments = async (
  id: string,
): Promise<IComment[]> => {
  const { data } = await api.get<IComment[]>(`/api/${id}/comments`);

  return data;
};

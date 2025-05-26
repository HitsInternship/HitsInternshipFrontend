import { Group } from '../model';

import { api } from '@/shared/api';

export const getGroups = async (): Promise<Group[]> => {
  const { data } = await api.get<Group[]>(`/groups/get`, {});

  return data;
};

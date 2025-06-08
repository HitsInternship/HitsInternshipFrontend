import { IPosition } from '../models';

import { api } from '@/shared/api';

export const getPositions = async (): Promise<IPosition[]> => {
  const { data } = await api.get<IPosition[]>('/api/positions', {});

  return data;
};

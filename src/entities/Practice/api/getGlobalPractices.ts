import { GlobalPracticeData } from '../models';

import { api } from '@/shared/api';

export const getGlobalPractices = async (): Promise<GlobalPracticeData[]> => {
  const { data } = await api.get<GlobalPracticeData[]>(
    '/api/practice/global',
    {},
  );

  return data;
};

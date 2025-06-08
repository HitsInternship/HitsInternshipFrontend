import { CreatePositionFormData } from '../models';

import { api } from '@/shared/api';

export const createPosition = async (
  payload: CreatePositionFormData,
): Promise<void> => {
  await api.post('/api/positions', payload);
};

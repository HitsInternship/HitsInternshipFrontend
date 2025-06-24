import { IUser } from '../models';

import { api } from '@/shared/api';

export const createDeanMember = async (
  payload: Omit<IUser, 'id'>,
): Promise<void> => {
  await api.post('/api/dean_member', payload);
};

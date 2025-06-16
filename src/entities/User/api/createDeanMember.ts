import { IUser } from '../models';

import { api } from '@/shared/api';

export const createDeanMember = async (payload: IUser): Promise<void> => {
  await api.post('/api/dean_member', payload);
};

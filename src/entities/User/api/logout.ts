import { api } from '@/shared/api';

export const logout = async (): Promise<void> => {
  await api.post(`/api/auth/logout`);
};

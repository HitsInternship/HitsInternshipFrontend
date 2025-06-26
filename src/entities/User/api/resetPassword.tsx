import { api } from '@/shared/api';

export const resetPassword = async (email: string): Promise<void> => {
  await api.post(`/api/auth/change-password-request`, {
    email,
  });
};

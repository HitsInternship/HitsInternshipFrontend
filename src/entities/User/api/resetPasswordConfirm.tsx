import { api } from '@/shared/api';

export const resetPasswordConfirm = async ({
  code,
  email,
  password,
}: {
  code: string;
  email: string;
  password: string;
}): Promise<void> => {
  await api.post(`/api/auth/change-password-confirm`, {
    code,
    email,
    password,
  });
};

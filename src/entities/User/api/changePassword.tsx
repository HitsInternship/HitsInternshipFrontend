import { api } from '@/shared/api';

export const changePassword = async ({
  oldPassword,
  newPassword,
  login,
}: {
  oldPassword: string;
  newPassword: string;
  login: string;
}): Promise<void> => {
  await api.put(`/api/auth/edit/pass`, {
    oldPassword,
    newPassword,
    login,
  });
};

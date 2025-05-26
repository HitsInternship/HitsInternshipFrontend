import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

import { login } from '../../api';

import { api } from '@/shared/api';
import { LoginResponse } from '@/features/LoginForm/model/types.ts';
import { useStores } from '@/shared/contexts';
import { ROUTER_PATHS } from '@/shared/consts';

export const useLogin = () => {
  const {
    userStore: { setIsAuthorized },
  } = useStores();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: async (response: AxiosResponse<LoginResponse>) => {
      if (response.data.token.accessToken.length === 44) {
        try {
          const refreshResponse = await api.post<{
            accessToken: string;
            refreshToken: string;
          }>('/auth/refresh-token', {
            refreshToken: response.data.token.refreshToken,
          });

          console.log(refreshResponse);

          const newAccessToken = refreshResponse.data.accessToken;
          const newRefreshToken = refreshResponse.data.refreshToken;
          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          setIsAuthorized(true);
          navigate(ROUTER_PATHS.COMPANIES);
        } catch (error) {
          console.error('Ошибка при обновлении токена:', error);
        }
      }
      toast.success('Авторизация прошла успешно!');
    },
    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
};

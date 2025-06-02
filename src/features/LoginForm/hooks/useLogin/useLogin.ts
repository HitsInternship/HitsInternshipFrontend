import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

import { login } from '../../api';

import { LoginResponse } from '@/features/LoginForm/model/types.ts';
import { useStores } from '@/shared/contexts';
import { ROUTER_PATHS } from '@/shared/consts';

export const useLogin = () => {
  const {
    userStore: { setIsAuthorized, setRoles },
  } = useStores();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: async (response: AxiosResponse<LoginResponse>) => {
      const { accessToken, refreshToken, roles } = response.data.token;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setIsAuthorized(true);
      setRoles(roles);
      navigate(ROUTER_PATHS.PROFILE);

      toast.success('Авторизация прошла успешно!');
    },
    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
};

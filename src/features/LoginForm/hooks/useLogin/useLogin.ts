import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { login } from '../../api';

import { useStores } from '@/shared/contexts';
import { ROUTER_PATHS } from '@/shared/consts';
export const useLogin = () => {
  const {
    userStore: { setIsAuthorized, setUserRole },
  } = useStores();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,

    onSuccess: (response) => {
      localStorage.setItem('accessToken', response.data.token.accessToken);
      localStorage.setItem('refreshToken', response.data.token.refreshToken);
      setIsAuthorized(true);
      setUserRole(response.data.token.roles);
      navigate(ROUTER_PATHS.PROFILE);
    },
    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
};

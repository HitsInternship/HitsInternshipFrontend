import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { logout } from '../api';

import { ROUTER_PATHS } from '@/shared/consts';

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      navigate(ROUTER_PATHS.LOGIN);

      toast.success('Выход из аккаунта выполнен');
    },

    onError: () => {
      toast.error('Произошла ошибка');
    },
  });
};

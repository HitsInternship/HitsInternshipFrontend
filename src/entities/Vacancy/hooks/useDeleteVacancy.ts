import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { deleteVacancy } from '../api/deleteVacancy';

import { ROUTER_PATHS } from '@/shared/consts';

export const useDeleteVacancy = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteVacancy,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      queryClient.invalidateQueries({ queryKey: ['vacancy'] });

      if (!variables.isArchive) {
        navigate(ROUTER_PATHS.VACANCIES);
      }

      const operation = variables.isArchive ? 'заархивирована' : 'удалена';
      toast.success(`Вакансия ${operation}`);
    },
    onError: () => {
      toast.error('Произошла ошибка!');
    },
  });
};

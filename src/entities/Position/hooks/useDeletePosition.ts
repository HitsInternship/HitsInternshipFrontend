import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { deletePositions } from '../api/deletePositions';

interface ErrorResponse {
  message: string;
}

export const useDeletePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePositions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] });
      toast.success('Позиция удалена');
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.log(axiosError?.response?.data?.message);

      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.message ===
          'You cannot delete this position, because there are vacancies with this position.'
      ) {
        toast.error('На основе этой позиции есть вакансии');
      } else {
        toast.error('Произошла ошибка');
      }
    },
  });
};

import { useMutation } from '@tanstack/react-query';

import { BaseMutationParams } from '@/shared/api';
import { changeVacancyResponseStatus } from '@/entities/VacancyResponse/api/changeStatus.ts';

export const useChangeVacancyResponseStatus = ({
  onSuccess,
  onError,
}: BaseMutationParams) =>
  useMutation({
    mutationFn: changeVacancyResponseStatus,
    onSuccess,
    onError,
  });

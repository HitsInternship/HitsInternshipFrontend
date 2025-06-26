import { useMutation } from '@tanstack/react-query';

import { BaseMutationParams } from '@/shared/api';
import { addTimeslot } from '@/entities/Appointment/api';

export const useCreateTimeslot = ({ onSuccess, onError }: BaseMutationParams) =>
  useMutation({
    mutationFn: addTimeslot,
    onSuccess,
    onError,
  });

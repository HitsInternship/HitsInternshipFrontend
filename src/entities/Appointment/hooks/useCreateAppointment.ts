import { useMutation } from '@tanstack/react-query';

import { BaseMutationParams } from '@/shared/api';
import { addAppointment } from '@/entities/Appointment/api';

export const useCreateAppointment = ({
  onSuccess,
  onError,
}: BaseMutationParams) =>
  useMutation({
    mutationFn: addAppointment,
    onSuccess,
    onError,
  });

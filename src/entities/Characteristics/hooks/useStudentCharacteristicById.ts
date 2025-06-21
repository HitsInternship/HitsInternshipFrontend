import { useQuery } from '@tanstack/react-query';

import { StudentCharacteristic } from '../models';
import { getStudentCharacteristicById } from '../api';

export const useStudentCharacteristicById = (id: string) => {
  return useQuery<StudentCharacteristic>({
    queryKey: ['student-characteristics', id],
    queryFn: () => getStudentCharacteristicById(id),
    enabled: !!id,
    gcTime: 5 * 60 * 1000,
  });
};

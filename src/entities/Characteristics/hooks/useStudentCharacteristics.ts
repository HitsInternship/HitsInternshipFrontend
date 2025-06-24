import { useQuery } from '@tanstack/react-query';

import { StudentCharacteristic } from '../models';
import { getStudentCharacteristics } from '../api';

export const useStudentCharacteristics = () => {
  return useQuery<StudentCharacteristic[]>({
    queryKey: ['student-characteristics'],
    queryFn: getStudentCharacteristics,
    gcTime: 5 * 60 * 1000,
    staleTime: 30 * 1000,
  });
};

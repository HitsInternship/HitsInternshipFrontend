import { useQuery } from '@tanstack/react-query';

import { getStudentPractice } from '../api/getStudentPractice';
import { StudentPractice } from '../models';

export const useStudentPractice = () => {
  return useQuery<StudentPractice[]>({
    queryKey: ['student-practices'],
    queryFn: getStudentPractice,
    gcTime: 5 * 60 * 1000,
    staleTime: 30 * 1000,
  });
};

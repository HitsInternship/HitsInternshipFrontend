import { useQuery } from '@tanstack/react-query';

import { StudentPracticeDiary } from '../models';
import { getStudentDiaries } from '../api';

export const useStudentDiaries = () => {
  return useQuery<StudentPracticeDiary[]>({
    queryKey: ['student-diaries'],
    queryFn: getStudentDiaries,
    gcTime: 5 * 60 * 1000,
    staleTime: 30 * 1000,
  });
};

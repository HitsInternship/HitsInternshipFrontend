import { useQuery } from '@tanstack/react-query';

import { StudentPracticeDiary } from '../models';
import { getStudentDiaryById } from '../api';

export const useStudentDiaryById = (id: string | null) => {
  return useQuery<StudentPracticeDiary>({
    queryKey: ['student-diaries', id],
    queryFn: () => getStudentDiaryById(id!),
    enabled: !!id,
    gcTime: 5 * 60 * 1000,
  });
};

import { useQuery } from '@tanstack/react-query';

import { getStudentsMock } from '@/entities/Student/api/getStudents.ts';

export const useStudents = () =>
  useQuery({
    queryFn: () => getStudentsMock({}),
    queryKey: ['students'],
    select: (data) => data.data,
  });

import { useQuery } from '@tanstack/react-query';

import { getStudentInfo } from '@/entities/Student/api/getStudentInfo.ts';

export const useStudent = (id: string) =>
  useQuery({
    queryFn: () => getStudentInfo({ params: { studentId: id } }),
    queryKey: ['student', id],
    select: (data) => data.data,
    enabled: !!id,
  });

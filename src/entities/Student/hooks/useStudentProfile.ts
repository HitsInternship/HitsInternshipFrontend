import { useQuery } from '@tanstack/react-query';

import { getStudentProfile } from '../api';

export const useStudentProfile = () =>
  useQuery({
    queryFn: () => getStudentProfile({}),
    queryKey: ['studentProfile'],
    select: (data) => data.data,
  });

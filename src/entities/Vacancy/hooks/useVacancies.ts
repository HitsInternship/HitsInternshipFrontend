import { useQuery } from '@tanstack/react-query';

import { getVacancies } from '../api/getVacancies';

export const useVacancies = () =>
  useQuery({
    queryKey: ['vacancies'],
    queryFn: getVacancies,
  });

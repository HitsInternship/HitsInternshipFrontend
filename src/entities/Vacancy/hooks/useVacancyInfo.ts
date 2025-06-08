import { useQuery } from '@tanstack/react-query';

import { getVacancy } from '../api/getVacancy';

export const useVacancyInfo = (id: string) =>
  useQuery({
    queryKey: ['vacancy', id],
    queryFn: () => getVacancy(id),
  });

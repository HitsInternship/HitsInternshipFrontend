import { useQuery } from '@tanstack/react-query';

import { getCompanies } from '../api';

export const useCompaniesList = () =>
  useQuery({
    queryFn: () => getCompanies({}),
    queryKey: ['companies'],
    select: (data) => data.data,
  });

import { useQuery } from '@tanstack/react-query';

import { searchForUsers } from '../api';
import { UserSearchOptions } from '../models';

export const useSearchUsers = (params: UserSearchOptions) =>
  useQuery({
    queryKey: ['user', params],
    queryFn: () => searchForUsers({ params }),
    select: (data) => data.data,
  });

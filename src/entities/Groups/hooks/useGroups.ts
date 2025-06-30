import { useQuery } from '@tanstack/react-query';

import { Group } from '../model';
import { getGroups } from '../api/getGroup';

export const useGroups = () => {
  return useQuery<Group[]>({
    queryKey: ['groups'],
    queryFn: getGroups,
    staleTime: Infinity,
    gcTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

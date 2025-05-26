import { useQuery } from '@tanstack/react-query';

import { Group } from '../model';
import { getGroups } from '../api/getGroup';

export const useGroups = () => {
  return useQuery<Group[]>({
    queryKey: ['groups'],
    queryFn: getGroups,
  });
};

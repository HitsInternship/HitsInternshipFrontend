import { useQuery } from '@tanstack/react-query';

import { ICurator } from '../models';
import { getCuratorData } from '../api/getCuratorData';

export const useCuratorData = (enabled: boolean) => {
  return useQuery<ICurator>({
    queryKey: ['my-curator-data'],
    queryFn: getCuratorData,
    enabled: enabled,
  });
};

import { useQuery } from '@tanstack/react-query';

import { getGlobalPractices } from '../api/getGlobalPractices';

export const useGlobalPractices = () =>
  useQuery({
    queryKey: ['globalPractices'],
    queryFn: getGlobalPractices,
  });

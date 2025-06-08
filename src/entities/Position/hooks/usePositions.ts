import { useQuery } from '@tanstack/react-query';

import { getPositions } from '../api/getPositions';

export const usePositions = () =>
  useQuery({
    queryKey: ['positions'],
    queryFn: getPositions,
  });

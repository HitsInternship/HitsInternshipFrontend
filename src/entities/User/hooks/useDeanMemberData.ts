import { useQuery } from '@tanstack/react-query';

import { IDeanMember } from '../models';
import { getDeanMemberData } from '../api/getDeanMemberData';

export const useDeanMemberData = (enabled: boolean) => {
  return useQuery<IDeanMember>({
    queryKey: ['my-dean-member-data'],
    queryFn: getDeanMemberData,
    enabled: enabled,
  });
};

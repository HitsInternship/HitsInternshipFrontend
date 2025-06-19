import { useQuery } from '@tanstack/react-query';

import { getCompanyAgreements } from '../api';

export const useCompanyAgreements = (companyId: string) =>
  useQuery({
    queryFn: () => getCompanyAgreements({ params: { companyId: companyId } }),
    queryKey: ['agreements', companyId],
    enabled: !!companyId,
    select: (data) => data.data,
  });

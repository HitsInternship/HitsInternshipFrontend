import { useQuery } from '@tanstack/react-query';

import { getCompany } from '@/entities/Company/api';

export const useCompany = (companyId: string) =>
  useQuery({
    queryKey: ['company', companyId],
    queryFn: () => getCompany({ params: { id: companyId } }),
    select: (data) => data.data,
  });

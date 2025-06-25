import { useMutation } from '@tanstack/react-query';

import { getCompaniesStatistics } from '../api/getCompaniesStatistics';
import { getPositionsStatistics } from '../api/getPositionsStatistics';

export const useStatistics = () => {
  return useMutation({
    mutationFn: async ({
      positionsIds,
      companiesIds,
    }: {
      positionsIds: string[];
      companiesIds: string[];
    }) => {
      if (positionsIds.length > 0) {
        const companies = companiesIds.length > 0 ? companiesIds : undefined;
        return await getPositionsStatistics(positionsIds, companies);
      } else if (companiesIds.length > 0) {
        return await getCompaniesStatistics(companiesIds);
      }
      return null;
    },
  });
};

import { Statistics } from '../models';

import { api } from '@/shared/api';

export const getCompaniesStatistics = async (
  ids: string[],
): Promise<Statistics> => {
  console.log(ids);
  const companyIdsQuery = ids.map((id) => `companyIds=${id}`).join('&');

  const url = `/api/practice/stats/companies?${companyIdsQuery}`;

  const { data } = await api.get<Statistics>(url);

  return data;
};

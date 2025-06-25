import { Statistics } from '../models';

import { api } from '@/shared/api';

export const getPositionsStatistics = async (
  positionsIds: string[],
  companiesIds?: string[],
): Promise<Statistics> => {
  const positionQuery = positionsIds.map((id) => `positionIds=${id}`).join('&');

  const companyQuery = companiesIds?.map((id) => `companyIds=${id}`).join('&');

  const url = `/api/practice/stats/positions?${positionQuery}${companiesIds && '&' + companyQuery}`;

  const { data } = await api.get<Statistics>(url);

  return data;
};

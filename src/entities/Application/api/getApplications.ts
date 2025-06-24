import { ApplicationListResponse } from '../models';
import { IApplicationFilters } from '../models/types';

import { api } from '@/shared/api';

export const getApplications = async (
  filters: IApplicationFilters,
): Promise<ApplicationListResponse> => {
  const { data } = await api.get<ApplicationListResponse>(`/applications`, {
    params: {
      ...filters,
    },
  });

  return data;
};

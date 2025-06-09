import { SelectionStatus, Selection } from '../models';

import { api, RequestConfig } from '@/shared/api';

export interface GetSelectionsParams {
  groupNumber?: number;
  status?: SelectionStatus;
  isArchive?: boolean;
}

export type GetSelectionsConfig = RequestConfig<GetSelectionsParams>;
export const getSelections = ({ params, config }: GetSelectionsConfig) => {
  const queryParams = new URLSearchParams();
  if (params.groupNumber) {
    queryParams.append('groupNumber', params.groupNumber.toString());
  }
  if (params.status) {
    queryParams.append('status', params.status);
  }
  if (params.isArchive) {
    queryParams.append('isArchive', params.isArchive.toString());
  }

  return api.get<Selection[]>(
    `/api/selections?${queryParams.toString()}`,
    config,
  );
};

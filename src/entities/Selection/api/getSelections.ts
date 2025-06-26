import { SelectionStatus, Selection } from '../models';

import { api, RequestConfig } from '@/shared/api';

export interface GetSelectionsParams {
  groupNumber?: number;
  status?: SelectionStatus;
  isArchive?: boolean;
  semester?: string;
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
  if (params.semester) {
    queryParams.append('semesterId', params.semester.toString());
  }

  const queryString = queryParams.toString();
  const url = `/api/selections${queryString ? `?${queryString}` : ''}`;

  return api.get<Selection[]>(url, config);
};

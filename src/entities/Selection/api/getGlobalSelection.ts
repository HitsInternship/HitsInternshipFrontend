import { api, RequestConfig } from '@/shared/api';
import {
  GetGlobalSelectionResponse,
  SelectionStatus,
} from '@/entities/Selection/models/types.ts';

export interface GetSelectionsParams {
  groupNumber?: number;
  status?: SelectionStatus;
  isArchive?: boolean;
  semester?: string;
}

export type GetGlobalSelectionConfig = RequestConfig<{
  selectionId: string;
  searchParams: GetSelectionsParams;
}>;
export const getGlobalSelection = ({
  params,
  config,
}: GetGlobalSelectionConfig) => {
  const queryParams = new URLSearchParams();
  const { selectionId, searchParams } = params;
  if (searchParams.groupNumber) {
    queryParams.append('groupNumber', searchParams.groupNumber.toString());
  }
  if (searchParams.status) {
    queryParams.append('status', searchParams.status);
  }
  if (searchParams.semester) {
    queryParams.append('semesterId', searchParams.semester.toString());
  }

  const queryString = queryParams.toString();

  return api.get<GetGlobalSelectionResponse>(
    `api/selection/global/${selectionId}${queryString ? `?${queryString}` : ''}`,
    config,
  );
};

import { api, RequestConfig } from '@/shared/api';
import { SelectionExtended } from '@/entities/Selection/models/types.ts';

export type GetMySelectionConfig = RequestConfig;
export const getMySelection = ({ config }: GetMySelectionConfig) =>
  api.get<SelectionExtended>(`/api/selections/my`, config);

import { api, RequestConfig } from '@/shared/api';
import { SelectionExtended } from '@/entities/Selection/models/types.ts';

export type GetSelectionConfig = RequestConfig<{ selectionId: string }>;
export const getSelection = ({ params, config }: GetSelectionConfig) =>
  api.get<SelectionExtended>(`/selections/${params.selectionId}`, config);

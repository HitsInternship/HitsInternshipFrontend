import { api, RequestConfig } from '@/shared/api';
import { SelectionStatus } from '@/entities/Selection';

export type CreateSelectionCommentsConfig = RequestConfig<{
  content: string;
  selectionStatus: SelectionStatus | null;
}>;

export const createSelectionComment = ({
  params,
  config,
}: CreateSelectionCommentsConfig) =>
  api.post('/api/selections/comments', params, config);

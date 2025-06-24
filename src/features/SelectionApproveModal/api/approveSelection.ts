import { api, RequestConfig } from '@/shared/api';

export type ApproveSelectionConfig = RequestConfig<{ selectionId: string }>;
export const approveSelection = ({ params, config }: ApproveSelectionConfig) =>
  api.post(`/api/selections/${params.selectionId}/confirm`, null, config);

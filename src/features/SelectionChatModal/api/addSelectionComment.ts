import { api, RequestConfig } from '@/shared/api';

export interface AddSelectionCommentParams {
  selectionId: string;
  comment: string;
}

export type AddSelectionCommentConfig =
  RequestConfig<AddSelectionCommentParams>;
export const addSelectionComment = ({
  params,
  config,
}: AddSelectionCommentConfig) =>
  api.post(
    `/api/selections/${params.selectionId}/comments`,
    params.comment,
    config,
  );

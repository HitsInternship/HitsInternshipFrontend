import { ChatMessage } from '../model';

import { api, RequestConfig } from '@/shared/api';

export type GetSelectionCommentsConfig = RequestConfig<{ selectionId: string }>;
export const getSelectionComments = ({
  params,
  config,
}: GetSelectionCommentsConfig) =>
  api.get<ChatMessage[]>(
    `/api/selections/${params.selectionId}/comments`,
    config,
  );

import { api, RequestConfig } from '@/shared/api';

export type GetDocumentNameConfig = RequestConfig<{ documentId: string }>;
export const getDocumentName = ({ params, config }: GetDocumentNameConfig) =>
  api.get<string>(`/api/documents/${params.documentId}/name`, config);

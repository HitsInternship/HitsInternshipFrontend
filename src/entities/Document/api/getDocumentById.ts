import { api, RequestConfig } from '@/shared/api';

export type GetDocumentByIdConfig = RequestConfig<{
  documentId: string;
}> & {
  filename?: string;
  documentType?: string;
};

export const getDocumentById = async ({
  params,
  config,
  filename,
  documentType,
}: GetDocumentByIdConfig) => {
  const response = await api.get<Blob>(`/api/documents/${params.documentId}`, {
    responseType: 'blob',
    params: {
      ...config?.params,
      ...(documentType ? { documentType } : {}),
    },
    ...config,
  });

  const blobUrl = window.URL.createObjectURL(response.data);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename ?? 'document';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
};

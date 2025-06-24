import { api, RequestConfig } from '@/shared/api';

export type UploadFileConfig = RequestConfig<{
  file: File;
  description: string;
  companyId: string;
}>;

export const uploadFile = async ({ params, config }: UploadFileConfig) => {
  const formData = new FormData();
  formData.append('file', params.file);
  formData.append('description', params.description);

  return api.post<{ description: string; documentId: string }>(
    `/api/companies/${params.companyId}/agreements/add`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    },
  );
};

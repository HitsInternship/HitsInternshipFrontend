import { api, RequestConfig } from '@/shared/api';

export type UploadFileConfig = RequestConfig<{
  file: File;
}>;

export const uploadFile = async ({ params, config }: UploadFileConfig) => {
  const formData = new FormData();
  formData.append('File', params.file);

  return api.post(`/api/excel/upload-excel`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  });
};

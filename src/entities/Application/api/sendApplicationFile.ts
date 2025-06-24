import { api } from '@/shared/api';

export const sendApplicationFile = async (
  id: string,
  file: File,
): Promise<void> => {
  const formData = new FormData();
  formData.append('File', file);

  await api.post(`/applications/${id}/file`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

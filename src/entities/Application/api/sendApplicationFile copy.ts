import { api } from '@/shared/api';

export const sendApplicationTemplate = async (file: File): Promise<void> => {
  const formData = new FormData();
  formData.append('File', file);

  await api.post(`/applications/template`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

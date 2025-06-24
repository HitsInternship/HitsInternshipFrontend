import { api } from '@/shared/api';

export const addCharacteristicComment = async (
  characteristicId: string,
  comment: string,
): Promise<void> => {
  await api.post(
    `/api/characteristics/student-characteristic/${characteristicId}/comments`,
    {
      comment,
    },
  );
};

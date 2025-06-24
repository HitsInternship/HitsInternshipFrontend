import { api } from '@/shared/api';

export const addDiaryComment = async (
  diaryId: string,
  comment: string,
): Promise<void> => {
  await api.post(`/api/diary/practice-diary/${diaryId}/comments`, {
    comment,
  });
};

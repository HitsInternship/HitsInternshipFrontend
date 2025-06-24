import { api } from '@/shared/api';

export const changePracticeMark = async ({
  practiceId,
  mark,
}: {
  practiceId: string;
  mark: number;
}): Promise<void> => {
  await api.put(`/api/practice/${practiceId}/mark?mark=${mark}`, null);
};

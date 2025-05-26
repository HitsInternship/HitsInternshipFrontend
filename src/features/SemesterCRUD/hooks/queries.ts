import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { UpdateSemesterDto } from '@/features/SemesterCRUD//model/types';
import {
  createSemester,
  deleteOrArchiveSemester,
  getSemesters,
  updateSemester,
} from '@/features/SemesterCRUD/api';

export const useSemesters = (isArchive: boolean) => {
  return useQuery({
    queryKey: ['semesters', isArchive],
    queryFn: () => getSemesters(isArchive),
  });
};

export const useCreateSemester = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSemester,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
    },
  });
};

export const useUpdateSemester = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      semesterId,
      payload,
    }: {
      semesterId: string;
      payload: UpdateSemesterDto;
    }) => updateSemester(semesterId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
    },
  });
};

export const useDeleteOrArchiveSemester = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      semesterId,
      isArchive,
    }: {
      semesterId: string;
      isArchive: boolean;
    }) => deleteOrArchiveSemester(semesterId, isArchive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
    },
  });
};

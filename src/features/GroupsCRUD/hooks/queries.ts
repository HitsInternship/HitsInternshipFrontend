import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createGroup,
  deleteGroup,
  updateGroup,
  getGroupById,
} from '@/features/GroupsCRUD/api';
import { Group } from '@/entities/Groups';

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
};

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
};

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
};

export const useGroup = (id: string) => {
  return useQuery<Group>({
    queryKey: ['groups', id],
    queryFn: () => getGroupById(id),
    enabled: !!id,
    gcTime: 3 * 60 * 1000,
  });
};

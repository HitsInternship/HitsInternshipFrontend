import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Group } from '@/features/GroupsCRUD/model';
import {
  createGroup,
  deleteGroup,
  getGroups,
  updateGroup,
} from '@/features/GroupsCRUD/api';

export const useGroups = () => {
  return useQuery<Group[]>({
    queryKey: ['groups'],
    queryFn: getGroups,
  });
};

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

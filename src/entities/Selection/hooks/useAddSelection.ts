import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addSelection } from '../api';

export const useAddSelection = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { semesterId: string; streamId: string; deadline: string }
  >({
    mutationFn: ({ semesterId, streamId, deadline }) =>
      addSelection(semesterId, streamId, deadline),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['globalSelections'] });
    },
  });
};

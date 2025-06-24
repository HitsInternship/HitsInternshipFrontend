import { useQuery } from '@tanstack/react-query';

import { getApplicationComments } from '../api/getApplicationComments';

export const useApplicationComments = (id: string) =>
  useQuery({
    queryKey: ['comments', id],
    queryFn: () => getApplicationComments(id),
  });

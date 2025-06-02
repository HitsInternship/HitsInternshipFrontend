import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createStream,
  createStreamSemester,
  deleteOrArchiveStreamSemester,
  deleteStream,
  getStreams,
  getStreamSemesters,
  updateStream,
  updateStreamSemester,
  updateStreamStatus,
} from '@/features/StreamsCRUD/api';
import {
  CreateStreamSemesterDto,
  Status,
  StreamSemester,
} from '@/features/StreamsCRUD/model';

export const useStreams = () => {
  return useQuery({
    queryKey: ['streams'],
    queryFn: getStreams,
    gcTime: 3 * 60 * 1000,
  });
};

export const useCreateStream = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStream,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streams'] });
    },
  });
};

export const useUpdateStream = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStream,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streams'] });
    },
  });
};

export const useUpdateStreamStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Status }) =>
      updateStreamStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streams'] });
    },
  });
};

export const useDeleteStream = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStream,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streams'] });
    },
  });
};

export const useStreamSemesters = (streamId: string | null) => {
  return useQuery<StreamSemester[]>({
    queryKey: ['stream-semester', streamId],
    queryFn: () => getStreamSemesters(streamId as string),
    enabled: !!streamId,
  });
};

export const useCreateStreamSemester = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStreamSemester,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stream-semester'] });
    },
  });
};

export const useUpdateStreamSemester = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: CreateStreamSemesterDto;
    }) => updateStreamSemester(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stream-semester'] });
    },
  });
};

export const useDeleteOrArchiveStreamSemester = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isArchive }: { id: string; isArchive: boolean }) =>
      deleteOrArchiveStreamSemester(id, isArchive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stream-semester'] });
    },
  });
};

import { IStudent } from '../models';

import { api, RequestConfig } from '@/shared/api';

export type GetStudentsByStreamConfig = RequestConfig<{ streamId: string }>;
export const getStudentsByStream = ({
  params,
  config,
}: GetStudentsByStreamConfig) =>
  api.get<IStudent[]>(
    `/api/student/get-students-by-stream/${params.streamId}`,
    config,
  );

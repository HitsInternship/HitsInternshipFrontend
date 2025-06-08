import { IStudent } from '../models';

import { api, RequestConfig } from '@/shared/api';

export type GetStudentsByGroupConfig = RequestConfig<{ groupId: string }>;
export const getStudentsByGroup = ({
  params,
  config,
}: GetStudentsByGroupConfig) =>
  api.get<IStudent[]>(
    `/api/student/get-students-by-group/${params.groupId}`,
    config,
  );

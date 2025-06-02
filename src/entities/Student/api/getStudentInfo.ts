import { IStudent } from '../models';

import { api, RequestConfig } from '@/shared/api';

export type GetStudentsInfoConfig = RequestConfig<{ studentId: string }>;
export const getStudentInfo = ({ params, config }: GetStudentsInfoConfig) =>
  api.get<IStudent>(`/api/student/get-student/${params.studentId}`, config);

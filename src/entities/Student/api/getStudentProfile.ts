import { IStudent } from '../models';

import { api, RequestConfig } from '@/shared/api';

export type GetStudentProfileConfig = RequestConfig;
export const getStudentProfile = ({ config }: GetStudentProfileConfig) =>
  api.get<IStudent>('/api/student/get-student', config);

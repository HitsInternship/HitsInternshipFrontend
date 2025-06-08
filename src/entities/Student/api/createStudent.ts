import { CreateStudentDTO } from '../models';

import { api, RequestConfig } from '@/shared/api';

export type CreateStudentConfig = RequestConfig<CreateStudentDTO>;
export const createStudent = ({ params, config }: CreateStudentConfig) =>
  api.post('/api/student/create', params, config);

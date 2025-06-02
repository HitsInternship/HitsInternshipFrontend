import { EditStudentDTO } from '../models';

import { api, RequestConfig } from '@/shared/api';

export type EditStudentConfig = RequestConfig<EditStudentDTO>;
export const editStudentInfo = ({ params, config }: EditStudentConfig) =>
  api.put('/api/student/edit-student', params, config);

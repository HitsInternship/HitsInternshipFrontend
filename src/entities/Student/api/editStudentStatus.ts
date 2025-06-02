import { EditStudentStatusDTO } from '../models';

import { api, RequestConfig } from '@/shared/api';

export type EditStudentStatusConfig = RequestConfig<EditStudentStatusDTO>;
export const editStudentStatus = ({
  params,
  config,
}: EditStudentStatusConfig) =>
  api.patch('/api/student/edit-student-status', params, config);

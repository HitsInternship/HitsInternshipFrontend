import { EditStudentGroupDTO } from '../models';

import { api, RequestConfig } from '@/shared/api';

export type EditStudentGroupConfig = RequestConfig<EditStudentGroupDTO>;
export const editStudentGroup = ({ params, config }: EditStudentGroupConfig) =>
  api.patch('/api/student/edit-student-group', params, config);

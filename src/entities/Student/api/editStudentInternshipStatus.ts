import { EditStudentInternshipStatusDTO } from '../models';

import { api, RequestConfig } from '@/shared/api';

export type EditStudentInternshipStatusConfig =
  RequestConfig<EditStudentInternshipStatusDTO>;
export const editStudentInternshipStatus = ({
  params,
  config,
}: EditStudentInternshipStatusConfig) =>
  api.patch('/api/student/edit-student-internship-status', params, config);

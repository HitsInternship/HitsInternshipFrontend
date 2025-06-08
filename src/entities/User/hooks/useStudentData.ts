import { useQuery } from '@tanstack/react-query';

import { IStudent } from '../models';
import { getStudentData } from '../api/getStudentData';

export const useStudentData = () => {
  return useQuery<IStudent>({
    queryKey: ['my-student-data'],
    queryFn: getStudentData,
  });
};

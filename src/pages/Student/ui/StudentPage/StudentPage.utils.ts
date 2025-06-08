import { IStudent } from '@/entities/Student';

export const getFullName = (student: IStudent) => {
  const parts = [student.surname, student.name, student.middlename].filter(
    Boolean,
  );
  return parts.join(' ') || 'Не указано';
};

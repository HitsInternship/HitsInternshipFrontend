import { IStudent, StudentStatus } from '@/entities/Student/models/types.ts';

export const getStatusColor = (status: StudentStatus) => {
  switch (status) {
    case 'InProcess':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'OnAcademicLeave':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'Graduated':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'Expelled':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'Transfered':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

export const getStatusText = (status: StudentStatus) => {
  switch (status) {
    case 'InProcess':
      return 'Обучается';
    case 'OnAcademicLeave':
      return 'Академический отпуск';
    case 'Graduated':
      return 'Выпускник';
    case 'Expelled':
      return 'Отчислен';
    case 'Transfered':
      return 'Переведен';
    default:
      return status;
  }
};

export const getFullName = (student: IStudent) => {
  const parts = [student.surname, student.name, student.middlename].filter(
    Boolean,
  );
  return parts.join(' ') || 'Не указано';
};

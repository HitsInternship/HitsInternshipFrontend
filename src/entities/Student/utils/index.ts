import { EInternshipStatus, EStudentStatus } from '../models';

export const getStatusColor = (status: EStudentStatus) => {
  switch (status) {
    case EStudentStatus.InProcess:
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case EStudentStatus.OnAcademicLeave:
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case EStudentStatus.Graduated:
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case EStudentStatus.Expelled:
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    case EStudentStatus.Transferred:
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

export const getStatusText = (status: EStudentStatus) => {
  switch (status) {
    case EStudentStatus.InProcess:
      return 'Обучается';
    case EStudentStatus.OnAcademicLeave:
      return 'Академ. отпуск';
    case EStudentStatus.Graduated:
      return 'Выпускник';
    case EStudentStatus.Expelled:
      return 'Отчислен';
    case EStudentStatus.Transferred:
      return 'Переведен';
    default:
      return status;
  }
};

export const getInternshipStatusText = (status: EInternshipStatus) => {
  switch (status) {
    case EInternshipStatus.UnderSecondGrade:
      return 'Еще рано';
    case EInternshipStatus.InSearch:
      return 'В поиске';
    case EInternshipStatus.GotInternship:
      return 'На практике';
    default:
      return status;
  }
};

export const getInternshipStatusColor = (status: EInternshipStatus) => {
  switch (status) {
    case EInternshipStatus.UnderSecondGrade:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    case EInternshipStatus.InSearch:
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case EInternshipStatus.GotInternship:
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

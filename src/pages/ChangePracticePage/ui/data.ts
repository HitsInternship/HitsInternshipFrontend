import { ApplicationListResponse } from '@/entities/Application';
import { EApplicationStatus } from '@/entities/Application/models/types';
import { ECompanyStatus } from '@/entities/Company/models';
import { EInternshipStatus, EStudentStatus } from '@/entities/Student';

export const mockData: ApplicationListResponse = {
  applications: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      isDeleted: false,
      date: '2025-06-07T09:36:52.374Z',
      status: EApplicationStatus.Created,
      student: {
        id: 'student-1',
        name: 'Иван',
        surname: 'Петров',
        middlename: 'Сергеевич',
        email: 'ivan.petrov@example.com',
        phone: '+7 (999) 123-45-67',
        isHeadMan: false,
        status: EStudentStatus.InProcess,
        internshipStatus: EInternshipStatus.InSearch,
        groupNumber: 101,
        course: 3,
      },
      company: {
        id: 'company-1',
        name: 'ООО "Технологии Будущего"',
        description: 'Разработка программного обеспечения',
        status: ECompanyStatus.Partner,
      },
      position: {
        id: 'position-1',
        isDeleted: false,
        name: 'Frontend разработчик',
        description: 'Разработка пользовательских интерфейсов',
      },
    },
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
      isDeleted: false,
      date: '2025-06-06T14:22:15.123Z',
      status: EApplicationStatus.UnderConsideration,
      student: {
        id: 'student-2',
        name: 'Мария',
        surname: 'Иванова',
        middlename: 'Александровна',
        email: 'maria.ivanova@example.com',
        phone: '+7 (999) 987-65-43',
        isHeadMan: true,
        status: EStudentStatus.InProcess,
        internshipStatus: EInternshipStatus.InSearch,
        groupNumber: 102,
        course: 4,
      },
      company: {
        id: 'company-2',
        name: 'АО "Инновационные Решения"',
        description: 'Консалтинг и IT-услуги',
        status: ECompanyStatus.Partner,
      },
      position: {
        id: 'position-2',
        isDeleted: false,
        name: 'Backend разработчик',
        description: 'Разработка серверной части приложений',
      },
    },
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
      isDeleted: true,
      date: '2025-06-05T10:15:30.456Z',
      status: EApplicationStatus.Rejected,
      student: {
        id: 'student-3',
        name: 'Алексей',
        surname: 'Сидоров',
        middlename: 'Владимирович',
        email: 'alexey.sidorov@example.com',
        phone: '+7 (999) 555-44-33',
        isHeadMan: false,
        status: EStudentStatus.InProcess,
        internshipStatus: EInternshipStatus.InSearch,
        groupNumber: 103,
        course: 2,
      },
      company: {
        id: 'company-3',
        name: 'ИП Козлов А.В.',
        description: 'Веб-разработка',
        status: ECompanyStatus.Partner,
      },
      position: {
        id: 'position-3',
        isDeleted: false,
        name: 'Fullstack разработчик',
        description: 'Полный цикл разработки веб-приложений',
      },
    },
  ],
  pagination: {
    size: 10,
    count: 2,
    current: 1,
  },
};

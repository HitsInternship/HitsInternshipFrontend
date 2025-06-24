import { UserRole } from '@/entities/User/models';
import { ROUTER_PATHS } from '@/shared/consts';

export interface IHeaderItem {
  name: string;
  link: string;
  roles: UserRole[];
}

export const HeaderItems: IHeaderItem[] = [
  // {
  //   name: 'Профиль',
  //   link: ROUTER_PATHS.PROFILE,
  //   roles: [UserRole.Curator, UserRole.DeanMember, UserRole.Student],
  // },
  // {
  //   name: 'Стажировки',
  //   link: ROUTER_PATHS.INTERNSHIP,
  //   roles: [UserRole.Student],
  // },
  {
    name: 'Группы',
    link: ROUTER_PATHS.SEMESTER_STREAM_GROUP,
    roles: [UserRole.Curator, UserRole.DeanMember],
  },
  {
    name: 'Студенты',
    link: ROUTER_PATHS.STUDENTS,
    roles: [UserRole.Curator, UserRole.DeanMember],
  },
  {
    name: 'Вакансии',
    link: ROUTER_PATHS.VACANCIES,
    roles: [UserRole.Curator, UserRole.DeanMember, UserRole.Student],
  },
  {
    name: 'Компании',
    link: ROUTER_PATHS.COMPANIES,
    roles: [UserRole.Curator, UserRole.DeanMember, UserRole.Student],
  },
  {
    name: 'Отборы',
    link: ROUTER_PATHS.SELECTIONS,
    roles: [ UserRole.DeanMember, UserRole.Curator],
  },
  {
    name: 'Практики',
    link: ROUTER_PATHS.PRACTICES,
    roles: [ UserRole.Curator, UserRole.DeanMember, UserRole.Student],
  },
];

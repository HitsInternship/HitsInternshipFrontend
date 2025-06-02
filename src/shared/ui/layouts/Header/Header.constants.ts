import { TUserRole } from '@/entities/User/models';
import { ROUTER_PATHS } from '@/shared/consts';

export interface IHeaderItem {
  name: string;
  link: string;
  roles: TUserRole[];
}

export const HeaderItems: IHeaderItem[] = [
  {
    name: 'Профиль',
    link: ROUTER_PATHS.PROFILE,
    roles: ['Student', 'DeanMember', 'Curator'],
  },
  {
    name: 'Стажировки',
    link: ROUTER_PATHS.INTERNSHIP,
    roles: ['Student'],
  },
  {
    name: 'Семестры/Потоки/Группы',
    link: ROUTER_PATHS.SEMESTER_STREAM_GROUP,
    roles: ['DeanMember', 'Curator'],
  },
  {
    name: 'Студенты',
    link: ROUTER_PATHS.STUDENTS,
    roles: ['DeanMember', 'Curator'],
  },
];

import { ROUTER_PATHS } from "@/shared/consts";

export interface IHeaderItem {
  name: string;
  link: string;
}
export const HeaderItems: IHeaderItem[] = [
  {
    name: 'Профиль',
    link: ROUTER_PATHS.PROFILE,
  },
  {
    name: 'Стажировки',
    link: ROUTER_PATHS.INTERNSHIP,
  },
  {
    name: 'Семестры/Потоки/Группы',
    link: ROUTER_PATHS.SEMESTER_STREAM_GROUP,
  },
  {
    name: 'Студенты',
    link: ROUTER_PATHS.STUDENTS,
  },
];

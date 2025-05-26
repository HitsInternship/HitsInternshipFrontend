export interface IHeaderItem {
  name: string;
  link: string;
}
export const HeaderItems: IHeaderItem[] = [
  {
    name: 'Профиль',
    link: '/profile',
  },
  {
    name: 'Стажировки',
    link: '/internship',
  },
  {
    name: 'Семестры/Потоки/Группы',
    link: '/semester-stream-group',
  },
];

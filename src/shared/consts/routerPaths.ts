export const ROUTER_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  PROFILE: '/profile',
  COMPANIES: '/companies',
  COMPANY: (id: string) => `/companies/${id}`,
  SEMESTER_STREAM_GROUP: '/semester-stream-group',
  STUDENTS: '/students',
  VACANCIES: '/vacancies',
  VACANCY: (id: string) => `/vacancy/${id}`,
  CHANGE_PRACTICE: '/change-practice',
  SELECTIONS: '/selections',
  PRACTICE: '/practice',
};

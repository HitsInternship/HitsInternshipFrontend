export const ROUTER_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  PROFILE: '/profile',
  INTERNSHIP: '/internship',
  COMPANIES: '/companies',
  COMPANY: (id: string) => `/companies/${id}`,
  EDIT_COMPANY: (id: string) => `/companies/${id}/edit`,
  CREATE_COMPANY: '/companies/new',
  CREATE_COMPANY_PERSON: '/companies/new-person',
  SEMESTER_STREAM_GROUP: '/semester-stream-group',
};

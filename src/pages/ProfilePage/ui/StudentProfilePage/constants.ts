import { TUserInternshipStatus } from '@/entities/User';

export const InternshipStatus: Record<TUserInternshipStatus, string> = {
  Small: 'Small',
  Candidate: 'В процессе поиска стажировки',
  Intern: 'В процессе прохождения стажировки',
};

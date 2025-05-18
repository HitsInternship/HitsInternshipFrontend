export type TInternshipStatus = 'completed' | 'ongoing';

export interface IInternship {
  id: string;
  company: string;
  position: string;
  period: string;
  semester: string;
  rating?: number;
  status: TInternshipStatus;
}

export const internshipStatus: Record<TInternshipStatus, string> = {
  ['completed']: 'завершена',
  ['ongoing']: 'в процессе',
};

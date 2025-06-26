import { CreateTimeslotDTO, Timeslot } from '../model';

import { api, RequestConfig } from '@/shared/api';

export type AddTimeslotConfig = RequestConfig<CreateTimeslotDTO>;
export const addTimeslot = ({ params, config }: AddTimeslotConfig) =>
  api.post<Timeslot>('/api/companies/timeslots/add', params, config);

import { api, RequestConfig } from '@/shared/api';

export type DeleteTimeslotConfig = RequestConfig<{ timeslotId: string }>;
export const deleteTimeslot = ({ params, config }: DeleteTimeslotConfig) =>
  api.delete(`/api/companies/timeslots/${params.timeslotId}`, config);

import { AddAppointmentDTO, Appointment } from '../model';

import { api, RequestConfig } from '@/shared/api';

export type AddAppointmentConfig = RequestConfig<AddAppointmentDTO>;
export const addAppointment = ({ params, config }: AddAppointmentConfig) =>
  api.post<Appointment>(
    `/api/companies/${params.companyId}/appointments/add`,
    { timeslotId: params.timeslotId, description: params.description },
    config,
  );

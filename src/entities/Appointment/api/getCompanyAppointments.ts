import { api, RequestConfig } from '@/shared/api';
import { Appointment } from '@/entities/Appointment/model';

export type GetCompanyAppointmentsConfig = RequestConfig<{ companyId: string }>;
export const getCompanyAppointments = ({
  params,
  config,
}: GetCompanyAppointmentsConfig) =>
  api.get<Appointment[]>(
    `/api/companies/${params.companyId}/appointments`,
    config,
  );

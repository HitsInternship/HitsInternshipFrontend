import { api, RequestConfig } from '@/shared/api';

export type DeleteAppointmentConfig = RequestConfig<{ appointmentId: string }>;
export const deleteAppointment = ({
  params,
  config,
}: DeleteAppointmentConfig) =>
  api.delete(`/api/companies/appointments/${params.appointmentId}`, config);

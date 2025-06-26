import { api, RequestConfig } from '@/shared/api';
import {
  GetCalendarParams,
  Schedule,
} from '@/entities/Appointment/model/types.ts';

export type GetCalendarConfig = RequestConfig<GetCalendarParams>;
export const getCalendar = ({ params, config }: GetCalendarConfig) =>
  api.get<Schedule>(
    `/api/companies/appointments/calendar?startDate=${params.startDate}&endDate=${params.endDate}`,
    config,
  );

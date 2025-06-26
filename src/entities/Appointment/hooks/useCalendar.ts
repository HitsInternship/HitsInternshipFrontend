import { useQuery } from '@tanstack/react-query';

import { GetCalendarParams } from '@/entities/Appointment/model/types.ts';
import { getCalendar } from '@/entities/Appointment/api';

export const useCalendar = (
  params: GetCalendarParams,
  enabled: boolean | undefined = true,
) =>
  useQuery({
    queryKey: ['calendar', params.startDate, params.endDate],
    queryFn: () =>
      getCalendar({
        params: { startDate: params.startDate, endDate: params.endDate },
      }),
    select: (data) => data.data,
    enabled,
  });

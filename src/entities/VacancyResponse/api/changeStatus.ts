import { api, RequestConfig } from '@/shared/api';
import { SelectionVacancyStatus } from '@/entities/Selection/models/types.ts';

export type ChangeVacancyResponseStatusConfig = RequestConfig<{
  id: string;
  status: SelectionVacancyStatus;
}>;
export const changeVacancyResponseStatus = ({
  params,
  config,
}: ChangeVacancyResponseStatusConfig) =>
  api.patch(`/api/vacancies/${params.id}`, params.status, config);

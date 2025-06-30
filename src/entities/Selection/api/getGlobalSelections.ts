import { api, RequestConfig } from '@/shared/api';
import { GlobalSelection } from '@/entities/Selection/models/types.ts';

export type GetGlobalSelectionsConfig = RequestConfig<{ isArchived: boolean }>;
export const getGlobalSelections = ({
  params,
  config,
}: GetGlobalSelectionsConfig) =>
  api.get<GlobalSelection[]>(
    `/api/selection/global?isArchived=${params.isArchived}`,
    config,
  );

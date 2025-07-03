import { api, RequestConfig } from '@/shared/api';

export type ArchiveGlobalSelectionConfig = RequestConfig<{
  selectionId: string;
}>;
export const archiveGlobalSelection = ({
  params,
  config,
}: ArchiveGlobalSelectionConfig) =>
  api.post(`/api/selection/global/${params.selectionId}/archive`, config);

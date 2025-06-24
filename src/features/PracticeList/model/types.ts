import { Company } from '@/entities/Company/models';
import { Group } from '@/entities/Groups';

export type PracticeFiltersProps = {
  filters: {
    groupId: string | undefined;
    companyId: string | undefined;
    hasMark: boolean | undefined;
  };
  onChange: (filters: PracticeFiltersProps['filters']) => void;
  groups: Group[];
  companies: Company[] | undefined;
};

import { Company } from '@/entities/Company/models';
import { Group } from '@/entities/Groups';
import { IPosition } from '@/entities/Position';

export enum DocumentType {
  StudentPracticeCharacteristic = 'StudentPracticeCharacteristic',
  PracticeDiary = 'PracticeDiary',
}

export type PotentialPracticeFiltersProps = {
  filters: {
    groupId: string | undefined;
    oldCompanyId: string | undefined;
    oldPositionId: string | undefined;
  };
  onChange: (filters: PotentialPracticeFiltersProps['filters']) => void;
  groups: Group[];
  companies: Company[] | undefined;
  positions: IPosition[] | undefined;
};

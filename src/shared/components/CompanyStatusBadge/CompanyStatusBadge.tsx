import { Badge } from '@/shared/ui/badge';
import { CompanyStatus } from '@/entities/Company/models/types/types.ts';

export interface ICompanyStatusBadgeProps {
  status: CompanyStatus;
}

export const CompanyStatusBadge = ({ status }: ICompanyStatusBadgeProps) => {
  switch (status) {
    case 'Partner':
      return <Badge className='bg-green-500 hover:bg-green-600'>Партнер</Badge>;
    case 'FormerPartner':
      return (
        <Badge className='bg-gray-500 hover:bg-gray-600'>Бывший партнер</Badge>
      );
    case 'PotentialPartner':
      return (
        <Badge className='bg-amber-500 hover:bg-amber-600'>
          Потенциальный партнер
        </Badge>
      );
    default:
      return null;
  }
};

import { TInternshipStatus } from '@/entities/Internship';
import { Badge } from '@/shared/ui';

export const StatusBadge = ({ status }: { status: TInternshipStatus }) => {
  if (status === 'completed') {
    return <Badge variant='secondary'>Завершена</Badge>;
  } else if (status === 'ongoing') {
    return <Badge variant='default'>В процессе</Badge>;
  } else {
    return <Badge variant='outline'>Предстоящая</Badge>;
  }
};

import { Crown, Mail, Phone } from 'lucide-react';

import { StudentItemProps } from './StudentItem.types';

import { StudentStatus } from '@/features/StreamsCRUD/model/types';
import { Badge } from '@/shared/ui';
import { TableCell, TableRow } from '@/shared/ui/table';

export const StudentItem = ({ student }: StudentItemProps) => {
  const getStudentStatusBadge = (status: StudentStatus) => {
    switch (status) {
      case 'InProcess':
        return <Badge className='bg-green-500'>В процессе</Badge>;
      case 'Expelled':
        return <Badge className='bg-red-500'>Отчислен</Badge>;
      case 'OnAcademicLeave':
        return <Badge className='bg-yellow-500'>Академический отпуск</Badge>;
      case 'Transfered':
        return <Badge className='bg-blue-500'>Переведён</Badge>;
      case 'Graduated':
        return <Badge className='bg-purple-500'>Выпускник</Badge>;
      default:
        return <Badge>Неизвестный статус</Badge>;
    }
  };

  return (
    <TableRow>
      <TableCell>
        <div>
          <div className='font-medium'>
            {student.surname} {student.name} {student.middlename}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className='space-y-1'>
          <div className='flex items-center gap-2 text-sm'>
            <Mail className='h-3 w-3' />
            <span>{student.email}</span>
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <Phone className='h-3 w-3' />
            <span>{student.phone}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>{student.course}</TableCell>
      <TableCell>{getStudentStatusBadge(student.status)}</TableCell>
      <TableCell>
        {student.isHeadMan && (
          <Badge variant='outline' className='flex items-center gap-1 w-fit'>
            <Crown className='h-3 w-3' />
            Староста
          </Badge>
        )}
      </TableCell>
    </TableRow>
  );
};

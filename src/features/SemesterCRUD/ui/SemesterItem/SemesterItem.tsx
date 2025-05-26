import { ru } from 'date-fns/locale';
import { Edit, Archive, Trash2, EllipsisVertical } from 'lucide-react';
import { format } from 'date-fns';

import { SemesterItemProps } from './SemesterItem.types';

import { TableRow, TableCell } from '@/shared/ui/table';
import { Button } from '@/shared/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

export const SemesterItem = ({
  semester,
  handleEditSemester,
  handleArchiveSemester,
  handleDeleteSemester,
}: SemesterItemProps) => {
  return (
    <TableRow className={semester.isDeleted ? 'bg-muted/50' : ''}>
      <TableCell>
        {format(semester.startDate, 'dd MMMM yyyy', {
          locale: ru,
        })}
      </TableCell>
      <TableCell>
        {format(semester.endDate, 'dd MMMM yyyy', { locale: ru })}
      </TableCell>
      <TableCell>{semester.description}</TableCell>
      <TableCell>
        {semester.isDeleted ? (
          <span className='text-muted-foreground'>В архиве</span>
        ) : (
          <span className='text-green-500'>Активный</span>
        )}
      </TableCell>
      <TableCell className='text-right'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon'>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {!semester.isDeleted && (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    requestAnimationFrame(() => {
                      handleEditSemester(semester);
                    });
                  }}
                >
                  <Edit className='mr-2 h-4 w-4' />
                  Редактировать
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    requestAnimationFrame(() => {
                      handleArchiveSemester(semester.id);
                    });
                  }}
                >
                  <Archive className='mr-2 h-4 w-4' />
                  Архивировать
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem
              className='text-destructive focus:text-destructive'
              onClick={() => {
                requestAnimationFrame(() => {
                  handleDeleteSemester(semester.id);
                });
              }}
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

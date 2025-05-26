import {
  Edit,
  EllipsisVertical,
  ExternalLink,
  Link,
  Trash2,
} from 'lucide-react';

import { StreamItemProps } from './StreamItem.types';

import { TableCell, TableRow } from '@/shared/ui/table';
import { Badge, Button } from '@/shared/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
  useDeleteStream,
  useStreamSemesters,
} from '@/features/StreamsCRUD/hooks';

export const StreamItem = ({
  stream,
  handleViewLinkedSemesters,
  handleEditStream,
  handleAddLink,
}: StreamItemProps) => {
  const { mutateAsync: deleteStreamMutation } = useDeleteStream();
  const { data: streamSemesters = [] } = useStreamSemesters(stream.id);

  const getStatusBadge = (status: 'Selection' | 'Practice' | 'None') => {
    switch (status) {
      case 'Selection':
        return <Badge className='bg-blue-500'>Отбор</Badge>;
      case 'Practice':
        return <Badge className='bg-green-500'>Практика</Badge>;
      case 'None':
        return <Badge variant='outline'>Нет</Badge>;
    }
  };

  const handleDeleteStream = () => {
    deleteStreamMutation(stream.id);
  };

  return (
    <TableRow>
      <TableCell>{stream.streamNumber}</TableCell>
      <TableCell>{stream.year}</TableCell>
      <TableCell>{stream.course}</TableCell>
      <TableCell>{getStatusBadge(stream.status)}</TableCell>
      <TableCell>
        <Button
          variant='outline'
          size='sm'
          onClick={() => handleViewLinkedSemesters(stream.id)}
        >
          <ExternalLink className='mr-2 h-4 w-4' />
          Семестры ({streamSemesters.length})
        </Button>
      </TableCell>
      <TableCell className='text-right'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon'>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={() => {
                requestAnimationFrame(() => {
                  handleEditStream(stream);
                });
              }}
            >
              <Edit className='mr-2 h-4 w-4' />
              Редактировать
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                requestAnimationFrame(() => {
                  handleAddLink(stream.id);
                });
              }}
            >
              <Link className='mr-2 h-4 w-4' />
              Добавить связь с семестром
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-destructive focus:text-destructive'
              onClick={handleDeleteStream}
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

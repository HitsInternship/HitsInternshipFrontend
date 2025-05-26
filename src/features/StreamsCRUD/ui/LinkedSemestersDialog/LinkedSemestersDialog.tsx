import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import {
  Archive,
  Edit,
  EllipsisVertical,
  PlusCircle,
  Trash2,
} from 'lucide-react';

import { LinkedSemestersDialogProps } from './LinkedSemestersDialog.types';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Badge, CardContent } from '@/shared/ui';
import {
  useDeleteOrArchiveStreamSemester,
  useStreamSemesters,
} from '@/features/StreamsCRUD/hooks';

export const LinkedSemestersDialog = ({
  isLinkedSemestersDialogOpen,
  setIsLinkedSemestersDialogOpen,
  streams,
  selectedStreamId,
  handleEditLink,
  handleAddLink,
}: LinkedSemestersDialogProps) => {
  const { data: streamSemesters = [] } = useStreamSemesters(selectedStreamId);
  const { mutateAsync: deleteOrArchiveMutation } =
    useDeleteOrArchiveStreamSemester();

  const handleDeleteLink = (id: string) => {
    deleteOrArchiveMutation({ id, isArchive: false });
  };

  const handleArchiveLink = (id: string) => {
    deleteOrArchiveMutation({ id, isArchive: true });
  };

  return (
    <Dialog
      open={isLinkedSemestersDialogOpen}
      onOpenChange={setIsLinkedSemestersDialogOpen}
    >
      <DialogContent className='sm:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>
            Связанные семестры для потока #
            {streams.find((s) => s.id === selectedStreamId)?.streamNumber || ''}
          </DialogTitle>
          <DialogDescription>
            Управление связями потока с семестрами
          </DialogDescription>
        </DialogHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>№ семестра</TableHead>
                <TableHead>Описание семестра</TableHead>
                <TableHead>Период</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className='text-right'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedStreamId && streamSemesters.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className='text-center py-10 text-muted-foreground'
                  >
                    Связанные семестры не найдены
                  </TableCell>
                </TableRow>
              ) : (
                selectedStreamId &&
                streamSemesters.map((link) => (
                  <TableRow
                    key={link.id}
                    className={link.isDeleted ? 'bg-muted/50' : ''}
                  >
                    <TableCell>{link.number}</TableCell>
                    <TableCell>{link.semester.description}</TableCell>
                    <TableCell>
                      {format(link.semester.startDate, 'dd.MM.yyyy', {
                        locale: ru,
                      })}{' '}
                      -{' '}
                      {format(link.semester.endDate, 'dd.MM.yyyy', {
                        locale: ru,
                      })}
                    </TableCell>
                    <TableCell>
                      {link.isDeleted ? (
                        <Badge variant='outline'>Архив</Badge>
                      ) : (
                        <Badge className='bg-green-500'>Активный</Badge>
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
                          {!link.isDeleted && (
                            <>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleEditLink({
                                    id: link.id,
                                    streamId: link.stream!.id,
                                    semesterId: link.semester.id,
                                    number: link.number,
                                    isDeleted: link.isDeleted,
                                    semester: link.semester,
                                  })
                                }
                              >
                                <Edit className='mr-2 h-4 w-4' />
                                Редактировать
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleArchiveLink(link.id)}
                              >
                                <Archive className='mr-2 h-4 w-4' />
                                Архивировать
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem
                            className='text-destructive focus:text-destructive'
                            onClick={() => handleDeleteLink(link.id)}
                          >
                            <Trash2 className='mr-2 h-4 w-4' />
                            Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => setIsLinkedSemestersDialogOpen(false)}
          >
            Закрыть
          </Button>
          <Button onClick={() => handleAddLink(selectedStreamId || '')}>
            <PlusCircle className='mr-2 h-4 w-4' />
            Добавить связь
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

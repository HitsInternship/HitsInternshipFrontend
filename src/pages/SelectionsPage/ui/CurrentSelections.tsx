import { useMemo, useRef, useState } from 'react';
import {
  Filter,
  LoaderCircle,
  Send,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import {
  type Candidate,
  type Selection,
  SelectionStatus,
} from '@/entities/Selection';
import { useGroups } from '@/entities/Groups';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Button } from '@/shared/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Textarea,
} from '@/shared/ui';
import { MassSelectionComment } from '@/features/MassSelectionComment/ui';
import { SelectionChatModal } from '@/features/SelectionChatModal';
import { useCreateSelectionComment } from '@/features/MassSelectionComment/hooks/useCreateSelectionComment.ts';
import { cn } from '@/shared/lib/utils.ts';
import { SelectionModal } from '@/pages/SelectionsPage/ui/SelectionModal.tsx';
import { SelectionApproveModal } from '@/features/SelectionApproveModal';
import { useGlobalSelection } from '@/entities/Selection/hooks/useGlobalSelection.ts';

export const CurrentSelections = () => {
  const params = useParams();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [groupNumber, setGroupNumber] = useState<number | undefined>();
  const [status, setStatus] = useState<SelectionStatus | undefined>();
  const [company, setCompany] = useState<string | undefined>();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const massCommentTextarea = useRef<HTMLTextAreaElement | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    if (massCommentTextarea.current) {
      massCommentTextarea.current.value = '';
    }
  };

  const { data: selections = [], isLoading: selectionsLoading } =
    useGlobalSelection(
      {
        groupNumber: groupNumber,
        isArchive: false,
        status: status,
      },
      params.id,
    );

  const { data: groups = [], isLoading: isGroupsLoading } = useGroups();

  const filteredSelections = useMemo(() => {
    if (!company) return selections;

    return selections.filter(
      (selection) =>
        selection.offer?.companyName
          ?.toLowerCase()
          .includes(company.toLowerCase()) ?? false,
    );
  }, [selections, company]);

  // Pagination logic
  const totalPages = Math.ceil(filteredSelections.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSelections = filteredSelections.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [groupNumber, status, company]);

  const getFullName = (candidate: Candidate) => {
    return `${candidate.surname} ${candidate.name} ${candidate.middlename}`.trim();
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case SelectionStatus.InProgress:
        return 'default';
      case SelectionStatus.OfferAccepted:
        return 'secondary';
      case SelectionStatus.Inactive:
        return 'outline';
      default:
        return 'default';
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Select all items on current page
      setSelectedIds((prev) => [
        ...prev.filter(
          (id) => !currentSelections.map((s) => s.id).includes(id),
        ),
        ...currentSelections.map((s: Selection) => s.id),
      ]);
    } else {
      // Deselect all items on current page
      setSelectedIds((prev) =>
        prev.filter((id) => !currentSelections.map((s) => s.id).includes(id)),
      );
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    }
  };

  const { mutate, isPending } = useCreateSelectionComment({
    onSuccess: () => {
      toast.success('Комментарий успешно добавлен');
    },
    onError: () => {
      toast.error('Произошла ошибка');
    },
  });

  const handleBulkSend = () => {
    if (massCommentTextarea.current?.value) {
      mutate({
        params: {
          selectedUsers: selectedIds,
          content: massCommentTextarea.current?.value,
        },
      });
    }
  };

  const onSendClick = () => {
    handleBulkSend();
    closeModal();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  if (isGroupsLoading || selectionsLoading) {
    return (
      <div className='flex items-center justify-center h-[90vh] w-full'>
        <LoaderCircle className='h-8 w-8 animate-spin text-black-500 dark:text-gray-300' />
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Отборы</h1>
        <div className='flex items-center gap-6'>
          <Badge variant='secondary'>Выбрано: {selectedIds.length}</Badge>
          {selectedIds.length > 0 && (
            <>
              <Dialog
                open={isModalOpen}
                onOpenChange={(open) => {
                  if (!open) {
                    closeModal();
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    variant='outline'
                    onClick={() => setIsModalOpen(true)}
                  >
                    {isPending ? 'Отправка...' : 'Отправить'}
                  </Button>
                </DialogTrigger>
                <DialogContent className='max-w-md'>
                  <DialogHeader>
                    <DialogTitle>Отправить сообщение</DialogTitle>
                  </DialogHeader>

                  <div className='space-y-4'>
                    <Textarea
                      ref={massCommentTextarea}
                      placeholder='Введите сообщение...'
                      rows={4}
                      className='resize-none'
                    />
                  </div>

                  <DialogFooter className='flex justify-end gap-2'>
                    <Button variant='outline' onClick={closeModal}>
                      Отмена
                    </Button>
                    <Button onClick={onSendClick}>
                      <Send className='h-4 w-4 mr-2' />
                      Отправить
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Filter className='h-5 w-5' />
            Фильтры
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <Label>Группа</Label>
              <Select
                value={groupNumber?.toString() || 'all'}
                onValueChange={(value) =>
                  setGroupNumber(
                    value === 'all' ? undefined : Number.parseInt(value),
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Выберите группу' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Все группы</SelectItem>
                  {groups.map((group) => (
                    <SelectItem
                      key={group.id}
                      value={group.groupNumber.toString()}
                    >
                      {group.groupNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Статус</Label>
              <Select
                value={status || 'all'}
                onValueChange={(value) =>
                  setStatus(
                    value === 'all' ? undefined : (value as SelectionStatus),
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Выберите статус' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Все статусы</SelectItem>
                  <SelectItem value={SelectionStatus.InProgress}>
                    Активный
                  </SelectItem>
                  <SelectItem value={SelectionStatus.OfferAccepted}>
                    Оффер
                  </SelectItem>
                  <SelectItem value={SelectionStatus.Inactive}>
                    Неактивный
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Компания</Label>
              <Input
                placeholder='Поиск по компании'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <MassSelectionComment />

      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>Список отборов</CardTitle>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <Label className='text-sm'>Показать:</Label>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={handleItemsPerPageChange}
                >
                  <SelectTrigger className='w-20'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='5'>5</SelectItem>
                    <SelectItem value='10'>10</SelectItem>
                    <SelectItem value='20'>20</SelectItem>
                    <SelectItem value='50'>50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='text-sm text-muted-foreground'>
                Показано {startIndex + 1}-
                {Math.min(endIndex, filteredSelections.length)} из{' '}
                {filteredSelections.length}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {selectionsLoading ? (
            <div className='flex justify-center p-8'>
              <div className='text-muted-foreground'>Загрузка...</div>
            </div>
          ) : (
            <>
              <div className='rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-12'>
                        <Checkbox
                          checked={
                            currentSelections.length > 0 &&
                            currentSelections.every((selection) =>
                              selectedIds.includes(selection.id),
                            )
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>ФИО</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Компания</TableHead>
                      <TableHead>Должность</TableHead>
                      <TableHead className='w-12' />
                      <TableHead className='w-12' />
                      <TableHead className='w-12' />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentSelections.map((selection: Selection) => (
                      <TableRow key={selection.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.includes(selection.id)}
                            onCheckedChange={(checked) =>
                              handleSelectRow(selection.id, checked as boolean)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {getFullName(selection.candidate)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={cn({
                              'text-green-600': selection.isConfirmed,
                            })}
                            variant={getStatusBadgeVariant(
                              selection.selectionStatus,
                            )}
                          >
                            {selection.selectionStatus ===
                              SelectionStatus.InProgress && 'Активный'}
                            {selection.selectionStatus ===
                              SelectionStatus.OfferAccepted && 'Оффер'}
                            {selection.selectionStatus ===
                              SelectionStatus.Inactive && 'Неактивный'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {selection.offer?.companyName ?? 'не определено'}
                        </TableCell>
                        <TableCell className='font-medium'>
                          {selection.offer?.position ?? 'не определено'}
                        </TableCell>
                        <TableCell>
                          <SelectionModal selectionId={selection.id} />
                        </TableCell>
                        <TableCell>
                          <SelectionChatModal selectionId={selection.id} />
                        </TableCell>
                        <TableCell>
                          {!selection.isConfirmed &&
                            selection.selectionStatus ===
                              SelectionStatus.OfferAccepted && (
                              <SelectionApproveModal selection={selection} />
                            )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredSelections.length === 0 && (
                  <div className='text-center p-8 text-muted-foreground'>
                    Отборы не найдены
                  </div>
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className='flex items-center justify-between mt-4'>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className='h-4 w-4' />
                      Назад
                    </Button>

                    <div className='flex items-center gap-1'>
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((page) => {
                          // Show first page, last page, current page, and pages around current
                          return (
                            page === 1 ||
                            page === totalPages ||
                            Math.abs(page - currentPage) <= 1
                          );
                        })
                        .map((page, index, array) => {
                          // Add ellipsis if there's a gap
                          const showEllipsis =
                            index > 0 && page - array[index - 1] > 1;

                          return (
                            <div key={page} className='flex items-center'>
                              {showEllipsis && (
                                <span className='px-2 text-muted-foreground'>
                                  ...
                                </span>
                              )}
                              <Button
                                variant={
                                  currentPage === page ? 'default' : 'outline'
                                }
                                size='sm'
                                onClick={() => handlePageChange(page)}
                                className='w-8 h-8 p-0'
                              >
                                {page}
                              </Button>
                            </div>
                          );
                        })}
                    </div>

                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Вперед
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                  </div>

                  <div className='text-sm text-muted-foreground'>
                    Страница {currentPage} из {totalPages}
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

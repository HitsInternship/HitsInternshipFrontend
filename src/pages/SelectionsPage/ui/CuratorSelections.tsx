import { useMemo, useRef, useState } from 'react';
import { Filter, LoaderCircle, Send } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { Candidate, Selection, SelectionStatus } from '@/entities/Selection';
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
} from '@/shared/ui';
import { SelectionApproveModal } from '@/features/SelectionApproveModal';
import { cn } from '@/shared/lib/utils.ts';
import { useGlobalSelection } from '@/entities/Selection/hooks';

export const CuratorSelections = observer(() => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [status, setStatus] = useState<SelectionStatus | undefined>();
  const [company, setCompany] = useState<string | undefined>();
  const params = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const massCommentTextarea = useRef<HTMLTextAreaElement | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    if (massCommentTextarea.current) {
      massCommentTextarea.current.value = '';
    }
  };

  const { data: selections = [], isLoading: selectionsLoading } =
    useGlobalSelection({ status: status }, params.id);

  const filteredSelections = useMemo(() => {
    if (!company) return selections;

    return selections.filter(
      (selection) =>
        selection.offer?.companyName
          ?.toLowerCase()
          .includes(company.toLowerCase()) ?? false,
    );
  }, [selections, company]);

  const getFullName = (candidate: Candidate) => {
    return `${candidate?.surname} ${candidate?.name} ${candidate?.middlename}`.trim();
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
      setSelectedIds(filteredSelections.map((s: Selection) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    }
  };

  const onApproveClick = () => {};

  if (selectionsLoading) {
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
                    Подтвердить
                  </Button>
                </DialogTrigger>
                <DialogContent className='max-w-md'>
                  <DialogHeader>
                    <DialogTitle>Подтвердить отборы</DialogTitle>
                  </DialogHeader>

                  <p>
                    Вы уверены, что хотите подтвердить получение оффера в
                    компании?
                  </p>

                  <DialogFooter className='flex justify-end gap-2'>
                    <Button variant='outline' onClick={closeModal}>
                      Отмена
                    </Button>
                    <Button onClick={onApproveClick}>
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

      <Card>
        <CardHeader>
          <CardTitle>Список отборов</CardTitle>
        </CardHeader>
        <CardContent>
          {selectionsLoading ? (
            <div className='flex justify-center p-8'>
              <div className='text-muted-foreground'>Загрузка...</div>
            </div>
          ) : (
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-12'>
                      <Checkbox
                        checked={
                          selectedIds.length === filteredSelections.length &&
                          filteredSelections.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>ФИО</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Компания</TableHead>
                    <TableHead>Должность</TableHead>
                    <TableHead className='w-12' />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSelections.map((selection: Selection) => (
                    <TableRow key={selection.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.includes(selection.id)}
                          onCheckedChange={(checked) =>
                            handleSelectRow(selection.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell>{getFullName(selection.candidate)}</TableCell>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
});

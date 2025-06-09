import { useMemo, useState } from 'react';
import { Filter, LoaderCircle } from 'lucide-react';

import {
  Candidate,
  Selection,
  SelectionStatus,
  useSelections,
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
import { Input } from '@/shared/ui';
import { MassSelectionComment } from '@/features/MassSelectionComment/ui';
import { SelectionChatModal } from '@/features/SelectionChatModal';

export const SelectionsPage = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [groupNumber, setGroupNumber] = useState<number | undefined>();
  const [status, setStatus] = useState<SelectionStatus | undefined>();
  const [company, setCompany] = useState<string | undefined>();

  const { data: selections = [], isLoading: selectionsLoading } = useSelections(
    { groupNumber: groupNumber, isArchive: false, status: status },
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

  if (isGroupsLoading || selectionsLoading) {
    return (
      <div className='flex items-center justify-center h-full w-full'>
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
          {selectedIds.length > 0 && <Button>Подтвердить отбор</Button>}
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
                  <SelectItem value='Active'>Активный</SelectItem>
                  <SelectItem value='Offer'>Предложение</SelectItem>
                  <SelectItem value='Inactive'>Неактивный</SelectItem>
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
                          variant={getStatusBadgeVariant(
                            selection.selectionStatus,
                          )}
                        >
                          {selection.selectionStatus ===
                            SelectionStatus.InProgress && 'Активный'}
                          {selection.selectionStatus ===
                            SelectionStatus.OfferAccepted && 'Предложение'}
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
                        <SelectionChatModal selectionId={selection.id} />
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
};

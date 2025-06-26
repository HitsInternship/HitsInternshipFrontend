import { type Dispatch, type SetStateAction, useMemo, useState } from 'react';
import { Filter, LoaderCircle } from 'lucide-react';

import {
  type Candidate,
  type Selection,
  SelectionStatus,
  useSelections,
} from '@/entities/Selection';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Button, Input } from '@/shared/ui';
import { useStores } from '@/shared/contexts';
import { cn } from '@/shared/lib/utils.ts';
import { useSemesters } from '@/features/SemesterCRUD';

export interface HistorySelectionsProps {
  setHistoryMode: Dispatch<SetStateAction<boolean>>;
}

export const HistorySelections = ({
  setHistoryMode,
}: HistorySelectionsProps) => {
  const {
    selectionStore: { approvedSelections },
  } = useStores();

  const [company, setCompany] = useState<string | undefined>();
  const [semester, setSemester] = useState<string | undefined>();

  const { data: semesters = [], isLoading: semestersLoading } =
    useSemesters(true);

  const { data: selections = [], isLoading: selectionsLoading } = useSelections(
    {
      isArchive: true,
      semester: semester,
    },
    !!semester,
  );

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

  if (semestersLoading) {
    return (
      <div className='flex items-center justify-center h-[50vh] w-full'>
        <LoaderCircle className='h-8 w-8 animate-spin text-black-500 dark:text-gray-300' />
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Отборы</h1>
        <Button
          onClick={() => {
            setHistoryMode(false);
          }}
        >
          Посмотреть актуальные
        </Button>
      </div>

      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Filter className='h-5 w-5' />
              Фильтры
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label>Семестр</Label>
                <Select
                  value={semester || 'all'}
                  onValueChange={(value) =>
                    setSemester(value === 'all' ? undefined : value)
                  }
                >
                  <SelectTrigger className='w-60'>
                    <SelectValue placeholder='Выберите семестр' />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((sem) => (
                      <SelectItem key={sem.id} value={sem.id}>
                        {sem.description}
                      </SelectItem>
                    ))}
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
            <CardTitle>История отборов</CardTitle>
          </CardHeader>
          <CardContent>
            {!semester ? (
              <div className='text-center p-8 text-muted-foreground'>
                Выберите семестр для просмотра истории отборов
              </div>
            ) : selectionsLoading ? (
              <div className='flex justify-center p-8'>
                <LoaderCircle className='h-6 w-6 animate-spin text-gray-500' />
              </div>
            ) : (
              <div className='rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ФИО</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Компания</TableHead>
                      <TableHead>Должность</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSelections.map((selection: Selection) => (
                      <TableRow key={selection.id}>
                        <TableCell>
                          {getFullName(selection.candidate)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={cn({
                              'text-green-600': approvedSelections.find(
                                (id) => id === selection.id,
                              ),
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredSelections.length === 0 && (
                  <div className='text-center p-8 text-muted-foreground'>
                    История отборов не найдена
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

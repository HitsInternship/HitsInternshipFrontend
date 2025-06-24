import { useEffect, useState } from 'react';

import { TransitionCard } from '../TransitionCard';
import { PotentialPracticeFilters } from '../PotentialPracticeFilters';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { Separator } from '@/shared/ui/separator';
import { useSemesters } from '@/features/SemesterCRUD';
import { useStreams } from '@/features/StreamsCRUD/hooks';
import { usePotentialPractices } from '@/entities/Practice';
import { useGroups } from '@/entities/Groups';
import { useCompaniesList } from '@/entities/Company';
import { usePositions } from '@/entities/Position';

export const PotentialPractices = () => {
  const { data: semesters = [] } = useSemesters(false);
  const { data: streams = [] } = useStreams();
  const { data: groups = [] } = useGroups();
  const { data: companies } = useCompaniesList();
  const { data: positions } = usePositions();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<string | undefined>(
    undefined,
  );
  const [selectedStream, setSelectedStream] = useState<string | undefined>(
    undefined,
  );
  const [hasLoadedData, setHasLoadedData] = useState(false);

  const [filters, setFilters] = useState<{
    groupId: string | undefined;
    oldCompanyId: string | undefined;
    oldPositionId: string | undefined;
  }>({
    groupId: undefined,
    oldCompanyId: undefined,
    oldPositionId: undefined,
  });

  const { data: practices } = usePotentialPractices(
    selectedSemester || null,
    selectedStream || null,
    filters.groupId,
    filters.oldCompanyId,
    filters.oldPositionId,
  );

  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSelectedSemester(undefined);
      setSelectedStream(undefined);
      setHasLoadedData(false);
    }
  };

  const transitionsCount =
    practices &&
    practices.filter((t) => t.newCompanyId && t.newPositionId).length;
  const stayingCount =
    practices && transitionsCount ? practices.length - transitionsCount : 0;

  const selectedSemesterName = semesters.find(
    (s) => s.id === selectedSemester,
  )?.description;
  const selectedStreamName = streams.find(
    (s) => s.id === selectedStream,
  )?.streamNumber;

  useEffect(() => {
    if (practices) {
      setHasLoadedData(true);
    }
  }, [practices]);

  useEffect(() => {
    if (!isOpen) {
      setFilters({
        groupId: undefined,
        oldCompanyId: undefined,
        oldPositionId: undefined,
      });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant='outline' className='bg-white text-black'>
          Просмотр переходов практик
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-4xl max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Потенциальные переходы практик</DialogTitle>
          <DialogDescription>
            {hasLoadedData
              ? `Переходы для ${selectedSemesterName} - ${selectedStreamName}`
              : 'Выберите семестр и поток для просмотра переходов студентов'}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6'>
          {!hasLoadedData ? (
            <div className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='semester-select'>Семестр</Label>
                  <Select
                    value={selectedSemester}
                    onValueChange={setSelectedSemester}
                  >
                    <SelectTrigger id='semester-select'>
                      <SelectValue placeholder='Выберите семестр' />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((semester) => (
                        <SelectItem key={semester.id} value={semester.id}>
                          {semester.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='stream-select'>Поток</Label>
                  <Select
                    value={selectedStream}
                    onValueChange={setSelectedStream}
                  >
                    <SelectTrigger id='stream-select'>
                      <SelectValue placeholder='Выберите поток' />
                    </SelectTrigger>
                    <SelectContent>
                      {streams.map((stream) => (
                        <SelectItem key={stream.id} value={stream.id}>
                          {stream.streamNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className='flex justify-between items-center p-4 bg-muted/50 rounded-lg'>
                <div>
                  <div className='font-medium'>{selectedSemesterName}</div>
                  <div className='text-sm text-muted-foreground'>
                    {selectedStreamName}
                  </div>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setHasLoadedData(false)}
                >
                  Изменить выбор
                </Button>
              </div>

              <PotentialPracticeFilters
                filters={filters}
                onChange={setFilters}
                groups={groups}
                companies={companies}
                positions={positions}
              />

              {practices && practices.length > 0 ? (
                <>
                  <div className='flex gap-4 p-4 bg-muted/50 rounded-lg'>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-blue-600'>
                        {transitionsCount}
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        Переходов
                      </div>
                    </div>
                    <Separator orientation='vertical' className='h-12' />
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-green-600'>
                        {stayingCount}
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        Остаются
                      </div>
                    </div>
                    <Separator orientation='vertical' className='h-12' />
                    <div className='text-center'>
                      <div className='text-2xl font-bold'>
                        {practices && practices.length}
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        Всего студентов
                      </div>
                    </div>
                  </div>
                  <div className='grid gap-4 md:grid-cols-1 lg:grid-cols-2'>
                    {practices &&
                      practices.map((transition) => (
                        <TransitionCard
                          key={transition.studentId}
                          transition={transition}
                        />
                      ))}
                  </div>
                </>
              ) : (
                <div className='text-center py-8'>
                  <div className='text-muted-foreground'>
                    Нет данных о практиках для выбранного семестра и потока
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

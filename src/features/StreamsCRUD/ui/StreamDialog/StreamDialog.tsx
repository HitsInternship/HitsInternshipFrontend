import { useEffect, useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { StreamDialogProps } from './StreamDialog.types';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Button, Input, Label } from '@/shared/ui';
import { useCreateStream, useUpdateStream } from '@/features/StreamsCRUD/hooks';
import { Status } from '@/features/StreamsCRUD/model';
import { useAddSelection } from '@/entities/Selection';
import { useSemesters } from '@/features/SemesterCRUD';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { cn } from '@/shared/lib/utils';
import { Calendar } from '@/shared/ui/calendar';

export const StreamDialog = ({
  isStreamDialogOpen,
  setIsStreamDialogOpen,
  currentStream,
}: StreamDialogProps) => {
  const { data: semesters = [] } = useSemesters(false);
  const { mutateAsync: createStreamMutation } = useCreateStream();
  const { mutateAsync: updateStreamMutation } = useUpdateStream();
  const { mutateAsync: addSelection } = useAddSelection();

  const [streamNumber, setStreamNumber] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [status, setStatus] = useState<Status>('Selection');
  const [course, setCourse] = useState('');

  const [semester, setSemester] = useState('');
  const [selectionDate, setSelectionDate] = useState<Date>();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleSaveStream = () => {
    if (status === 'Selection' && currentStream?.status !== 'Selection') {
      setShowConfirmDialog(true);
      return;
    }

    performSave();
  };

  const performSave = () => {
    if (currentStream) {
      if (!selectionDate && !semester && status === 'Selection') {
        return;
      }

      if (status === 'Selection') {
        addSelection({
          semesterId: semester,
          streamId: currentStream.id,
          deadline: selectionDate!.toISOString().split('T')[0],
        });
      }

      updateStreamMutation({
        id: currentStream.id,
        streamNumber: Number(streamNumber),
        year: Number(year),
        status,
        course: Number(course),
      });
    } else {
      createStreamMutation({
        streamNumber: Number(streamNumber),
        year: Number(year),
        status,
        course: Number(course),
      });
    }

    setIsStreamDialogOpen(false);
  };

  const handleConfirmSave = () => {
    performSave();
  };

  useEffect(() => {
    if (currentStream) {
      setStreamNumber(currentStream.streamNumber.toString());
      setYear(currentStream.year.toString());
      setStatus(currentStream.status);
      setCourse(currentStream.course.toString());
    }
  }, [currentStream]);

  const canChangeStatus = currentStream && currentStream.status !== 'Practice';

  return (
    <>
      <Dialog open={isStreamDialogOpen} onOpenChange={setIsStreamDialogOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>
              {currentStream ? 'Редактировать поток' : 'Добавить поток'}
            </DialogTitle>
            <DialogDescription>
              Заполните информацию о потоке и нажмите сохранить.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='streamNumber' className='text-right'>
                Номер потока
              </Label>
              <Input
                id='streamNumber'
                type='number'
                value={streamNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setStreamNumber(value);
                  }
                }}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='year' className='text-right'>
                Год
              </Label>
              <Input
                id='year'
                type='number'
                value={year}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setYear(value);
                  }
                }}
                className='col-span-3'
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='status' className='text-right'>
                Статус
              </Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as Status)}
                disabled={!canChangeStatus}
              >
                <SelectTrigger className='col-span-3'>
                  <SelectValue placeholder='Выберите статус' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Selection'>Отбор</SelectItem>
                  <SelectItem value='Practice'>Практика</SelectItem>
                  <SelectItem value='None'>Нет</SelectItem>
                </SelectContent>
              </Select>
              {!canChangeStatus && (
                <p className='col-span-4 text-sm text-muted-foreground text-center'>
                  Статус нельзя изменить, так как поток уже находится в статусе
                  "Практика"
                </p>
              )}
            </div>

            {status === 'Selection' && (
              <>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='semester' className='text-right'>
                    Семестр
                  </Label>
                  <Select value={semester} onValueChange={setSemester}>
                    <SelectTrigger className='col-span-3'>
                      <SelectValue placeholder='Выберите семестр' />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters?.map((semester) => (
                        <SelectItem key={semester.id} value={semester.id}>
                          <div className='flex flex-col'>
                            <span className='font-medium'>
                              {semester.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-right'>Дата отбора</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className={cn(
                          'col-span-3 justify-start text-left font-normal',
                          !selectionDate && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {selectionDate ? (
                          format(selectionDate, 'dd.MM.yyyy', { locale: ru })
                        ) : (
                          <span>Выберите дату</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={selectionDate}
                        onSelect={setSelectionDate}
                        initialFocus
                        locale={ru}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            )}

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='course' className='text-right'>
                Номер курса
              </Label>
              <Input
                id='course'
                type='number'
                value={course}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setCourse(value);
                  }
                }}
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' onClick={handleSaveStream}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтверждение изменения статуса</AlertDialogTitle>
            <AlertDialogDescription>
              Вы собираетесь изменить статус потока на "Отбор". Это действие
              необратимо. Вы уверены, что хотите продолжить?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSave}>
              Подтвердить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useEffect, useState } from 'react';

import { CreateSemesterDialogProps } from './CreateSemesterDialog.types';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button, Label } from '@/shared/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Calendar } from '@/shared/ui/calendar';
import { Textarea } from '@/shared/ui/textarea';
import {
  useCreateSemester,
  useUpdateSemester,
} from '@/features/SemesterCRUD/hooks';
import { getLocalDate } from '@/shared/utils/getLocalDate';

export const CreateSemesterDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  currentSemester,
}: CreateSemesterDialogProps) => {
  const { mutateAsync: createSemesterMutation, isPending: isCreating } =
    useCreateSemester();
  const { mutateAsync: updateSemesterMutation, isPending: isUpdating } =
    useUpdateSemester();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState('');

  const handleSaveSemester = async () => {
    if (!startDate || !endDate) return;

    if (currentSemester) {
      console.log(startDate);

      await updateSemesterMutation({
        semesterId: currentSemester.id,
        payload: {
          startDate:
            typeof startDate === 'string' ? startDate : getLocalDate(startDate),
          endDate:
            typeof endDate === 'string' ? endDate : getLocalDate(endDate),
          description,
        },
      });
    } else {
      await createSemesterMutation({
        startDate: getLocalDate(startDate),
        endDate: getLocalDate(endDate),
        description,
      });
    }

    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (currentSemester) {
      setStartDate(currentSemester.startDate);
      setEndDate(currentSemester.endDate);
      setDescription(currentSemester.description);
    }
  }, [currentSemester]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>
            {currentSemester ? 'Редактировать семестр' : 'Добавить семестр'}
          </DialogTitle>
          <DialogDescription>
            Заполните информацию о семестре и нажмите сохранить.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='startDate' className='text-right'>
              Начало
            </Label>
            <div className='col-span-3'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-full justify-start text-left font-normal'
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {startDate ? (
                      format(startDate, 'dd MMMM yyyy', { locale: ru })
                    ) : (
                      <span>Выберите дату</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='endDate' className='text-right'>
              Окончание
            </Label>
            <div className='col-span-3'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-full justify-start text-left font-normal'
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {endDate ? (
                      format(endDate, 'dd MMMM yyyy', { locale: ru })
                    ) : (
                      <span>Выберите дату</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Описание
            </Label>
            <Textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='col-span-3'
              placeholder='Например: Весенний семестр 2025'
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type='submit'
            onClick={handleSaveSemester}
            disabled={isCreating || isUpdating}
          >
            {isCreating || isUpdating ? (
              <Loader2 className='animate-spin mr-2 h-4 w-4' />
            ) : null}
            {isCreating || isUpdating ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

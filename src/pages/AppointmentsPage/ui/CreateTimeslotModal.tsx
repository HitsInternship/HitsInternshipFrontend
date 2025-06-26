import { useState } from 'react';
import { Plus, Calendar, Clock } from 'lucide-react';
import { format, startOfDay, endOfDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

import { timePeriods } from './data.ts';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
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
import { Calendar as CalendarComponent } from '@/shared/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { cn } from '@/shared/lib/utils';
import { useCalendar, useCreateTimeslot } from '@/entities/Appointment/hooks';

export const CreateTimeslotModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedPeriod, setSelectedPeriod] = useState<string>();
  const queryClient = useQueryClient();

  const formatDateKey = (date: Date) => {
    return format(date, 'dd.MM.yyyy');
  };

  const { data: calendarData, isLoading: isCalendarLoading } = useCalendar(
    {
      startDate: selectedDate
        ? new Date(
            startOfDay(selectedDate).getTime() + 7 * 60 * 60 * 1000,
          ).toISOString()
        : new Date(
            startOfDay(new Date()).getTime() + 7 * 60 * 60 * 1000,
          ).toISOString(),
      endDate: selectedDate
        ? new Date(
            endOfDay(selectedDate).getTime() + 7 * 60 * 60 * 1000,
          ).toISOString()
        : new Date(
            endOfDay(new Date()).getTime() + 7 * 60 * 60 * 1000,
          ).toISOString(),
    },
    isOpen && !!selectedDate,
  );

  // Filter available periods based on calendar data
  const getAvailablePeriods = () => {
    if (!selectedDate) {
      return timePeriods;
    }

    if (!calendarData) {
      return timePeriods; // Show all periods while loading
    }

    const dateKey = formatDateKey(selectedDate);
    const dayData = calendarData[dateKey];

    if (!dayData) {
      return timePeriods; // All periods are available if no data for this date
    }

    // Filter out periods that already have slots (either appointments or free slots)
    return timePeriods.filter((period) => {
      const slotData = dayData[period.number.toString()];
      // If slotData exists (either string slotId or appointment object), don't show this period
      return slotData === undefined || slotData === null;
    });
  };

  const availablePeriods = getAvailablePeriods();

  const { mutate, isPending } = useCreateTimeslot({
    onSuccess: () => {
      toast.success('Слот успешно создан');
      queryClient.invalidateQueries({ queryKey: ['calendar'] });
      setIsOpen(false);
      setSelectedDate(undefined);
      setSelectedPeriod(undefined);
    },
    onError: () => {
      toast.error('Произошла ошибка');
    },
  });

  const handleCreate = () => {
    if (!selectedDate || !selectedPeriod) {
      toast('Выберите дату и пару');
      return;
    }

    const time = timePeriods.find(
      (period) => period.number.toString() === selectedPeriod,
    );

    if (!time) {
      return;
    }

    const [hours, minutes] = time.time.split(':').map(Number);
    const combinedDate = new Date(selectedDate);
    combinedDate.setHours(hours + 7, minutes, 0, 0);

    mutate({
      params: {
        date: combinedDate.toISOString(),
        periodNumber: Number(selectedPeriod),
      },
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedDate(undefined);
    setSelectedPeriod(undefined);
  };

  // Reset selected period if it's no longer available after date change
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    // Clear selected period when date changes to avoid invalid selections
    setSelectedPeriod(undefined);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset state when modal closes
      setSelectedDate(undefined);
      setSelectedPeriod(undefined);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className='flex items-center gap-2'>
          <Plus className='h-4 w-4' />
          Создать таймслот
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Создание нового таймслота</DialogTitle>
        </DialogHeader>

        <div className='space-y-6 py-4'>
          <div className='space-y-2'>
            <Label>Дата</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !selectedDate && 'text-muted-foreground',
                  )}
                >
                  <Calendar className='mr-2 h-4 w-4' />
                  {selectedDate
                    ? format(selectedDate, 'PPP', { locale: ru })
                    : 'Выберите дату'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <CalendarComponent
                  mode='single'
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className='space-y-2'>
            <Label>Пара</Label>
            <Select
              value={selectedPeriod}
              onValueChange={setSelectedPeriod}
              disabled={!selectedDate || isCalendarLoading}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    !selectedDate
                      ? 'Сначала выберите дату'
                      : isCalendarLoading
                        ? 'Загрузка...'
                        : availablePeriods.length === 0
                          ? 'Нет доступных пар'
                          : 'Выберите пару'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {availablePeriods.length === 0 &&
                selectedDate &&
                !isCalendarLoading ? (
                  <div className='p-2 text-sm text-gray-500 text-center'>
                    Все пары на эту дату уже заняты
                  </div>
                ) : (
                  availablePeriods.map((period) => (
                    <SelectItem
                      key={period.number}
                      value={period.number.toString()}
                    >
                      <div className='flex items-center gap-2'>
                        <Clock className='h-4 w-4' />
                        {period.label}
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {selectedDate &&
              availablePeriods.length === 0 &&
              !isCalendarLoading && (
                <p className='text-sm text-gray-500'>
                  На выбранную дату все временные слоты уже созданы
                </p>
              )}
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={handleCancel} disabled={isPending}>
            Отмена
          </Button>
          <Button
            onClick={handleCreate}
            disabled={
              isPending ||
              !selectedDate ||
              !selectedPeriod ||
              availablePeriods.length === 0
            }
          >
            {isPending ? 'Создание...' : 'Создать'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import { useState } from 'react';
import { Plus, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { timePeriods } from './mockAppointments';

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

interface CreateTimeslotModalProps {
  onTimeslotCreate?: (date: Date, periodNumber: number) => void;
}

export const CreateTimeslotModal = ({
  onTimeslotCreate,
}: CreateTimeslotModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedPeriod, setSelectedPeriod] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!selectedDate || !selectedPeriod) {
      alert('Выберите дату и пару');
      return;
    }

    setIsLoading(true);

    try {
      // Здесь будет реальный API запрос
      // const response = await fetch('/api/companies/timeslots/add', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     date: selectedDate.toISOString(),
      //     periodNumber: parseInt(selectedPeriod)
      //   })
      // })

      // Симуляция запроса
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert('Таймслот успешно создан');

      if (onTimeslotCreate) {
        onTimeslotCreate(selectedDate, Number.parseInt(selectedPeriod));
      }

      setIsOpen(false);
      setSelectedDate(undefined);
      setSelectedPeriod(undefined);
    } catch (error) {
      alert('Ошибка при создании таймслота');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedDate(undefined);
    setSelectedPeriod(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className='space-y-2'>
            <Label>Пара</Label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue placeholder='Выберите пару' />
              </SelectTrigger>
              <SelectContent>
                {timePeriods.map((period) => (
                  <SelectItem
                    key={period.number}
                    value={period.number.toString()}
                  >
                    <div className='flex items-center gap-2'>
                      <Clock className='h-4 w-4' />
                      {period.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={handleCancel} disabled={isLoading}>
            Отмена
          </Button>
          <Button onClick={handleCreate} disabled={isLoading}>
            {isLoading ? 'Создание...' : 'Создать'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

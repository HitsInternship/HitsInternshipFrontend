import { useEffect, useState } from 'react';
import { Building } from 'lucide-react';
import toast from 'react-hot-toast';
import { observer } from 'mobx-react-lite';
import { useQueryClient } from '@tanstack/react-query';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/shared/ui';
import { timePeriods } from '@/pages/AppointmentsPage/ui/data.ts';
import { useCreateAppointment } from '@/entities/Appointment/hooks';
import { useCuratorInfo } from '@/entities/Curators/hooks/useCuratorInfo.ts';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeslotId: string;
  periodNumber: number;
  date: string;
}

export const BookAppointmentModal = observer(
  ({
    isOpen,
    onClose,
    timeslotId,
    periodNumber,
    date,
  }: BookAppointmentModalProps) => {
    const { data, isLoading } = useCuratorInfo(true);
    const queryClient = useQueryClient();

    useEffect(() => {
      if (data) {
        setSelectedCompany(data.companyId);
      }
    }, [data]);

    const [selectedCompany, setSelectedCompany] = useState<string>();
    const [description, setDescription] = useState('');
    const { mutate, isPending } = useCreateAppointment({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['calendar'] });
        toast.success('Встреча успешно создана!');
        handleClose();
      },
      onError: () => {
        toast.error('Произошла ошибка');
      },
    });

    const selectedPeriod = timePeriods.find((p) => p.number === periodNumber);

    const handleBook = async () => {
      if (!selectedCompany || !description.trim()) {
        toast('Выберите компанию и добавьте описание');
        return;
      }

      mutate({
        params: {
          companyId: selectedCompany,
          timeslotId: timeslotId,
          description: description,
        },
      });
    };

    const handleClose = () => {
      setSelectedCompany(undefined);
      setDescription('');
      onClose();
    };

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Бронирование встречи</DialogTitle>
          </DialogHeader>

          <div className='space-y-4 py-4'>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>Дата: {date}</p>
                  <p className='text-sm text-gray-600'>
                    {selectedPeriod?.label}
                  </p>
                </div>
              </div>
            </div>

            <div className='space-y-2'>
              <Label>Компания</Label>
              <Select
                value={selectedCompany}
                onValueChange={setSelectedCompany}
              >
                <SelectTrigger disabled={true}>
                  <SelectValue
                    placeholder={
                      isLoading
                        ? 'Компании загружаются...'
                        : 'Выберите компанию'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {data && (
                    <SelectItem key={data.id} value={data.companyId}>
                      <div className='flex items-center gap-2'>
                        <Building className='h-4 w-4' />
                        {data.companyName}
                      </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Описание встречи</Label>
              <Textarea
                placeholder='Опишите цель встречи, тип собеседования или другие детали...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className='resize-none'
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant='outline'
              onClick={handleClose}
              disabled={isPending}
            >
              Отмена
            </Button>
            <Button onClick={handleBook} disabled={isPending}>
              {isPending ? 'Бронирование...' : 'Забронировать'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

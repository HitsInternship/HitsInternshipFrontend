import { useState } from 'react';
import { Building } from 'lucide-react';

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
import {
  mockCompanies,
  timePeriods,
} from '@/pages/AppointmentsPage/ui/mockAppointments.ts';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  periodNumber: number;
  onBookingCreate?: (companyId: string, description: string) => void;
}

export const BookAppointmentModal = ({
  isOpen,
  onClose,
  date,
  periodNumber,
  onBookingCreate,
}: BookAppointmentModalProps) => {
  const [selectedCompany, setSelectedCompany] = useState<string>();
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const selectedPeriod = timePeriods.find((p) => p.number === periodNumber);

  const handleBook = async () => {
    if (!selectedCompany || !description.trim()) {
      alert('Выберите компанию и добавьте описание');
      return;
    }

    setIsLoading(true);

    try {
      // Здесь будет реальный API запрос для записи на встречу
      // const response = await fetch('/api/companies/appointments/book', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     date,
      //     periodNumber,
      //     companyId: selectedCompany,
      //     description
      //   })
      // })

      // Симуляция запроса
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert('Встреча успешно забронирована');

      if (onBookingCreate) {
        onBookingCreate(selectedCompany, description);
      }

      handleClose();
    } catch (error) {
      alert('Ошибка при бронировании встречи');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
                <p className='text-sm text-gray-600'>{selectedPeriod?.label}</p>
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Компания</Label>
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger>
                <SelectValue placeholder='Выберите компанию' />
              </SelectTrigger>
              <SelectContent>
                {mockCompanies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    <div className='flex items-center gap-2'>
                      <Building className='h-4 w-4' />
                      {company.name}
                    </div>
                  </SelectItem>
                ))}
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
          <Button variant='outline' onClick={handleClose} disabled={isLoading}>
            Отмена
          </Button>
          <Button onClick={handleBook} disabled={isLoading}>
            {isLoading ? 'Бронирование...' : 'Забронировать'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

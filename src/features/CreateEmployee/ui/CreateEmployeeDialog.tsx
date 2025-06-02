import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from '@/shared/ui';

interface CreateEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Тип для данных сотрудника
interface EmployeeFormData {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
}

export const CreateEmployeeDialog = ({
  open,
  onOpenChange,
}: CreateEmployeeDialogProps) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
  });

  const handleInputChange = (field: keyof EmployeeFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      lastName: '',
      firstName: '',
      middleName: '',
      email: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.lastName || !formData.firstName || !formData.email) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    console.log('Данные сотрудника:', formData);

    resetForm();
    onOpenChange(false);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Создание нового сотрудника</DialogTitle>
          <DialogDescription>
            Заполните информацию о новом сотруднике деканата
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            {/* ФИО */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='lastName'>Фамилия *</Label>
                <Input
                  id='lastName'
                  placeholder='Введите фамилию'
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange('lastName', e.target.value)
                  }
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='firstName'>Имя *</Label>
                <Input
                  id='firstName'
                  placeholder='Введите имя'
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange('firstName', e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='middleName'>Отчество</Label>
              <Input
                id='middleName'
                placeholder='Введите отчество'
                value={formData.middleName}
                onChange={(e) =>
                  handleInputChange('middleName', e.target.value)
                }
              />
            </div>

            {/* Электронная почта */}
            <div className='space-y-2'>
              <Label htmlFor='email'>Электронная почта *</Label>
              <Input
                id='email'
                type='email'
                placeholder='employee@university.ru'
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => handleDialogClose(false)}
            >
              Отмена
            </Button>
            <Button type='submit'>Создать сотрудника</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

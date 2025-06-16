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
import { IUser } from '@/entities/User';
import { useCreateDeanMember } from '@/entities/User/hooks';

interface CreateEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateEmployeeDialog = ({
  open,
  onOpenChange,
}: CreateEmployeeDialogProps) => {
  const [formData, setFormData] = useState<IUser>({
    name: '',
    surname: '',
    email: '',
  });

  const { mutate } = useCreateDeanMember();

  const handleInputChange = (field: keyof IUser, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      surname: '',
      email: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.surname || !formData.email) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    mutate(formData);

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
            <div className='space-y-2'>
              <Label htmlFor='surname'>Фамилия *</Label>
              <Input
                id='surname'
                placeholder='Введите фамилию'
                value={formData.surname}
                onChange={(e) => handleInputChange('surname', e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='name'>Имя *</Label>
              <Input
                id='name'
                placeholder='Введите имя'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
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

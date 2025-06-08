import { useState } from 'react';

import { useGroups } from '@/entities/Groups';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';

interface CreateStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface StudentFormData {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  phone: string;
  gender: string;
  status: string;
  group: string;
}

export const CreateStudentDialog = ({
  open,
  onOpenChange,
}: CreateStudentDialogProps) => {
  const { data: groups = [] } = useGroups();

  const [formData, setFormData] = useState<StudentFormData>({
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    phone: '',
    gender: '',
    status: '',
    group: '',
  });

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Функция для сброса формы
  const resetForm = () => {
    setFormData({
      lastName: '',
      firstName: '',
      middleName: '',
      email: '',
      phone: '',
      gender: '',
      status: '',
      group: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Данные студента:', formData);

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
          <DialogTitle>Создание нового студента</DialogTitle>
          <DialogDescription>
            Заполните информацию о новом студенте
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
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

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Электронная почта *</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='student@example.com'
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='phone'>Телефон</Label>
                <Input
                  id='phone'
                  type='tel'
                  placeholder='+7 (___) ___-__-__'
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='gender'>Пол</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                >
                  <SelectTrigger id='gender'>
                    <SelectValue placeholder='Выберите пол' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='male'>Мужской</SelectItem>
                    <SelectItem value='female'>Женский</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='status'>Статус</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger id='status'>
                    <SelectValue placeholder='Выберите статус' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='InProcess'>Обучается</SelectItem>
                    <SelectItem value='OnAcademicLeave'>
                      Академический отпуск
                    </SelectItem>
                    <SelectItem value='Graduated'>Выпускник</SelectItem>
                    <SelectItem value='Expelled'>Отчислен</SelectItem>
                    <SelectItem value='Transfered'>Переведен</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='group'>Группа</Label>
              <Select
                value={formData.group}
                onValueChange={(value) => handleInputChange('group', value)}
              >
                <SelectTrigger id='group'>
                  <SelectValue placeholder='Выберите группу' />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((item) => (
                    <SelectItem value={item.id}>{item.groupNumber}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <Button type='submit'>Создать студента</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

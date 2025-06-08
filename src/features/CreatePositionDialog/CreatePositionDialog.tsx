import { useState } from 'react';

import { CreatePositionDialogProps } from './CreatePositionDialog.interfaces';

import {
  Button,
  Textarea,
  Label,
  Input,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';
import { CreatePositionFormData, useCreatePosition } from '@/entities/Position';

export const CreatePositionDialog = ({
  open,
  onOpenChange,
}: CreatePositionDialogProps) => {
  const { mutate } = useCreatePosition();
  const [formData, setFormData] = useState<CreatePositionFormData>({
    name: '',
    description: '',
  });

  const handleInputChange = (
    field: keyof CreatePositionFormData,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    console.log('Данные позиции:', formData);

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
          <DialogTitle>Создание новой позиции</DialogTitle>
          <DialogDescription>
            Заполните информацию о новой позиции. Нажмите Создать, когда
            закончите.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Название позиции *</Label>
              <Input
                id='name'
                placeholder='Например: Frontend разработчик'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>Описание *</Label>
              <Textarea
                id='description'
                placeholder='Опишите обязанности и требования к позиции...'
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                rows={4}
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
            <Button type='submit'>Создать позицию</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

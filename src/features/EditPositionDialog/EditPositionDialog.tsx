import { useState, useEffect } from 'react';

import { EditPositionDialogProps } from './EditPositionDialog.interfaces';

import { CreatePositionFormData } from '@/entities/Position';
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
import { useEditPosition } from '@/entities/Position';

export const EditPositionDialog = ({
  open,
  onOpenChange,
  position,
}: EditPositionDialogProps) => {
  const { mutate } = useEditPosition();
  const [formData, setFormData] = useState<CreatePositionFormData>({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (position && open) {
      setFormData({
        name: position.name,
        description: position.description,
      });
    }
  }, [position, open]);

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

    const updateData = {
      id: position.id,
      ...formData,
    };

    console.log('Обновление позиции:', updateData);

    mutate({ payload: formData, id: position.id });

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
          <DialogTitle>Редактирование позиции</DialogTitle>
          <DialogDescription>
            Внесите изменения в информацию о позиции. Нажмите Сохранить, когда
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
            <Button type='submit'>Сохранить изменения</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

import { useState } from 'react';

import { CreateVacancyDialogProps } from './CreateVacancyDialog.interfaces';

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
  Textarea,
} from '@/shared/ui';
import { useCompaniesList } from '@/entities/Company';
import { usePositions } from '@/entities/Position';
import { CreateVacancyFormData, useCreateVacancy } from '@/entities/Vacancy';

export const CreateVacancyDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: CreateVacancyDialogProps) => {
  const { data: companies } = useCompaniesList();
  const { data: positions } = usePositions();

  const { mutate } = useCreateVacancy();

  const [formData, setFormData] = useState<CreateVacancyFormData>({
    title: '',
    description: '',
    positionId: '',
    companyId: '',
  });

  const handleInputChange = (
    field: keyof CreateVacancyFormData,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      positionId: '',
      companyId: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.positionId ||
      !formData.companyId
    ) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    mutate(formData, { onSuccess: () => onSuccess() });

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
          <DialogTitle>Создание новой вакансии</DialogTitle>
          <DialogDescription>
            Заполните информацию о новой вакансии. Нажмите Создать, когда
            закончите.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Название вакансии *</Label>
              <Input
                id='name'
                placeholder='Например: Junior Frontend разработчик'
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='position'>Позиция *</Label>
                <Select
                  value={formData.positionId}
                  onValueChange={(value) =>
                    handleInputChange('positionId', value)
                  }
                >
                  <SelectTrigger id='position'>
                    <SelectValue placeholder='Выберите позицию' />
                  </SelectTrigger>
                  <SelectContent>
                    {positions?.map((position) => (
                      <SelectItem key={position.id} value={position.id}>
                        {position.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='company'>Компания *</Label>
                <Select
                  value={formData.companyId}
                  onValueChange={(value) =>
                    handleInputChange('companyId', value)
                  }
                >
                  <SelectTrigger id='company'>
                    <SelectValue placeholder='Выберите компанию' />
                  </SelectTrigger>
                  <SelectContent>
                    {companies?.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>Описание вакансии *</Label>
              <Textarea
                id='description'
                placeholder='Опишите требования, обязанности и условия работы...'
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
            <Button type='submit'>Создать вакансию</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

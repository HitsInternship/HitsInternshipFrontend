import { useState, useEffect } from 'react';

import {
  CreateVacancyFormData,
  IVacancyInfo,
  useEditVacancy,
} from '@/entities/Vacancy';
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

interface EditVacancyDialogProps {
  open: boolean;
  vacancy: IVacancyInfo;
  onOpenChange: (open: boolean) => void;
}

export const EditVacancyDialog = ({
  open,
  vacancy,
  onOpenChange,
}: EditVacancyDialogProps) => {
  const [formData, setFormData] = useState<CreateVacancyFormData>({
    title: '',
    description: '',
    positionId: '',
    companyId: '',
  });

  const { data: companies } = useCompaniesList();
  const { data: positions } = usePositions();
  const { mutate } = useEditVacancy(vacancy.id);

  useEffect(() => {
    if (open) {
      setFormData({
        title: vacancy.position.name,
        description: vacancy.description,
        positionId:
          positions?.find((p) => p.name === vacancy.position.name)?.id || '',
        companyId:
          companies?.find((c) => c.name === vacancy.company.name)?.id || '',
      });
    }
  }, [vacancy, open, positions, companies]);

  console.log({ ...formData });

  const handleInputChange = (
    field: keyof CreateVacancyFormData,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.positionId ||
      !formData.companyId
    ) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    mutate({ payload: formData, id: vacancy.id });

    onOpenChange(false);
  };

  const handleDialogClose = (open: boolean) => {
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Редактирование вакансии</DialogTitle>
          <DialogDescription>
            Внесите изменения в информацию о вакансии. Нажмите Сохранить, когда
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
                <Label htmlFor='positionId'>Позиция *</Label>
                <Select
                  value={formData.positionId}
                  onValueChange={(value) =>
                    handleInputChange('positionId', value)
                  }
                >
                  <SelectTrigger id='positionId'>
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
                <Label htmlFor='companyId'>Компания *</Label>
                <Select
                  value={formData.companyId}
                  onValueChange={(value) => {
                    console.log('Выбранное значение companyId:', value);
                    handleInputChange('companyId', value);
                  }}
                >
                  <SelectTrigger id='companyId'>
                    <SelectValue placeholder='Выберите компанию' />
                  </SelectTrigger>
                  <SelectContent>
                    {companies?.map((company) => (
                      <SelectItem key={company.id} value={String(company.id)}>
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
            <Button type='submit'>Сохранить изменения</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

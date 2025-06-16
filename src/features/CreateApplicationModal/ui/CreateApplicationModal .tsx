import { useState } from 'react';
import { Upload, FileText } from 'lucide-react';

import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Textarea,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';
import { useCompaniesList } from '@/entities/Company';
import { usePositions } from '@/entities/Position';

// Интерфейсы для данных

interface CreateApplicationData {
  description: string;
  companyId: string;
  positionId: string;
  document: File | null;
  date: string;
}

interface CreateApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateApplicationModal = ({
  isOpen,
  onClose,
}: CreateApplicationModalProps) => {
  const [formData, setFormData] = useState<CreateApplicationData>({
    description: '',
    companyId: '',
    positionId: '',
    document: null,
    date: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { data: companies } = useCompaniesList();
  const { data: positions } = usePositions();

  const handleInputChange = (
    field: keyof CreateApplicationData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Очищаем ошибку для этого поля
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleInputChange('document', file);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно для заполнения';
    }

    if (!formData.companyId) {
      newErrors.companyId = 'Выберите компанию';
    }

    if (!formData.positionId) {
      newErrors.positionId = 'Выберите позицию';
    }

    if (!formData.document) {
      newErrors.document = 'Прикрепите документ заявки';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Добавляем текущую дату
      //   const dataToSubmit = {
      //     ...formData,
      //     date: new Date().toISOString(),
      //   };

      // Здесь будет реальный API запрос
      // const response = await fetch('/api/applications', {
      //   method: 'POST',
      //   body: formData // или FormData для файла
      // })

      // Имитация отправки
      await new Promise((resolve) => setTimeout(resolve, 1500));

      //   if (onSubmit) {
      //       onSubmit(dataToSubmit);
      //   }

      // Сбрасываем форму и закрываем модальное окно
      setFormData({
        description: '',
        companyId: '',
        positionId: '',
        document: null,
        date: '',
      });
      onClose();
    } catch (error) {
      console.error('Ошибка при отправке заявки:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        description: '',
        companyId: '',
        positionId: '',
        document: null,
        date: '',
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-hidden flex flex-col'>
        <DialogHeader className='flex-shrink-0'>
          <DialogTitle className='flex items-center justify-between'>
            <span>Создать заявку на смену места практики</span>
          </DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto px-1 pr-4'>
          <div className='space-y-6 py-4'>
            {/* Описание заявки */}
            <div className='space-y-2'>
              <Label htmlFor='description' className='text-sm font-medium'>
                Описание заявки <span className='text-red-500'>*</span>
              </Label>
              <Textarea
                id='description'
                placeholder='Опишите причину смены места практики, ваши ожидания от новой компании...'
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                className={`min-h-[120px] resize-none ${errors.description ? 'border-red-500' : ''}`}
                disabled={isSubmitting}
              />
              {errors.description && (
                <p className='text-sm text-red-500'>{errors.description}</p>
              )}
            </div>

            {/* Выбор компании */}
            <div className='space-y-2'>
              <Label htmlFor='company' className='text-sm font-medium'>
                Компания <span className='text-red-500'>*</span>
              </Label>
              <Select
                value={formData.companyId}
                onValueChange={(value) => handleInputChange('companyId', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger
                  className={errors.companyId ? 'border-red-500' : ''}
                >
                  <SelectValue placeholder='Выберите компанию' />
                </SelectTrigger>
                <SelectContent>
                  {companies?.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      <div className='flex flex-col'>
                        <span className='font-medium'>{company.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.companyId && (
                <p className='text-sm text-red-500'>{errors.companyId}</p>
              )}
            </div>

            {/* Выбор позиции */}
            <div className='space-y-2'>
              <Label htmlFor='position' className='text-sm font-medium'>
                Позиция <span className='text-red-500'>*</span>
              </Label>
              <Select
                value={formData.positionId}
                onValueChange={(value) =>
                  handleInputChange('positionId', value)
                }
              >
                <SelectTrigger
                  className={errors.positionId ? 'border-red-500' : ''}
                >
                  <SelectValue placeholder={'Выберите позицию'} />
                </SelectTrigger>
                <SelectContent>
                  {positions?.map((position) => (
                    <SelectItem key={position.id} value={position.id}>
                      <div className='flex flex-col'>
                        <span className='font-medium'>{position.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.positionId && (
                <p className='text-sm text-red-500'>{errors.positionId}</p>
              )}
            </div>

            {/* Загрузка файла */}
            <div className='space-y-2'>
              <Label htmlFor='document' className='text-sm font-medium'>
                Документ заявки <span className='text-red-500'>*</span>
              </Label>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 '>
                  <Input
                    id='document'
                    type='file'
                    accept='.pdf,.doc,.docx,.txt'
                    onChange={handleFileChange}
                    className={`w-full file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80 ${
                      errors.document ? 'border-red-500' : ''
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {formData.document && (
                  <div className='flex items-center gap-2 p-2 bg-muted rounded text-sm break-all'>
                    <FileText className='h-4 w-4 flex-shrink-0' />
                    <span className='flex-1 min-w-0'>
                      {formData.document.name}
                    </span>
                    <span className='text-muted-foreground flex-shrink-0'>
                      ({(formData.document.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                )}
                {errors.document && (
                  <p className='text-sm text-red-500'>{errors.document}</p>
                )}
              </div>
            </div>

            {/* Кнопки */}
            <div className='flex items-center justify-end gap-3 pt-4 border-t'>
              <Button
                variant='outline'
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Отмена
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className='flex items-center gap-2'
              >
                {isSubmitting ? (
                  <>
                    <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Upload className='h-4 w-4' />
                    Отправить заявку
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

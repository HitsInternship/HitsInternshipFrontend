import { useState, useRef, ChangeEvent } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
} from '@/shared/ui';
import { uploadFile } from '@/entities/Excel/api/upload.ts';

interface UploadStudentsModalProps {
  onUploadSuccess?: () => void;
}

export const UploadStudentsModal = ({
  onUploadSuccess,
}: UploadStudentsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPending, setIsPending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel', // .xls
        'text/csv', // .csv
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error(
          'Поддерживаются только файлы Excel (.xlsx, .xls) и CSV (.csv)',
        );
        return;
      }

      // Проверяем размер файла (максимум 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error('Размер файла не должен превышать 10MB');
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Выберите файл для загрузки');
      return;
    }
    setIsPending(true);

    try {
      await uploadFile({ params: { file: selectedFile } });
      queryClient.invalidateQueries({ queryKey: ['students'] });
      onUploadSuccess?.();
      handleClose();
      toast.success('Файл успешно загружен');
      setIsPending(false);
    } catch (error) {
      console.error(error);
      toast.error('Произошла ошибка!');
      setIsPending(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='flex items-center gap-2'>
          <Upload className='h-4 w-4' />
          Загрузить студентов из файла
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Загрузка студентов из файла</DialogTitle>
        </DialogHeader>

        <div className='space-y-6 py-4'>
          <div className='space-y-2'>
            <Label>Файл со списком студентов</Label>
            <div className='space-y-4'>
              {/* Скрытый input для файла */}
              <input
                ref={fileInputRef}
                type='file'
                accept='.xlsx,.xls,.csv'
                onChange={handleFileSelect}
                className='hidden'
              />

              {/* Кнопка для выбора файла */}
              {!selectedFile && (
                <Button
                  type='button'
                  variant='outline'
                  className='w-full h-24 border-2 border-dashed border-gray-300 hover:border-gray-400 flex flex-col items-center justify-center gap-2'
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isPending}
                >
                  <Upload className='h-6 w-6 text-gray-400' />
                  <span className='text-sm text-gray-600'>
                    Нажмите для выбора файла
                  </span>
                  <span className='text-xs text-gray-400'>
                    Excel (.xlsx, .xls) или CSV (.csv)
                  </span>
                </Button>
              )}

              {/* Отображение выбранного файла */}
              {selectedFile && (
                <div className='border rounded-lg p-4 bg-gray-50'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <FileText className='h-8 w-8 text-blue-500' />
                      <div>
                        <p className='text-sm font-medium text-gray-900'>
                          {selectedFile.name}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={handleRemoveFile}
                      disabled={isPending}
                      className='text-gray-400 hover:text-gray-600'
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              )}

              {/* Кнопка для смены файла */}
              {selectedFile && (
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isPending}
                  className='w-full'
                >
                  Выбрать другой файл
                </Button>
              )}
            </div>
          </div>

          {/* Информация о формате файла */}
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <h4 className='text-sm font-medium text-blue-900 mb-2'>
              Требования к файлу:
            </h4>
            <ul className='text-xs text-blue-800 space-y-1'>
              <li>• Поддерживаемые форматы: Excel (.xlsx, .xls)</li>
              <li>• Максимальный размер: 10MB</li>
              <li>• Первая строка должна содержать заголовки столбцов</li>
              <li>
                • Обязательные столбцы: Surname, Name, MidleName, Email, Group
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={handleClose} disabled={isPending}>
            Отмена
          </Button>
          <Button onClick={handleUpload} disabled={isPending || !selectedFile}>
            {isPending ? 'Загрузка...' : 'Загрузить'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

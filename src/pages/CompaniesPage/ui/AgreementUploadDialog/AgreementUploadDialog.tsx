import { Upload, X, File as FileIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui';
import { uploadFile } from '@/entities/Agreement/api/addCompanyAgreement.ts';

interface FileUploadModalProps {
  maxFiles?: number;
  companyId: string;
}

export const AgreementUploadDialog = ({
  maxFiles = 10,
  companyId,
}: FileUploadModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const formatFileSize = (bytes: number) => {
    return Math.round(bytes / 1024) + ' KB';
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const filesToAdd = files.slice(0, maxFiles - selectedFiles.length);
    setSelectedFiles((prev) => [...prev, ...filesToAdd]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadAll = async () => {
    try {
      setIsPending(true);
      const uploadPromises = selectedFiles.map((file) =>
        uploadFile({
          params: { file, description: file.name, companyId: companyId },
        }),
      );

      const results = await Promise.all(uploadPromises);
      setIsPending(false);
      queryClient.invalidateQueries({ queryKey: ['agreements', companyId] });
      console.log('Все файлы загружены:', results);
      toast.success('Все файлы загружены успешно');
    } catch (error) {
      setIsPending(false);
      console.error('Ошибка при загрузке файлов:', error);
      toast.error('Ошибка при загрузке файлов');
    }
  };

  const handleConfirm = async () => {
    if (selectedFiles.length > 0) {
      await uploadAll();
    }
    setIsOpen(false);
    setSelectedFiles([]);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedFiles([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='w-40' variant='outline'>
          <Upload className='h-4 w-4 mr-2' />
          Загрузить
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Загрузка файлов</DialogTitle>
          <DialogDescription>
            Выберите файлы для загрузки (максимум {maxFiles} файлов)
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <Button
            variant='outline'
            onClick={() => fileInputRef.current?.click()}
            className='w-full'
          >
            <Upload className='h-4 w-4 mr-2' />
            Выбрать файлы
          </Button>

          <input
            ref={fileInputRef}
            type='file'
            multiple
            accept='*'
            onChange={handleFileSelect}
            className='hidden'
          />

          {selectedFiles.length > 0 && (
            <div className='space-y-2'>
              <h3 className='text-sm font-medium'>
                Выбранные файлы ({selectedFiles.length}):
              </h3>
              <div className='space-y-1 max-h-40 overflow-y-auto'>
                {selectedFiles.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className='flex items-center justify-between p-2 bg-gray-50 rounded text-sm'
                  >
                    <div className='flex items-center gap-2 flex-1 min-w-0'>
                      <FileIcon className='h-3 w-3 text-gray-500 flex-shrink-0' />
                      <span className='truncate'>{file.name}</span>
                      <span className='text-gray-500 text-xs'>
                        ({formatFileSize(file.size)})
                      </span>
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => removeFile(index)}
                      className='h-6 w-6 p-0 flex-shrink-0'
                    >
                      <X className='h-3 w-3' />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={handleCancel}>
            Отмена
          </Button>
          <Button onClick={handleConfirm} disabled={selectedFiles.length === 0}>
            {isPending
              ? 'Отправка...'
              : `Подтвердить (${selectedFiles.length})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

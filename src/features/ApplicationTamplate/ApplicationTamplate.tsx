import {
  Upload,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  File,
} from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/shared/ui';
import { Alert, AlertDescription } from '@/shared/ui/alert';
import {
  useApplicationTamplate,
  useSendApplicationTamplate,
} from '@/entities/Application';
import { useStores } from '@/shared/contexts';
import { UserRole } from '@/entities/User/models';

export const ApplicationTamplate = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: fileUrl } = useApplicationTamplate();
  const { mutate } = useSendApplicationTamplate();

  const {
    userStore: { roles },
  } = useStores();

  const isDeanMember = roles.includes(UserRole.DeanMember);

  const handleFileSelect = (selectedFile: File) => {
    setError('');
    setSuccess('');

    uploadFile(selectedFile);
  };

  const uploadFile = (selectedFile: File) => {
    setIsUploading(true);

    mutate(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleReplace = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = () => {
    return <File className='h-4 w-4 text-gray-500' />;
  };

  if (!fileUrl && !isDeanMember) {
    return null;
  }

  return (
    <div className='space-y-2'>
      {/* Основная полоска */}
      <div
        className={`flex items-center gap-2 p-3 border rounded-lg transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        } ${!fileUrl ? 'border-dashed' : 'bg-gray-50'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {!fileUrl ? (
          // Состояние: файл не загружен
          <>
            <Upload className='h-4 w-4 text-gray-400 flex-shrink-0' />
            <span className='text-sm text-gray-600 flex-1'>Шаблон заявки</span>
            <Button
              onClick={handleReplace}
              disabled={isUploading}
              size='sm'
              variant='outline'
              className='h-8'
            >
              {isUploading ? (
                <RefreshCw className='h-3 w-3 animate-spin' />
              ) : (
                <>
                  <Upload className='h-3 w-3 mr-1' />
                  Загрузить
                </>
              )}
            </Button>
          </>
        ) : (
          // Состояние: файл загружен
          <>
            {getFileIcon()}
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-medium truncate'>
                  Шаблон заявки
                </span>
              </div>
            </div>
            <div className='flex gap-1 flex-shrink-0'>
              <Button size='sm' variant='ghost' className='h-8 w-8 p-0' asChild>
                <a href={fileUrl} target='_blank' rel='noopener noreferrer'>
                  <Download className='h-3 w-3' />
                </a>
              </Button>
              <Button
                onClick={handleReplace}
                size='sm'
                variant='ghost'
                className='h-8 w-8 p-0'
              >
                <RefreshCw className='h-3 w-3' />
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Скрытый input для выбора файлов */}
      <input
        ref={fileInputRef}
        type='file'
        className='hidden'
        accept='.pdf,.doc,.docx,.xls,.xlsx'
        onChange={handleFileInputChange}
      />

      {/* Компактные сообщения */}
      {error && (
        <Alert variant='destructive' className='py-2'>
          <AlertCircle className='h-3 w-3' />
          <AlertDescription className='text-xs'>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className='py-2'>
          <CheckCircle className='h-3 w-3' />
          <AlertDescription className='text-xs'>{success}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

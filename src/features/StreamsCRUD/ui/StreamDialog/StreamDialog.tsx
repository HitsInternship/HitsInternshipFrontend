import { useEffect, useState } from 'react';

import { StreamDialogProps } from './StreamDialog.types';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Button, Input, Label } from '@/shared/ui';
import { useCreateStream, useUpdateStream } from '@/features/StreamsCRUD/hooks';
import { Status } from '@/features/StreamsCRUD/model';

export const StreamDialog = ({
  isStreamDialogOpen,
  setIsStreamDialogOpen,
  currentStream,
}: StreamDialogProps) => {
  const { mutateAsync: createStreamMutation } = useCreateStream();
  const { mutateAsync: updateStreamMutation } = useUpdateStream();
  const [streamNumber, setStreamNumber] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [status, setStatus] = useState<Status>('Selection');
  const [course, setCourse] = useState(0);

  const handleSaveStream = () => {
    if (currentStream) {
      updateStreamMutation({
        id: currentStream.id,
        streamNumber,
        year,
        status,
        course,
      });
    } else {
      createStreamMutation({
        streamNumber,
        year,
        status,
        course,
      });
    }

    setIsStreamDialogOpen(false);
  };

  useEffect(() => {
    if (currentStream) {
      setStreamNumber(currentStream.streamNumber);
      setYear(currentStream.year);
      setStatus(currentStream.status);
      setCourse(currentStream.course);
    }
  }, [currentStream]);

  return (
    <Dialog open={isStreamDialogOpen} onOpenChange={setIsStreamDialogOpen}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>
            {currentStream ? 'Редактировать поток' : 'Добавить поток'}
          </DialogTitle>
          <DialogDescription>
            Заполните информацию о потоке и нажмите сохранить.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='streamNumber' className='text-right'>
              Номер потока
            </Label>
            <Input
              id='streamNumber'
              type='number'
              value={streamNumber}
              onChange={(e) =>
                setStreamNumber(Number.parseInt(e.target.value) || 0)
              }
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='year' className='text-right'>
              Год
            </Label>
            <Input
              id='year'
              type='number'
              value={year}
              onChange={(e) =>
                setYear(
                  Number.parseInt(e.target.value) || new Date().getFullYear(),
                )
              }
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='status' className='text-right'>
              Статус
            </Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as Status)}
            >
              <SelectTrigger className='col-span-3'>
                <SelectValue placeholder='Выберите статус' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Selection'>Отбор</SelectItem>
                <SelectItem value='Practice'>Практика</SelectItem>
                <SelectItem value='None'>Нет</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='course' className='text-right'>
              Номер курса
            </Label>
            <Input
              id='course'
              type='number'
              value={course}
              onChange={(e) => setCourse(Number.parseInt(e.target.value) || 0)}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSaveStream}>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import { Send } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { MassCommentType } from '../model';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Textarea,
} from '@/shared/ui';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Selection, SelectionStatus } from '@/entities/Selection';
import { useCreateSelectionComment } from '@/features/MassSelectionComment/hooks/useCreateSelectionComment.ts';

export const MassSelectionComment = () => {
  const [massCommentType, setMassCommentType] = useState<MassCommentType>(
    MassCommentType.All,
  );
  const massCommentTextarea = useRef<HTMLTextAreaElement | null>(null);

  const { mutate, isPending } = useCreateSelectionComment({
    onSuccess: () => {
      toast.success('Комментарий успешно добавлен');
    },
    onError: () => {
      toast.error('Проиошла ошибка');
    },
  });

  const handleBulkSend = () => {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Массовые действия</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div>
            <Label>Отправить сообщение</Label>
            <RadioGroup
              value={massCommentType}
              onValueChange={(value) =>
                setMassCommentType(value as MassCommentType)
              }
              className='flex flex-wrap gap-4 mt-2'
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value={MassCommentType.All} id='all' />
                <Label htmlFor='all'>Всем</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value={MassCommentType.Active} id='active' />
                <Label htmlFor='active'>В процессе</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value={MassCommentType.Offer} id='offer' />
                <Label htmlFor='offer'>С оффером</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value={MassCommentType.Inactive}
                  id='inactive'
                />
                <Label htmlFor='inactive'>Бездельники</Label>
              </div>
            </RadioGroup>
          </div>
          <div className='flex gap-2'>
            <Textarea
              ref={massCommentTextarea}
              placeholder='Введите сообщение...'
              className='flex-1'
            />
            <Button onClick={handleBulkSend}>
              <Send className='h-4 w-4 mr-2' />
              Отправить
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

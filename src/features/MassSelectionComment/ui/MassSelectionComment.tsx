import { Send } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { useCreateSelectionComment } from '../hooks';

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
import { SelectionStatus } from '@/entities/Selection';

export const MassSelectionComment = () => {
  const [massCommentType, setMassCommentType] = useState<
    SelectionStatus | 'null'
  >('null');
  const massCommentTextarea = useRef<HTMLTextAreaElement | null>(null);

  const { mutate, isPending } = useCreateSelectionComment({
    onSuccess: () => {
      toast.success('Комментарий успешно добавлен');
    },
    onError: () => {
      toast.error('Проиошла ошибка');
    },
  });

  const handleBulkSend = () => {
    if (massCommentTextarea.current?.value) {
      mutate({
        params: {
          selectionStatus: massCommentType === 'null' ? null : massCommentType,
          content: massCommentTextarea.current?.value,
          selectedUsers: [],
        },
      });
    }
  };

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
              onValueChange={(value) => {
                if (value === 'null') setMassCommentType('null');
                else setMassCommentType(value as SelectionStatus);
              }}
              className='flex flex-wrap gap-4 mt-2'
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='null' id='all' />
                <Label htmlFor='all'>Всем</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value={SelectionStatus.InProgress}
                  id='active'
                />
                <Label htmlFor='active'>В процессе</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value={SelectionStatus.OfferAccepted}
                  id='offer'
                />
                <Label htmlFor='offer'>С оффером</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value={SelectionStatus.Inactive}
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
            <Button onClick={handleBulkSend} disabled={isPending}>
              <Send className='h-4 w-4 mr-2' />
              {isPending ? 'Отправка...' : 'Отправить'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

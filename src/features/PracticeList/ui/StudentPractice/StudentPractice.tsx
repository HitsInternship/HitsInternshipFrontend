import {
  Check,
  Download,
  Edit,
  FileText,
  MessageSquare,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';

import { Badge, Button, Input } from '@/shared/ui';
import { TableCell, TableRow } from '@/shared/ui/table';
import { Practice, useChangePracticeMark } from '@/entities/Practice';

export const StudentPractice = ({
  practice,
  setCommentDialog,
}: {
  practice: Practice;
  setCommentDialog: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: string | null;
      type: 'diary' | 'characteristics';
      comment: string;
    }>
  >;
}) => {
  const { mutate: changeMark } = useChangePracticeMark();
  /*const { data: diary } = useStudentDiaryById(practice.practiceDiaryId);
  const { data: characteristic } = useStudentCharacteristicById(
    practice.characteristicsId,
  );*/

  const [editingGrade, setEditingGrade] = useState<{
    practiceId: string | null;
    value: string;
  }>({
    practiceId: null,
    value: '5',
  });

  const handleDownloadDocument = (
    documentId: string,
    type: 'diary' | 'characteristics',
  ) => {
    console.log(`Скачивание ${type}:`, documentId);
  };

  const handleAddComment = (type: 'diary' | 'characteristics') => {
    setCommentDialog({
      isOpen: true,
      id:
        type === 'diary'
          ? practice.practiceDiaryId
          : practice.characteristicsId,
      type,
      comment: '',
      //comments: type === 'diary' ? diary!.comment : characteristic!.comment,
    });
  };

  const cancelEditingGrade = () => {
    setEditingGrade({
      practiceId: null,
      value: '',
    });
  };

  const startEditingGrade = (
    practiceId: string,
    currentMark: number | null,
  ) => {
    setEditingGrade({
      practiceId,
      value: currentMark?.toString() || '5',
    });
  };

  const saveGrade = async (practiceId: string) => {
    const newMark = editingGrade.value
      ? Number.parseInt(editingGrade.value)
      : null;

    if (newMark !== null && (newMark < 2 || newMark > 5)) {
      toast.error('Оценка должна быть от 2 до 5');
      return;
    }

    changeMark({ practiceId, mark: Number(newMark) });

    setEditingGrade({
      practiceId: null,
      value: '',
    });
  };

  return (
    <TableRow key={practice.id}>
      <TableCell className='font-medium'>{practice.studentFullName}</TableCell>
      <TableCell>
        <div className='flex items-center gap-2'>
          {editingGrade.practiceId === practice.id ? (
            <div className='flex items-center gap-2'>
              <Input
                type='number'
                min='2'
                max='5'
                value={Number(editingGrade.value)}
                onChange={(e) =>
                  setEditingGrade({
                    ...editingGrade,
                    value: e.target.value,
                  })
                }
                className='w-16 h-8'
              />
              <Button
                size='sm'
                variant='ghost'
                onClick={() => saveGrade(practice.id)}
                className='h-8 w-8 p-0'
              >
                <Check className='w-4 h-4 text-green-600' />
              </Button>
              <Button
                size='sm'
                variant='ghost'
                onClick={cancelEditingGrade}
                className='h-8 w-8 p-0'
              >
                <X className='w-4 h-4 text-red-600' />
              </Button>
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              {practice.mark ? (
                <Badge variant={practice.mark >= 4 ? 'default' : 'secondary'}>
                  {practice.mark}
                </Badge>
              ) : (
                <Badge variant='outline'>Не оценено</Badge>
              )}
              <Button
                size='sm'
                variant='ghost'
                onClick={() => startEditingGrade(practice.id, practice.mark)}
                className='h-8 w-8 p-0'
              >
                <Edit className='w-4 h-4' />
              </Button>
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className='flex items-center gap-2'>
          {practice.practiceDiaryId ? (
            <Button
              variant='outline'
              size='sm'
              onClick={() =>
                handleDownloadDocument(practice.practiceDiaryId!, 'diary')
              }
            >
              <FileText className='w-4 h-4 mr-1' />
              <Download className='w-3 h-3' />
            </Button>
          ) : (
            <Badge variant='outline'>Не загружен</Badge>
          )}
          <Button
            variant='ghost'
            size='sm'
            onClick={() => handleAddComment('diary')}
          >
            <MessageSquare className='w-4 h-4' />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        <div className='flex items-center gap-2'>
          {practice.characteristicsId ? (
            <Button
              variant='outline'
              size='sm'
              onClick={() =>
                handleDownloadDocument(
                  practice.characteristicsId!,
                  'characteristics',
                )
              }
            >
              <FileText className='w-4 h-4 mr-1' />
              <Download className='w-3 h-3' />
            </Button>
          ) : (
            <Badge variant='outline'>Не загружен</Badge>
          )}
          <Button
            variant='ghost'
            size='sm'
            onClick={() => handleAddComment('characteristics')}
          >
            <MessageSquare className='w-4 h-4' />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

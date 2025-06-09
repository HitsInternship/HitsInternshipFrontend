import { Download, FileText, MessageSquare } from 'lucide-react';
import { useState } from 'react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { CommentDialog } from '@/features/CommentDialog';

export const PracticeList = () => {
  const [commentDialog, setCommentDialog] = useState({
    isOpen: false,
    studentId: '',
    type: '' as 'diary' | 'characteristic',
    comment: '',
  });

  interface Student {
    id: string;
    fullName: string;
    stream: string; // Добавляем поток
    group: string;
    company: string; // Добавляем компанию
    grade?: number;
    diaryFile?: string;
    diaryComment?: string;
    characteristicFile?: string;
    characteristicComment?: string;
    employerGrade?: number; // Добавляем оценку от работодателя
    semester: string;
  }

  const students: Student[] = [
    {
      id: '1',
      fullName: 'Иванов Иван Иванович',
      stream: 'Информационные системы',
      group: 'ИС-21-1',
      company: 'ООО Технологии',
      grade: 5,
      diaryFile: 'diary_ivanov.pdf',
      diaryComment: 'Отличная работа, все задания выполнены качественно',
      characteristicFile: 'char_ivanov.pdf',
      characteristicComment: 'Показал высокий уровень профессионализма',
      employerGrade: 5,
      semester: '2024-1',
    },
    {
      id: '2',
      fullName: 'Петрова Анна Сергеевна',
      stream: 'Программная инженерия',
      group: 'ИС-21-2',
      company: 'ИТ Решения',
      grade: 4,
      diaryFile: 'diary_petrova.pdf',
      characteristicFile: 'char_petrova.pdf',
      employerGrade: 4,
      semester: '2024-1',
    },
    {
      id: '3',
      fullName: 'Сидоров Петр Александрович',
      stream: 'Информационные системы',
      group: 'ИС-21-1',
      company: 'Софт Компани',
      diaryFile: 'diary_sidorov.pdf',
      semester: '2024-2',
    },
  ];

  const openCommentDialog = (
    studentId: string,
    type: 'diary' | 'characteristic',
  ) => {
    const student = students.find((s) => s.id === studentId);
    const currentComment =
      type === 'diary' ? student?.diaryComment : student?.characteristicComment;

    setCommentDialog({
      isOpen: true,
      studentId,
      type,
      comment: currentComment || '',
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Список студентов</CardTitle>
          <CardDescription>
            Показано {students.length} из {students.length} студентов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ФИО</TableHead>
                  <TableHead>Оценка за практику</TableHead>
                  <TableHead>Дневник практики</TableHead>
                  <TableHead>Характеристика</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className='font-medium'>
                      {student.fullName}
                    </TableCell>
                    <TableCell>
                      {student.grade ? (
                        <Badge
                          variant={student.grade >= 4 ? 'default' : 'secondary'}
                        >
                          {student.grade}
                        </Badge>
                      ) : (
                        <Badge variant='outline'>Не оценено</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        {student.diaryFile ? (
                          <Button variant='outline' size='sm'>
                            <FileText className='w-4 h-4 mr-1' />
                            <Download className='w-3 h-3' />
                          </Button>
                        ) : (
                          <Badge variant='outline'>Не загружен</Badge>
                        )}
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => openCommentDialog(student.id, 'diary')}
                        >
                          <MessageSquare className='w-4 h-4' />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                          {student.characteristicFile ? (
                            <Button variant='outline' size='sm'>
                              <FileText className='w-4 h-4 mr-1' />
                              <Download className='w-3 h-3' />
                            </Button>
                          ) : (
                            <Badge variant='outline'>Не загружен</Badge>
                          )}
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() =>
                              openCommentDialog(student.id, 'characteristic')
                            }
                          >
                            <MessageSquare className='w-4 h-4' />
                          </Button>
                        </div>
                        {student.employerGrade && (
                          <div className='text-sm text-muted-foreground'>
                            Оценка работодателя:
                            <Badge variant='secondary' className='ml-1'>
                              {student.employerGrade}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <CommentDialog
        commentDialog={commentDialog}
        setCommentDialog={setCommentDialog}
      />
    </>
  );
};

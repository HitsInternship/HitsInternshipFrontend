import {
  ArrowLeft,
  Check,
  Download,
  Edit,
  FileText,
  MessageSquare,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { PracticeFilters } from '../PracticeFilters';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
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
import { useChangePracticeMark, usePractices } from '@/entities/Practice';
import { ROUTER_PATHS } from '@/shared/consts';
import { useGroups } from '@/entities/Groups';
import { useCompaniesList } from '@/entities/Company';

export const PracticeList = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: groups = [] } = useGroups();
  const { data: companies } = useCompaniesList();
  const { mutate: changeMark } = useChangePracticeMark();

  const [filters, setFilters] = useState<{
    groupId: string | undefined;
    companyId: string | undefined;
    hasMark: boolean | undefined;
  }>({
    groupId: undefined,
    companyId: undefined,
    hasMark: undefined,
  });

  const [editingGrade, setEditingGrade] = useState<{
    practiceId: string | null;
    value: string;
  }>({
    practiceId: null,
    value: '5',
  });

  const { data: practices } = usePractices(
    id!,
    filters.groupId,
    filters.companyId,
    filters.hasMark,
  );

  const [commentDialog, setCommentDialog] = useState({
    isOpen: false,
    studentId: '',
    type: '' as 'diary' | 'characteristic',
    comment: '',
  });

  const openCommentDialog = (
    studentId: string,
    type: 'diary' | 'characteristic',
  ) => {
    //const student = students.find((s) => s.id === studentId);
    /*const currentComment =
      type === 'diary' ? student?.diaryComment : student?.characteristicComment;*/

    setCommentDialog({
      isOpen: true,
      studentId,
      type,
      //comment: currentComment || '',
      comment: '',
    });
  };

  const handleDownloadDocument = (
    documentId: string,
    type: 'diary' | 'characteristics',
  ) => {
    console.log(`Скачивание ${type}:`, documentId);
  };

  const handleAddComment = (
    studentId: string,
    type: 'diary' | 'characteristics',
  ) => {
    console.log(`Добавление комментария к ${type} для студента:`, studentId);
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

  const onBack = () => {
    navigate(ROUTER_PATHS.PRACTICES);
  };

  return (
    <>
      <div className='flex items-center gap-4'>
        <Button variant='outline' onClick={onBack}>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Назад к практикам
        </Button>
        <div>
          <h1 className='text-3xl font-bold'>Студенты практики</h1>
        </div>
      </div>

      <PracticeFilters
        filters={filters}
        onChange={setFilters}
        groups={groups}
        companies={companies}
      />

      <Card>
        <CardHeader>
          <CardTitle>Список студентов</CardTitle>
          <CardDescription>
            Показано {practices && practices.length} практик студентов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ФИО</TableHead>
                  <TableHead>Оценка</TableHead>
                  <TableHead>Дневник практики</TableHead>
                  <TableHead>Характеристика</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {practices &&
                  practices.map((practice) => (
                    <TableRow key={practice.id}>
                      <TableCell className='font-medium'>
                        {practice.studentFullName}
                      </TableCell>
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
                                <Badge
                                  variant={
                                    practice.mark >= 4 ? 'default' : 'secondary'
                                  }
                                >
                                  {practice.mark}
                                </Badge>
                              ) : (
                                <Badge variant='outline'>Не оценено</Badge>
                              )}
                              <Button
                                size='sm'
                                variant='ghost'
                                onClick={() =>
                                  startEditingGrade(practice.id, practice.mark)
                                }
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
                                handleDownloadDocument(
                                  practice.practiceDiaryId!,
                                  'diary',
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
                            onClick={() =>
                              handleAddComment(practice.studentId, 'diary')
                            }
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
                            onClick={() =>
                              handleAddComment(
                                practice.studentId,
                                'characteristics',
                              )
                            }
                          >
                            <MessageSquare className='w-4 h-4' />
                          </Button>
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

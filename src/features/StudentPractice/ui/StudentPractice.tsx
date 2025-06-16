import {
  BookOpen,
  Download,
  FileText,
  MessageSquare,
  Plus,
  Star,
  Upload,
} from 'lucide-react';
import { useState } from 'react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
import { Separator } from '@/shared/ui/separator';
import { CreateApplicationModal } from '@/features/CreateApplicationModal/ui/CreateApplicationModal ';

export const StudentPractice = () => {
  interface Practice {
    id: string;
    semester: string;
    type: string;
    organization: string;
    period: string;
    grade?: number;
    diaryStatus: 'not_uploaded' | 'uploaded' | 'reviewed';
    characteristicStatus: 'not_uploaded' | 'uploaded' | 'reviewed';
    comments: string[];
  }

  const practices: Practice[] = [
    {
      id: '1',
      semester: '6 семестр',
      type: 'Учебная практика',
      organization: 'ООО "ТехноСофт"',
      period: '15.06.2024 - 28.06.2024',
      grade: 5,
      diaryStatus: 'reviewed',
      characteristicStatus: 'uploaded',
      comments: ['Отличная работа!', 'Все задания выполнены в срок'],
    },
    {
      id: '2',
      semester: '7 семестр',
      type: 'Производственная практика',
      organization: 'АО "ИнноТех"',
      period: '01.09.2024 - 30.09.2024',
      diaryStatus: 'uploaded',
      characteristicStatus: 'not_uploaded',
      comments: ['Требуется доработка отчета'],
    },
    {
      id: '3',
      semester: '8 семестр',
      type: 'Преддипломная практика',
      organization: 'Не назначена',
      period: '15.02.2025 - 15.03.2025',
      diaryStatus: 'not_uploaded',
      characteristicStatus: 'not_uploaded',
      comments: [],
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'not_uploaded':
        return <Badge variant='secondary'>Не загружено</Badge>;
      case 'uploaded':
        return <Badge variant='outline'>Загружено</Badge>;
      case 'reviewed':
        return <Badge variant='default'>Проверено</Badge>;
      default:
        return <Badge variant='secondary'>Не загружено</Badge>;
    }
  };

  const [selectedComments, setSelectedComments] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleFileUpload = (type: 'diary' | 'characteristic') => {
    // Имитация загрузки файла
    console.log(`Загрузка ${type === 'diary' ? 'дневника' : 'характеристики'}`);
  };

  const handleDownloadTemplate = (type: 'diary' | 'characteristic') => {
    // Имитация скачивания шаблона
    console.log(
      `Скачивание шаблона ${type === 'diary' ? 'дневника' : 'характеристики'}`,
    );
  };
  return (
    <>
      <div className='mb-4'>
        <h1 className='text-3xl font-bold mb-2'>Мои практики</h1>
        <p className='text-muted-foreground'>
          Управление документами и отслеживание прогресса по практикам
        </p>
      </div>
      <Button
        onClick={() => setShowCreateModal(true)}
        className='flex items-center gap-2 mb-4'
      >
        <Plus className='h-4 w-4' />
        Заявка на смену
      </Button>

      <CreateApplicationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      <Accordion type='single' collapsible className='space-y-4'>
        {practices.map((practice) => (
          <AccordionItem
            key={practice.id}
            value={practice.id}
            className='border rounded-lg'
          >
            <AccordionTrigger className='px-6 py-4 hover:no-underline'>
              <div className='flex items-center justify-between w-full mr-4'>
                <div className='text-left'>
                  <h3 className='font-semibold text-lg'>{practice.semester}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {practice.type}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-6 pb-6'>
              <div className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                  <div>
                    <span className='font-medium'>Организация:</span>{' '}
                    {practice.organization}
                  </div>
                  <div>
                    <span className='font-medium'>Период:</span>{' '}
                    {practice.period}
                  </div>
                </div>

                <Separator />

                <div className='grid gap-6 md:grid-cols-3'>
                  {/* Дневник практики */}
                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle className='flex items-center gap-2 text-lg'>
                        <BookOpen className='w-5 h-5' />
                        Дневник практики
                      </CardTitle>
                      <CardDescription>
                        Ведение и загрузка дневника практики
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm'>Статус:</span>
                        {getStatusBadge(practice.diaryStatus)}
                      </div>

                      <div className='space-y-2'>
                        <Button
                          size='sm'
                          className='w-full'
                          onClick={() => handleFileUpload('diary')}
                        >
                          <Upload className='w-4 h-4 mr-2' />
                          Загрузить дневник
                        </Button>

                        <Button
                          size='sm'
                          variant='outline'
                          className='w-full'
                          onClick={() => handleDownloadTemplate('diary')}
                        >
                          <Download className='w-4 h-4 mr-2' />
                          Скачать шаблон
                        </Button>

                        {practice.comments.length > 0 && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size='sm'
                                variant='ghost'
                                className='w-full'
                                onClick={() =>
                                  setSelectedComments(practice.comments)
                                }
                              >
                                <MessageSquare className='w-4 h-4 mr-2' />
                                Комментарии ({practice.comments.length})
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Комментарии к дневнику
                                </DialogTitle>
                                <DialogDescription>
                                  Отзывы и замечания преподавателя
                                </DialogDescription>
                              </DialogHeader>
                              <div className='space-y-3'>
                                {selectedComments.map((comment, index) => (
                                  <div
                                    key={index}
                                    className='p-3 bg-muted rounded-lg'
                                  >
                                    <p className='text-sm'>{comment}</p>
                                  </div>
                                ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Характеристика */}
                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle className='flex items-center gap-2 text-lg'>
                        <FileText className='w-5 h-5' />
                        Характеристика
                      </CardTitle>
                      <CardDescription>
                        Характеристика от руководителя практики
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm'>Статус:</span>
                        {getStatusBadge(practice.characteristicStatus)}
                      </div>

                      <div className='space-y-2'>
                        <Button
                          size='sm'
                          className='w-full'
                          onClick={() => handleFileUpload('characteristic')}
                        >
                          <Upload className='w-4 h-4 mr-2' />
                          Загрузить характеристику
                        </Button>

                        <Button
                          size='sm'
                          variant='outline'
                          className='w-full'
                          onClick={() =>
                            handleDownloadTemplate('characteristic')
                          }
                        >
                          <Download className='w-4 h-4 mr-2' />
                          Скачать шаблон
                        </Button>

                        {practice.comments.length > 0 && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size='sm'
                                variant='ghost'
                                className='w-full'
                                onClick={() =>
                                  setSelectedComments(practice.comments)
                                }
                              >
                                <MessageSquare className='w-4 h-4 mr-2' />
                                Комментарии ({practice.comments.length})
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Комментарии к характеристике
                                </DialogTitle>
                                <DialogDescription>
                                  Отзывы и замечания преподавателя
                                </DialogDescription>
                              </DialogHeader>
                              <div className='space-y-3'>
                                {selectedComments.map((comment, index) => (
                                  <div
                                    key={index}
                                    className='p-3 bg-muted rounded-lg'
                                  >
                                    <p className='text-sm'>{comment}</p>
                                  </div>
                                ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Оценка */}
                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle className='flex items-center gap-2 text-lg'>
                        <Star className='w-5 h-5' />
                        Оценка
                      </CardTitle>
                      <CardDescription>
                        Итоговая оценка за практику
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='text-center'>
                        {practice.grade ? (
                          <div className='space-y-2'>
                            <div className='text-3xl font-bold text-primary'>
                              {practice.grade}
                            </div>
                            <div className='text-sm text-muted-foreground'>
                              {practice.grade === 5
                                ? 'Отлично'
                                : practice.grade === 4
                                  ? 'Хорошо'
                                  : practice.grade === 3
                                    ? 'Удовлетворительно'
                                    : 'Неудовлетворительно'}
                            </div>
                          </div>
                        ) : (
                          <div className='space-y-2'>
                            <div className='text-2xl font-medium text-muted-foreground'>
                              —
                            </div>
                            <div className='text-sm text-muted-foreground'>
                              Не оценено
                            </div>
                          </div>
                        )}
                      </div>

                      {practice.grade && (
                        <div className='pt-2'>
                          <div className='text-xs text-muted-foreground text-center'>
                            Оценка выставлена
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

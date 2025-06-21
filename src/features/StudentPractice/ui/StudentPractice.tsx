import { BookOpen, Download, FileText, Star, Upload } from 'lucide-react';

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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
import { Separator } from '@/shared/ui/separator';
import { useStudentPractice } from '@/entities/Practice';
import { useUploadCharacteristics } from '@/entities/Characteristics';
import { useUploadPracticeDiary } from '@/entities/Diary';

export const StudentPractice = () => {
  const { data: practices } = useStudentPractice();
  const { mutate: uploadChar } = useUploadCharacteristics();
  const { mutate: uploadDiary } = useUploadPracticeDiary();

  const getPracticeTypeInRussian = (type: string) => {
    switch (type.toLowerCase()) {
      case 'technological':
        return 'Технологическая практика';
      case 'educational':
        return 'Учебная практика';
      case 'production':
        return 'Производственная практика';
      case 'prediploma':
        return 'Преддипломная практика';
      default:
        return type;
    }
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start.getFullYear() === 1 || end.getFullYear() === 1) {
      return 'Даты не определены';
    }

    return `${start.toLocaleDateString('ru-RU')} - ${end.toLocaleDateString('ru-RU')}`;
  };

  const getDocumentStatus = (documentId: string | null) => {
    if (documentId === null) {
      return 'not_uploaded';
    }
    return 'uploaded';
  };

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

  const handleFileUpload = (
    practiceId: string,
    type: 'diary' | 'characteristic',
  ) => {
    console.log(
      `Загрузка ${type === 'diary' ? 'дневника' : 'характеристики'} для практики ${practiceId}`,
    );

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (type === 'diary') {
          uploadDiary({ idPractice: practiceId, formPhoto: file });
        } else {
          uploadChar({ idPractice: practiceId, formPhoto: file });
        }
      }
    };
    input.click();
  };

  const handleDownloadTemplate = (
    patternDocumentId: string,
    type: 'diary' | 'characteristic',
  ) => {
    // Здесь будет логика скачивания шаблона по ID
    console.log(
      `Скачивание шаблона ${type === 'diary' ? 'дневника' : 'характеристики'} с ID: ${patternDocumentId}`,
    );
  };

  const getGradeText = (mark: number | null) => {
    if (mark === null) return 'Не оценено';
    switch (mark) {
      case 5:
        return 'Отлично';
      case 4:
        return 'Хорошо';
      case 3:
        return 'Удовлетворительно';
      case 2:
        return 'Неудовлетворительно';
      default:
        return 'Не оценено';
    }
  };

  return (
    <>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Мои практики</h1>
        <p className='text-muted-foreground'>
          Управление документами и отслеживание прогресса по практикам
        </p>
      </div>

      <Accordion type='single' collapsible className='space-y-4'>
        {practices &&
          practices.map((practiceData) => {
            const diaryStatus = getDocumentStatus(
              practiceData.practice.practiceDiaryId,
            );
            const characteristicStatus = getDocumentStatus(
              practiceData.practice.characteristicsId,
            );

            return (
              <AccordionItem
                key={practiceData.practice.id}
                value={practiceData.practice.id}
                className='border rounded-lg'
              >
                <AccordionTrigger className='px-6 py-4 hover:no-underline'>
                  <div className='flex items-center justify-between w-full mr-4'>
                    <div className='text-left'>
                      <h3 className='font-semibold text-lg'>
                        {getPracticeTypeInRussian(practiceData.practiceType)}
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        {formatDateRange(
                          practiceData.semesterStartDate,
                          practiceData.semesterEndDate,
                        )}
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      {practiceData.practice.mark && (
                        <Badge variant='default'>
                          Оценка: {practiceData.practice.mark}
                        </Badge>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='px-6 pb-6'>
                  <div className='space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                      <div>
                        <span className='font-medium'>Тип практики:</span>{' '}
                        {getPracticeTypeInRussian(practiceData.practiceType)}
                      </div>
                      <div>
                        <span className='font-medium'>Период:</span>{' '}
                        {formatDateRange(
                          practiceData.semesterStartDate,
                          practiceData.semesterEndDate,
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className='grid gap-6 md:grid-cols-3'>
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
                            {getStatusBadge(diaryStatus)}
                          </div>

                          <div className='space-y-2'>
                            {practiceData.practice.practiceDiaryId === null ? (
                              <Button
                                size='sm'
                                className='w-full'
                                onClick={() =>
                                  handleFileUpload(
                                    practiceData.practice.id,
                                    'diary',
                                  )
                                }
                              >
                                <Upload className='w-4 h-4 mr-2' />
                                Загрузить дневник
                              </Button>
                            ) : (
                              <Button
                                size='sm'
                                variant='outline'
                                className='w-full'
                                disabled
                              >
                                <FileText className='w-4 h-4 mr-2' />
                                Дневник загружен
                              </Button>
                            )}

                            <Button
                              size='sm'
                              variant='outline'
                              className='w-full'
                              onClick={() =>
                                handleDownloadTemplate(
                                  practiceData.diaryPatternDocumentId,
                                  'diary',
                                )
                              }
                            >
                              <Download className='w-4 h-4 mr-2' />
                              Скачать шаблон
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

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
                            {getStatusBadge(characteristicStatus)}
                          </div>

                          <div className='space-y-2'>
                            {practiceData.practice.characteristicsId ===
                            null ? (
                              <Button
                                size='sm'
                                className='w-full'
                                onClick={() =>
                                  handleFileUpload(
                                    practiceData.practice.id,
                                    'characteristic',
                                  )
                                }
                              >
                                <Upload className='w-4 h-4 mr-2' />
                                Загрузить характеристику
                              </Button>
                            ) : (
                              <Button
                                size='sm'
                                variant='outline'
                                className='w-full'
                                disabled
                              >
                                <FileText className='w-4 h-4 mr-2' />
                                Характеристика загружена
                              </Button>
                            )}

                            <Button
                              size='sm'
                              variant='outline'
                              className='w-full'
                              onClick={() =>
                                handleDownloadTemplate(
                                  practiceData.characteristicsPatternDocumentId,
                                  'characteristic',
                                )
                              }
                            >
                              <Download className='w-4 h-4 mr-2' />
                              Скачать шаблон
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

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
                            {practiceData.practice.mark ? (
                              <div className='space-y-2'>
                                <div className='text-3xl font-bold text-primary'>
                                  {practiceData.practice.mark}
                                </div>
                                <div className='text-sm text-muted-foreground'>
                                  {getGradeText(practiceData.practice.mark)}
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

                          {practiceData.practice.mark && (
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
            );
          })}
      </Accordion>
    </>
  );
};

import { useState } from 'react';
import { Calendar, Download, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { PotentialPractices } from '../PotentialPractices';

import { useGlobalPractices } from '@/entities/Practice';
import { CreatePracticeDialog } from '@/features/CreatePracticeDialog';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PageLayout,
} from '@/shared/ui';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
import { ROUTER_PATHS } from '@/shared/consts';
import { DocumentType } from '@/entities/Document';
import { getDocumentById } from '@/entities/Document/api';

export const GlobalPractices = () => {
  const navigate = useNavigate();
  const { data: globalPractices } = useGlobalPractices();

  const getPracticeTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      Technological: 'Технологическая',
      Production: 'Производственная',
      Research: 'Исследовательская',
      Educational: 'Учебная',
    };
    return labels[type] || type;
  };

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleDownloadTemplate = async (id: string, type: DocumentType) => {
    await getDocumentById({
      params: { documentId: id },
      documentType: type,
    });
  };

  const handleOpenPractice = (practiceId: string) => {
    navigate(ROUTER_PATHS.PRACTICE(practiceId));
  };

  return (
    <PageLayout
      title='Глобальные практики'
      subTitle='Управление практиками по семестрам'
    >
      <div className='flex gap-3 items-center mb-3'>
        <CreatePracticeDialog
          open={isCreateDialogOpen}
          setIsCreateDialogOpen={setIsCreateDialogOpen}
        />

        <PotentialPractices />

        <Button
          variant='outline'
          onClick={() => navigate(ROUTER_PATHS.CHANGE_PRACTICE)}
        >
          Заявки на смену практики
        </Button>
      </div>
      <div className='space-y-4'>
        {globalPractices &&
          globalPractices.map((semester) => (
            <Card key={semester.semesterId}>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Calendar className='w-5 h-5' />
                  Семестр {semester.semesterStartDate} -{' '}
                  {semester.semesterEndDate}
                </CardTitle>
                <CardDescription>
                  Практики в данном семестре: {semester.globalPractices.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type='single' collapsible className='w-full'>
                  {semester.globalPractices.map((practice) => (
                    <AccordionItem key={practice.id} value={practice.id}>
                      <AccordionTrigger className='hover:no-underline'>
                        <div className='flex items-center gap-4 text-left'>
                          <div className='flex items-center gap-2'>
                            <Users className='w-4 h-4' />
                            <span className='font-medium'>
                              Поток {practice.streamNumber}
                            </span>
                          </div>
                          <Badge variant='secondary'>
                            {getPracticeTypeLabel(practice.practiceType)}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className='space-y-4 pt-4'>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                              <h4 className='font-medium'>
                                Шаблоны документов
                              </h4>
                              <div className='space-y-2'>
                                <Button
                                  variant='outline'
                                  size='sm'
                                  onClick={() =>
                                    handleDownloadTemplate(
                                      practice.diaryPatternDocumentId,
                                      DocumentType.PracticeDiary,
                                    )
                                  }
                                  className='w-full justify-start'
                                >
                                  <Download className='w-4 h-4 mr-2' />
                                  Скачать шаблон дневника
                                </Button>
                                <Button
                                  variant='outline'
                                  size='sm'
                                  onClick={() =>
                                    handleDownloadTemplate(
                                      practice.characteristicsPatternDocumentId,
                                      DocumentType.StudentPracticeCharacteristic,
                                    )
                                  }
                                  className='w-full justify-start'
                                >
                                  <Download className='w-4 h-4 mr-2' />
                                  Скачать шаблон характеристики
                                </Button>
                              </div>
                            </div>
                            <div className='space-y-2'>
                              <h4 className='font-medium'>Действия</h4>
                              <Button
                                onClick={() => handleOpenPractice(practice.id)}
                                className='w-full'
                              >
                                <Users className='w-4 h-4 mr-2' />
                                Перейти к студентам
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
      </div>
    </PageLayout>
  );
};

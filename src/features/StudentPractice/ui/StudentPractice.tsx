import { useNavigate } from 'react-router-dom';

import { PracticeItem } from './PracticeItem';

import { Accordion } from '@/shared/ui/accordion';
import { useStudentPractice } from '@/entities/Practice';
import { Button, PageLayout } from '@/shared/ui';
import { ROUTER_PATHS } from '@/shared/consts';

export const StudentPractice = () => {
  const { data: practices } = useStudentPractice();

  const navigate = useNavigate();

  const getDocumentStatus = (documentId: string | null) => {
    if (documentId === null) {
      return 'not_uploaded';
    }
    return 'uploaded';
  };

  return (
    <PageLayout
      title='Мои практики'
      subTitle='Управление документами и отслеживание прогресса по практикам'
    >
      <Button
        className='mb-4'
        variant='outline'
        onClick={() => navigate(ROUTER_PATHS.CHANGE_PRACTICE)}
      >
        Заявки на смену практики
      </Button>
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
              <PracticeItem
                key={practiceData.practice.id}
                practiceData={practiceData}
                diaryStatus={diaryStatus}
                characteristicStatus={characteristicStatus}
              />
            );
          })}
      </Accordion>
    </PageLayout>
  );
};

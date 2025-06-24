import { PracticeItem } from './PracticeItem';

import { Accordion } from '@/shared/ui/accordion';
import { useStudentPractice } from '@/entities/Practice';

export const StudentPractice = () => {
  const { data: practices } = useStudentPractice();

  const getDocumentStatus = (documentId: string | null) => {
    if (documentId === null) {
      return 'not_uploaded';
    }
    return 'uploaded';
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
              <PracticeItem
                key={practiceData.practice.id}
                practiceData={practiceData}
                diaryStatus={diaryStatus}
                characteristicStatus={characteristicStatus}
              />
            );
          })}
      </Accordion>
    </>
  );
};

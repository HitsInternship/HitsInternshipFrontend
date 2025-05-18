import { InternshipCard } from '../InternshipCard';

import { IInternship } from '@/entities/Internship';
import {
  PageLayout,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui';

const internships: IInternship[] = [
  {
    id: '1',
    company: 'ООО «Технологии будущего»',
    position: 'Младший разработчик',
    period: 'Сентябрь 2024 - Декабрь 2024',
    semester: 'Осенний семестр 2024',
    status: 'ongoing',
  },
  {
    id: '2',
    company: 'АО «ИнноваСофт»',
    position: 'Стажер-аналитик',
    period: 'Февраль 2024 - Май 2024',
    semester: 'Весенний семестр 2024',
    rating: 4,
    status: 'completed',
  },
  {
    id: '3',
    company: 'ПАО «ТехноСервис»',
    position: 'Ассистент тестировщика',
    period: 'Сентябрь 2023 - Декабрь 2023',
    semester: 'Осенний семестр 2023',
    rating: 5,
    status: 'completed',
  },
  {
    id: '4',
    company: 'ООО «Цифровые решения»',
    position: 'Стажер-программист',
    period: 'Февраль 2023 - Май 2023',
    semester: 'Весенний семестр 2023',
    rating: 3,
    status: 'completed',
  },
];

export const InternshipPage = () => {
  const currentInternships = internships.filter(
    (internship) => internship.status === 'ongoing',
  );
  const previousInternships = internships.filter(
    (internship) => internship.status === 'completed',
  );

  return (
    <PageLayout title='Стажировки'>
      <Tabs defaultValue='current' className='w-full'>
        <TabsList className='mb-6  mx-auto'>
          <TabsTrigger value='current'>Текущий семестр</TabsTrigger>
          <TabsTrigger value='previous'>Предыдущие семестры</TabsTrigger>
        </TabsList>

        <TabsContent value='current'>
          {currentInternships.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {currentInternships.map((internship) => (
                <InternshipCard key={internship.id} internship={internship} />
              ))}
            </div>
          ) : (
            <p className='text-muted-foreground text-lg'>
              Нет активных стажировок в текущем семестре.
            </p>
          )}
        </TabsContent>

        <TabsContent value='previous'>
          {previousInternships.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {previousInternships.map((internship) => (
                <InternshipCard key={internship.id} internship={internship} />
              ))}
            </div>
          ) : (
            <p className='text-muted-foreground text-lg'>
              Нет завершенных стажировок в предыдущих семестрах.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

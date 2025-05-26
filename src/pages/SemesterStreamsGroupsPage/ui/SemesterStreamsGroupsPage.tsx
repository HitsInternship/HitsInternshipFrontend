import { SemesterList } from '@/features/SemesterCRUD';
import { StreamsList } from '@/features/StreamsCRUD';
import {
  PageLayout,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui';

export const SemesterStreamsGroupsPage = () => {
  return (
    <PageLayout>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>
          Управление учебным процессом
        </h1>
        <p className='text-muted-foreground mt-2'>
          Управление семестрами и потоками
        </p>
      </div>

      <Tabs defaultValue='semesters' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='semesters'>Семестры</TabsTrigger>
          <TabsTrigger value='streams'>Потоки</TabsTrigger>
        </TabsList>

        <TabsContent value='semesters'>
          <SemesterList />
        </TabsContent>

        <TabsContent value='streams'>
          <StreamsList />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

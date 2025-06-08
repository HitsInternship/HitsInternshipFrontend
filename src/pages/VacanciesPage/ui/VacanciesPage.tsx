import { ReactElement, useState } from 'react';
import { Plus } from 'lucide-react';

import { VacancyCard } from './VacancyCard';
import { PositionCard } from './PositionCard';

import {
  Button,
  PageLayout,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui';
import { usePositions } from '@/entities/Position';
import { useVacancies } from '@/entities/Vacancy';
import { CreatePositionDialog } from '@/features/CreatePositionDialog';
import { CreateVacancyDialog } from '@/features/CreateVacancyDialog/CreateVacancyDialog';
import { useStores } from '@/shared/contexts';
import { UserRole } from '@/entities/User/models';

export const VacanciesPage = (): ReactElement => {
  const {
    userStore: { roles },
  } = useStores();
  const { data: vacancies } = useVacancies();
  const { data: positions } = usePositions();

  const [isPositionDialogOpen, setIsPositionDialogOpen] = useState(false);
  const [isVacancyDialogOpen, setIsVacancyDialogOpen] = useState(false);

  const canControl =
    roles.includes(UserRole.Curator) || roles.includes(UserRole.DeanMember);

  return (
    <PageLayout title='Вакансии и позиции'>
      <Tabs defaultValue='vacancies' className='w-full'>
        <TabsList className='mb-2 w-full grid-cols-2'>
          <TabsTrigger value='positions'>
            Позиции ({positions?.length})
          </TabsTrigger>
          <TabsTrigger value='vacancies'>
            Вакансии ({vacancies?.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value='vacancies'>
          {canControl && (
            <div className='flex flex-col w-full sm:flex-row justify-end'>
              <Button onClick={() => setIsVacancyDialogOpen(true)}>
                <Plus className='mr-2 h-4 w-4' />
                Создать вакансию
              </Button>
            </div>
          )}
          <div className='space-y-4'>
            <p className='text-muted-foreground'>
              Актуальные вакансии от компаний-партнеров для студентов
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {vacancies?.map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value='positions'>
          {canControl && (
            <div className='flex flex-col w-full sm:flex-row justify-end'>
              <Button onClick={() => setIsPositionDialogOpen(true)}>
                <Plus className='mr-2 h-4 w-4' />
                Создать позицию
              </Button>
            </div>
          )}
          <div className='space-y-6'>
            <p className='text-muted-foreground'>
              Обзор доступных позиций для карьерного развития
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {positions?.map((position) => (
                <PositionCard key={position.id} position={position} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <CreatePositionDialog
        open={isPositionDialogOpen}
        onOpenChange={setIsPositionDialogOpen}
      />

      <CreateVacancyDialog
        open={isVacancyDialogOpen}
        onOpenChange={setIsVacancyDialogOpen}
      />
    </PageLayout>
  );
};

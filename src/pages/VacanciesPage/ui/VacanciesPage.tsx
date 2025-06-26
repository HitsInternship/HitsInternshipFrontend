import { ReactElement, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

import { VacancyCard } from './VacancyCard';
import { PositionCard } from './PositionCard';

import {
  Button,
  Card,
  CardContent,
  Label,
  PageLayout,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui';
import { usePositions } from '@/entities/Position';
import { IVacancyList, useVacancies, VacancyFilters } from '@/entities/Vacancy';
import { CreatePositionDialog } from '@/features/CreatePositionDialog';
import { CreateVacancyDialog } from '@/features/CreateVacancyDialog/CreateVacancyDialog';
import { useStores } from '@/shared/contexts';
import { UserRole } from '@/entities/User/models';
import { useCompaniesList } from '@/entities/Company';
import { Checkbox } from '@/shared/ui/checkbox';

export const VacanciesPage = (): ReactElement => {
  const {
    userStore: { roles },
  } = useStores();
  const { mutate } = useVacancies();
  const { data: positions } = usePositions();
  const { data: companies } = useCompaniesList();

  const [isPositionDialogOpen, setIsPositionDialogOpen] = useState(false);
  const [isVacancyDialogOpen, setIsVacancyDialogOpen] = useState(false);
  const [vacanciesData, setVacancies] = useState<IVacancyList | null>(null);

  const { vacancies, pagination } = vacanciesData ?? {
    vacancies: [],
    pagination: { size: 0, count: 0, current: 1 },
  };

  const canControl =
    roles.includes(UserRole.Curator) || roles.includes(UserRole.DeanMember);
  const isCurator = roles.includes(UserRole.Curator);

  const [filters, setFilters] = useState<VacancyFilters>({
    positionId: 'all',
    companyId: 'all',
    isClosed: false,
    isArchived: false,
    page: 1,
  });

  const hasActiveFilters =
    filters.positionId !== 'all' ||
    filters.companyId !== 'all' ||
    filters.isClosed ||
    filters.isArchived;

  const handleFilterChange = (
    key: keyof VacancyFilters,
    value: string | boolean | number,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const clearFilters = () => {
    setFilters({
      positionId: 'all',
      companyId: 'all',
      isClosed: false,
      isArchived: false,
      page: 1,
    });
  };

  const request = () => {
    const reqData: VacancyFilters = {
      isClosed: filters.isClosed,
      isArchived: filters.isArchived,
      page: filters.page,
    };

    if (filters.companyId !== 'all') {
      reqData.companyId = filters.companyId;
    }

    if (filters.positionId !== 'all') {
      reqData.positionId = filters.positionId;
    }
    console.log(reqData);
    mutate(reqData, {
      onSuccess: (result) => {
        setVacancies(result);
      },
    });
  };

  const handlePageChange = (value: number) => {
    setFilters((prev) => ({
      ...prev,
      page: value,
    }));
  };

  useEffect(() => {
    console.log(filters);

    request();
  }, [filters]);

  return (
    <PageLayout title='Вакансии и позиции'>
      <Tabs defaultValue='vacancies' className='w-full'>
        <TabsList className='mb-2 w-full grid-cols-2'>
          <TabsTrigger value='positions'>
            Позиции ({positions?.length})
          </TabsTrigger>
          <TabsTrigger value='vacancies'>
            Вакансии ({vacancies.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value='vacancies'>
          <Card className='p-4'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4'>
              <h3 className='text-lg font-medium'>Фильтры</h3>
              {hasActiveFilters && (
                <Button variant='outline' size='sm' onClick={clearFilters}>
                  <X className='mr-2 h-4 w-4' />
                  Очистить фильтры
                </Button>
              )}
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              {/* Фильтр по позиции */}
              <div className='space-y-2'>
                <Label htmlFor='position-filter'>Позиция</Label>
                <Select
                  value={filters.positionId}
                  onValueChange={(value) =>
                    handleFilterChange('positionId', value)
                  }
                >
                  <SelectTrigger id='position-filter'>
                    <SelectValue placeholder='Все позиции' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Все позиции</SelectItem>
                    {positions?.map((position) => (
                      <SelectItem key={position.id} value={position.id}>
                        {position.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Фильтр по компании */}
              {!isCurator && (
                <div className='space-y-2'>
                  <Label htmlFor='company-filter'>Компания</Label>
                  <Select
                    value={filters.companyId}
                    onValueChange={(value) =>
                      handleFilterChange('companyId', value)
                    }
                  >
                    <SelectTrigger id='company-filter'>
                      <SelectValue placeholder='Все компании' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>Все компании</SelectItem>
                      {companies?.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {/* Чекбокс для закрытых вакансий */}
              <div className='space-y-2'>
                <Label>Статус вакансий</Label>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='show-closed'
                      checked={filters.isClosed}
                      onCheckedChange={(checked) =>
                        handleFilterChange('isClosed', checked as boolean)
                      }
                    />
                    <Label
                      htmlFor='show-closed'
                      className='text-sm font-normal'
                    >
                      Показать закрытые
                    </Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='show-archived'
                      checked={filters.isArchived}
                      onCheckedChange={(checked) =>
                        handleFilterChange('isArchived', checked as boolean)
                      }
                    />
                    <Label
                      htmlFor='show-archived'
                      className='text-sm font-normal'
                    >
                      Показать архивные
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          {canControl && (
            <div className='flex flex-col w-full sm:flex-row justify-end mt-2'>
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
          {pagination.count > 1 && (
            <Card className='mt-3'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div className='text-sm text-muted-foreground'>
                    Страница {pagination.current} из {pagination.count}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        handlePageChange(Math.max(1, filters.page - 1))
                      }
                      disabled={filters.page <= 1}
                    >
                      <ChevronLeft className='h-4 w-4' />
                      Назад
                    </Button>

                    <div className='flex items-center gap-1'>
                      {Array.from(
                        { length: Math.min(5, pagination.count) },
                        (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <Button
                              key={pageNum}
                              variant={
                                pageNum === filters.page ? 'default' : 'outline'
                              }
                              size='sm'
                              onClick={() => handlePageChange(pageNum)}
                              className='w-8 h-8 p-0'
                            >
                              {pageNum}
                            </Button>
                          );
                        },
                      )}
                    </div>

                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        handlePageChange(
                          Math.min(pagination.count, filters.page + 1),
                        )
                      }
                      disabled={filters.page >= pagination.count}
                    >
                      Вперед
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
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
        onSuccess={request}
      />
    </PageLayout>
  );
};

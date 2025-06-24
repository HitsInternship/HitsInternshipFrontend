/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Plus, Search } from 'lucide-react';
import toast from 'react-hot-toast';

import {
  ApplicationListResponse,
  useApplications,
} from '@/entities/Application';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  PageLayout,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from '@/shared/ui';
import { ApplicationCard } from '@/widgets/ApplicationCard';
import { IApplicationFilters } from '@/entities/Application/models/types';
import { useStores } from '@/shared/contexts';
import { UserRole } from '@/entities/User/models';
import { CreateApplicationModal } from '@/features/CreateApplicationModal/ui/CreateApplicationModal ';
export const ChangePracticePage = () => {
  const {
    userStore: { roles },
  } = useStores();
  const [data, setData] = useState<ApplicationListResponse>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useApplications();

  const [filters, setFilters] = useState<IApplicationFilters>({
    isArchived: false,
    page: 1,
  });

  const isDeanMember = roles.includes(UserRole.DeanMember);
  const isStudent = roles.includes(UserRole.Student);

  // const [filtersChanged, setFiltersChanged] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    mutate(filters, {
      onSuccess: (result) => {
        setData(result);
        setIsLoading(false);
      },
      onError: () => {
        toast.error('Ошибка загрузки вакансий');
        setIsLoading(false);
      },
    });
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value, // Сброс страницы при изменении других фильтров
    }));
    // setFiltersChanged(true);
  };

  const update = () => {
    setFilters({
      isArchived: false,
      page: 1,
    });

    console.log(filters);

    mutate(filters, {
      onSuccess: (result) => {
        setData(result);
        setIsLoading(false);
      },
      onError: () => {
        toast.error('Ошибка загрузки вакансий');
        setIsLoading(false);
      },
    });
  };

  const handlePageChange = (key: string, value: any) => {
    handleFilterChange(key, value);
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  return (
    <PageLayout
      title='Заявки на смену места практики'
      subTitle={
        isDeanMember &&
        'Управление заявками студентов на изменение места прохождения практики'
      }
    >
      {isStudent && (
        <Button
          onClick={() => setShowCreateModal(true)}
          className='flex items-center gap-2 mb-4'
        >
          <Plus className='h-4 w-4' />
          Заявка
        </Button>
      )}

      <CreateApplicationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={update}
      />
      <Card className='mb-3'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Filter className='h-5 w-5' />
            Фильтры
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='status'>Статус заявки</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Все статусы' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='null'>Все статусы</SelectItem>
                  <SelectItem value='Created'>Создана</SelectItem>
                  <SelectItem value='UnderConsideration'>
                    На рассмотрении
                  </SelectItem>
                  <SelectItem value='Rejected'>Отклонена</SelectItem>
                  <SelectItem value='Accepted'>Принята</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isDeanMember && (
              <div className='space-y-2'>
                <Label htmlFor='name'>Поиск студента</Label>
                <div className='relative'>
                  <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                  <Input
                    id='name'
                    placeholder='ФИО'
                    value={filters.name}
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                    className='pl-10'
                  />
                </div>
              </div>
            )}
            <div className='space-y-2'>
              <Label htmlFor='isArchived'>Архивные заявки</Label>
              <div className='flex items-center space-x-2'>
                <Switch
                  id='isArchived'
                  checked={filters.isArchived}
                  onCheckedChange={(checked) =>
                    handleFilterChange('isArchived', checked)
                  }
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label>Найдено заявок</Label>
              <div className='text-2xl font-bold text-primary'>
                {data?.applications.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='space-y-4'>
        {isLoading ? (
          <div className='flex items-center justify-center py-8'>
            <div className='text-muted-foreground'>Загрузка...</div>
          </div>
        ) : data?.applications.length === 0 ? (
          <Card>
            <CardContent className='flex items-center justify-center py-8'>
              <div className='text-center'>
                <div className='text-muted-foreground mb-2'>
                  Заявки не найдены
                </div>
                <p className='text-sm text-muted-foreground'>
                  Попробуйте изменить параметры фильтрации
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          data?.applications.map((application) => (
            <ApplicationCard application={application} onSuccess={update} />
          ))
        )}
      </div>

      {/* Пагинация */}
      {data?.pagination.count && data?.pagination.count > 1 && (
        <Card className='mt-3'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='text-sm text-muted-foreground'>
                Страница {data?.pagination.current} из {data?.pagination.count}
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() =>
                    handlePageChange('page', Math.max(1, filters.page - 1))
                  }
                  disabled={filters.page <= 1}
                >
                  <ChevronLeft className='h-4 w-4' />
                  Назад
                </Button>

                <div className='flex items-center gap-1'>
                  {Array.from(
                    { length: Math.min(5, data?.pagination.count) },
                    (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <Button
                          key={pageNum}
                          variant={
                            pageNum === filters.page ? 'default' : 'outline'
                          }
                          size='sm'
                          onClick={() => handlePageChange('page', pageNum)}
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
                      'page',
                      Math.min(data.pagination.count, filters.page + 1),
                    )
                  }
                  disabled={filters.page >= data.pagination.count}
                >
                  Вперед
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </PageLayout>
  );
};

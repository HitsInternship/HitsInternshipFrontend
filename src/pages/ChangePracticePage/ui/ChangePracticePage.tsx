/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';

import { mockData } from './data';
import { ApplicationCard } from './ApplicationCard';

import { ApplicationListResponse } from '@/entities/Application';
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
export const ChangePracticePage = () => {
  const [data, setData] = useState<ApplicationListResponse>(mockData);
  const [loading, setLoading] = useState(false);

  // Состояние фильтров
  const [filters, setFilters] = useState({
    status: 'null',
    studentId: '',
    showArchived: false,
    page: 1,
  });

  // const [filtersChanged, setFiltersChanged] = useState(false);

  // Функция для получения данных (заглушка)
  const fetchData = async () => {
    setLoading(true);
    // setFiltersChanged(false);
    // Здесь будет реальный API запрос
    // const response = await fetch('/api/applications', { ... })
    // const data = await response.json()

    // Имитация загрузки
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log(filters);

    // Фильтрация данных для демонстрации
    let filteredApplications = mockData.applications;

    console.log(filteredApplications);
    if (filters.status !== 'null') {
      filteredApplications = filteredApplications.filter(
        (app) => app.status.toString() === filters.status,
      );
    }

    if (filters.studentId) {
      filteredApplications = filteredApplications.filter(
        (app) =>
          app.student.id.includes(filters.studentId) ||
          `${app.student.surname} ${app.student.name}`
            .toLowerCase()
            .includes(filters.studentId.toLowerCase()),
      );
    }

    if (!filters.showArchived) {
      filteredApplications = filteredApplications.filter(
        (app) => !app.isDeleted,
      );
    }

    setData({
      applications: filteredApplications,
      pagination: {
        ...mockData.pagination,
        current: filters.page,
      },
    });

    setLoading(false);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value, // Сброс страницы при изменении других фильтров
    }));
    // setFiltersChanged(true);
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
      subTitle='Управление заявками студентов на изменение места прохождения практики'
    >
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

            <div className='space-y-2'>
              <Label htmlFor='studentId'>Поиск студента</Label>
              <div className='relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  id='studentId'
                  placeholder='ФИО'
                  value={filters.studentId}
                  onChange={(e) =>
                    handleFilterChange('studentId', e.target.value)
                  }
                  className='pl-10'
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='showArchived'>Архивные заявки</Label>
              <div className='flex items-center space-x-2'>
                <Switch
                  id='showArchived'
                  checked={filters.showArchived}
                  onCheckedChange={(checked) =>
                    handleFilterChange('showArchived', checked)
                  }
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label>Найдено заявок</Label>
              <div className='text-2xl font-bold text-primary'>
                {data.applications.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className='space-y-4'>
        {loading ? (
          <div className='flex items-center justify-center py-8'>
            <div className='text-muted-foreground'>Загрузка...</div>
          </div>
        ) : data.applications.length === 0 ? (
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
          data.applications.map((application) => (
            <ApplicationCard {...application} />
          ))
        )}
      </div>

      {/* Пагинация */}
      {data.pagination.count > 1 && (
        <Card className='mt-3'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='text-sm text-muted-foreground'>
                Страница {data.pagination.current} из {data.pagination.count}
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
                    { length: Math.min(5, data.pagination.count) },
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

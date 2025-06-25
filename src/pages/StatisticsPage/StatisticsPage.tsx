import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import toast from 'react-hot-toast';

import { ChartTooltip } from '@/shared/ui/chart';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  PageLayout,
} from '@/shared/ui';
import { useCompaniesList } from '@/entities/Company';
import { usePositions } from '@/entities/Position';
import { MultiSelect } from '@/widgets/MultiSelect/MultiSelect';
import { useStatistics } from '@/entities/Practice';
import { Statistics } from '@/entities/Practice/models';

const colors = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#00ff00',
  '#0088fe',
  '#00c49f',
  '#ffbb28',
  '#ff8042',
  '#8dd1e1',
];
export interface StatisticsFilters {
  companies: string[];
  positions: string[];
}

export const StatisticsPage = () => {
  const { mutate } = useStatistics();
  const [currentData, setCurrentData] = useState<Statistics | null>(null);
  const [filters, setFilters] = useState<StatisticsFilters>({
    companies: [],
    positions: [],
  });

  const {
    data: companies,
    isPending: companiesLoading,
    error: companiesError,
  } = useCompaniesList();

  const {
    data: positions,
    isPending: positionsLoading,
    error: positionsError,
  } = usePositions();

  // Обработчики изменения фильтров
  const handleCompaniesChange = (selectedCompanies: string[]) => {
    setFilters((prev) => ({ ...prev, companies: selectedCompanies }));
  };

  const handlePositionsChange = (selectedPositions: string[]) => {
    setFilters((prev) => ({ ...prev, positions: selectedPositions }));
  };

  // Сброс всех фильтров
  const resetFilters = () => {
    setFilters({ companies: [], positions: [] });
  };

  //   // Применение фильтров (здесь будет логика фильтрации данных)
  //   const applyFilters = () => {
  //     console.log('Применяем фильтры:', filters);
  //     // Здесь будет логика обновления графиков с учетом фильтров
  //   };

  // Проверка наличия активных фильтров
  const hasActiveFilters =
    filters.companies.length > 0 || filters.positions.length > 0;

  const handleSubmit = () => {
    mutate(
      {
        positionsIds: filters.positions,
        companiesIds: filters.companies,
      },
      {
        onSuccess: (result) => {
          setCurrentData(result);
        },
        onError: () => {
          toast.error('Ошибка загрузки статистики');
        },
      },
    );
  };

  const allEntities = useMemo(() => {
    const entities = new Set<string>();
    if (currentData) {
      Object.entries(currentData).forEach(([, semesterData]) => {
        if (Object.keys(semesterData).length > 0) {
          Object.entries(semesterData).forEach(([entity, count]) => {
            if (count > 0) {
              entities.add(entity);
            }
          });
        }
      });
    }
    return Array.from(entities);
  }, [currentData]);

  // Создаем маппинг сущностей к цветам
  const entityColorMap = useMemo(() => {
    const map: { [key: string]: string } = {};
    allEntities.forEach((entity, index) => {
      map[entity] = colors[index % colors.length];
    });
    return map;
  }, [allEntities]);

  const semesterCharts = useMemo(() => {
    return (
      currentData &&
      Object.entries(currentData)
        .filter(([, semesterData]) => Object.keys(semesterData).length > 0)
        .map(([semester, semesterData]) => {
          const entities = Object.entries(semesterData).filter(
            ([, count]) => count > 0,
          );
          const chartData = entities.map(([entity, count]) => ({
            name: entity,
            value: count,
            color: entityColorMap[entity],
          }));

          return {
            semester,
            data: chartData,
            entities: entities.map(([entity]) => entity),
          };
        })
    );
  }, [currentData, entityColorMap]);

  return (
    <PageLayout title='Статистика'>
      <Card className='mb-4'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='flex items-center gap-2'>
              Фильтры данных
            </CardTitle>
            <div className='flex gap-2'>
              {hasActiveFilters && (
                <Button variant='outline' size='sm' onClick={resetFilters}>
                  Сбросить фильтры
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Селект компаний */}
            <MultiSelect
              options={companies}
              selectedValues={filters.companies}
              onSelectionChange={handleCompaniesChange}
              placeholder='Выберите компании...'
              label='Компании'
              loading={companiesLoading}
              error={companiesError}
              maxDisplayItems={3}
            />

            {/* Селект позиций */}
            <MultiSelect
              options={positions}
              selectedValues={filters.positions}
              onSelectionChange={handlePositionsChange}
              placeholder='Выберите позиции...'
              label='Позиции'
              loading={positionsLoading}
              error={positionsError}
              maxDisplayItems={3}
            />
          </div>

          {/* Кнопка применения фильтров */}
          <div className='flex  mt-3'>
            <Button
              onClick={handleSubmit}
              disabled={
                !hasActiveFilters || companiesLoading || positionsLoading
              }
              className='min-w-[200px]'
            >
              Применить фильтры
            </Button>
          </div>
        </CardContent>
      </Card>
      {currentData && (
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {semesterCharts?.map(({ semester, data }) => (
            <Card key={semester}>
              <CardHeader>
                <CardTitle className='text-lg'>{semester}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='h-[300px]'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart
                      data={data}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis
                        dataKey='name'
                        angle={-45}
                        textAnchor='end'
                        height={80}
                        fontSize={10}
                        interval={0}
                      />
                      <YAxis fontSize={10} />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className='bg-white p-3 border rounded shadow-lg'>
                                <p className='font-medium'>{data.name}</p>
                                <p style={{ color: data.color }}>
                                  Количество: {data.value}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey='value' radius={[2, 2, 0, 0]}>
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Легенда для семестра */}
                <div className='mt-4 space-y-2'>
                  <h4 className='text-sm font-medium'>Данные:</h4>
                  <div className='grid grid-cols-1 gap-1'>
                    {data.map((item) => (
                      <div
                        key={item.name}
                        className='flex items-center gap-2 text-xs'
                      >
                        <div
                          className='w-3 h-3 rounded'
                          style={{ backgroundColor: item.color }}
                        />
                        <span className='truncate'>
                          {item.name}: {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </PageLayout>
  );
};

import {
  Calendar,
  Users,
  BookOpen,
  GraduationCap,
  Archive,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { useGlobalSelections } from '@/entities/Selection/hooks';
import { ROUTER_PATHS } from '@/shared/consts';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip';
import { Tooltip } from '@/shared/ui/tooltip.tsx';
import { ArchiveGlobalSelection } from '@/pages/GlobalSelections/ui/ArchiveGlobalSelection.tsx';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-Ru', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const GlobalSelectionsPage = () => {
  const [archiveFilter, setArchiveFilter] = useState('active');
  const { data: selections, isLoading } = useGlobalSelections(
    archiveFilter !== 'active',
  );
  const navigate = useNavigate();

  if (isLoading) {
    return;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Отборы</h1>
      </div>

      <div className='mb-6 flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <label htmlFor='archive-filter' className='text-sm font-medium'>
            Фильтр:
          </label>
          <Select value={archiveFilter} onValueChange={setArchiveFilter}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Выберите статус' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='active'>Актуальные</SelectItem>
              <SelectItem value='archived'>Архивированные</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {selections &&
          selections.map((selection) => (
            <Card
              key={selection.id}
              className={`hover:shadow-lg transition-shadow ${selection.isDeleted ? 'opacity-75 border-dashed' : ''}`}
            >
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle
                    className='text-lg flex items-center gap-2 hover:underline hover:decoration-2 underline-offset-2 transition-all duration-200 cursor-pointer'
                    onClick={() => {
                      navigate(ROUTER_PATHS.SELECTION(selection.id));
                    }}
                  >
                    Отбор потока {selection.stream.streamNumber}
                    {selection.isDeleted && (
                      <Archive className='h-4 w-4 text-muted-foreground' />
                    )}
                  </CardTitle>
                  {!selection.isDeleted && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <ArchiveGlobalSelection id={selection.id} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Добавить в архив</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Semester Information */}
                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-sm'>
                    <Calendar className='h-4 w-4 text-muted-foreground' />
                    <span className='font-medium'>
                      {selection.semester.description}
                    </span>
                  </div>
                  <div className='text-sm text-muted-foreground ml-6'>
                    {formatDate(selection.semester.startDate.toString())} -{' '}
                    {formatDate(selection.semester.endDate.toString())}
                  </div>
                </div>

                {/* Stream Details */}
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  <div className='flex items-center gap-2'>
                    <GraduationCap className='h-4 w-4 text-muted-foreground' />
                    <span>Курс {selection.stream.course}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <BookOpen className='h-4 w-4 text-muted-foreground' />
                    <span>Год поступ. {selection.stream.year}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {selections && selections.length === 0 && (
        <div className='text-center py-12'>
          <div className='text-muted-foreground'>
            <Users className='h-12 w-12 mx-auto mb-4 opacity-50' />
            <p className='text-lg font-medium'>
              {archiveFilter === 'archived'
                ? 'Нет архивированных отборов'
                : 'Нет актуальных отборов'}
            </p>
            <p className='text-sm'>
              {archiveFilter === 'archived'
                ? 'Архивированные отборы появятся здесь.'
                : 'Актуальные отборы появятся здесь.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

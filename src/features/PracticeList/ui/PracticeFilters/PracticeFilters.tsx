import { Filter } from 'lucide-react';

import { PracticeFiltersProps } from '../../model';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';

export const PracticeFilters = ({
  filters,
  onChange,
  groups,
  companies,
}: PracticeFiltersProps) => {
  const handleChange = (key: keyof typeof filters, value: string) => {
    const parsedValue =
      value === 'undefined'
        ? undefined
        : key === 'hasMark'
          ? value === 'yes'
          : value;

    onChange({
      ...filters,
      [key]: parsedValue,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Filter className='w-4 h-4' />
          Фильтры
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='space-y-2'>
            <Label>Группа</Label>
            <Select
              value={filters.groupId ?? 'undefined'}
              onValueChange={(value) => handleChange('groupId', value)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Все группы' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='undefined'>Все группы</SelectItem>
                {groups.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.groupNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>Компания</Label>
            <Select
              value={filters.companyId ?? 'undefined'}
              onValueChange={(value) => handleChange('companyId', value)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Все компании' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='undefined'>Все компании</SelectItem>
                {companies?.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>Наличие оценки</Label>
            <Select
              value={
                filters.hasMark === undefined
                  ? 'undefined'
                  : filters.hasMark
                    ? 'yes'
                    : 'no'
              }
              onValueChange={(value) => handleChange('hasMark', value)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Все' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='undefined'>Все</SelectItem>
                <SelectItem value='yes'>Есть оценка</SelectItem>
                <SelectItem value='no'>Нет оценки</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

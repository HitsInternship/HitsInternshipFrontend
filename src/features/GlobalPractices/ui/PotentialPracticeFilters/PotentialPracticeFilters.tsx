import { Filter } from 'lucide-react';

import { PotentialPracticeFiltersProps } from '../../models';

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

export const PotentialPracticeFilters = ({
  filters,
  onChange,
  groups,
  companies,
  positions,
}: PotentialPracticeFiltersProps) => {
  const handleChange = (key: keyof typeof filters, value: string) => {
    const parsedValue = value === 'undefined' ? undefined : value;

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
            <Label>Старая компания</Label>
            <Select
              value={filters.oldCompanyId ?? 'undefined'}
              onValueChange={(value) => handleChange('oldCompanyId', value)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Старая компания' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='undefined'>Без компании</SelectItem>
                {companies?.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>Старая позиция</Label>
            <Select
              value={filters.oldPositionId ?? 'undefined'}
              onValueChange={(value) => handleChange('oldPositionId', value)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Старая позиция' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='undefined'>Без позиции</SelectItem>
                {positions?.map((position) => (
                  <SelectItem key={position.id} value={position.id}>
                    {position.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

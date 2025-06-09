import { Filter } from 'lucide-react';
import { useState } from 'react';

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

export const PracticeFilter = () => {
  const mockGroups = ['9722', '9721', '9723', '9720'];
  const mockSemesters = ['2024-1', '2024-2', '2025-1', '2025-2'];
  const mockCompanies = [
    'ООО Технологии',
    'ИТ Решения',
    'Софт Компани',
    'Дигитал Групп',
  ];
  const [filters, setFilters] = useState({
    group: 'all',
    status: 'all', // есть оценка, нет оценки
    company: 'all',
    semester: 'all',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Filter className='w-4 h-4' />
          Фильтры
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='space-y-2'>
            <Label>Группа</Label>
            <Select
              value={filters.group}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, group: value }))
              }
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Все группы' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Все группы</SelectItem>
                {mockGroups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>Статус</Label>
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Все' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Все</SelectItem>
                <SelectItem value='graded'>Есть оценка</SelectItem>
                <SelectItem value='not-graded'>Нет оценки</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>Компания</Label>
            <Select
              value={filters.company}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, company: value }))
              }
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Все компании' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Все компании</SelectItem>
                {mockCompanies.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>Семестр</Label>
            <Select
              value={filters.semester}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, semester: value }))
              }
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Все семестры' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Все семестры</SelectItem>
                {mockSemesters.map((semester) => (
                  <SelectItem key={semester} value={semester}>
                    {semester}
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

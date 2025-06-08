import { useState, useEffect } from 'react';
import {
  MoreHorizontal,
  Search,
  Eye,
  Crown,
  Mail,
  Phone,
  LoaderCircle,
  FilterX,
} from 'lucide-react';

import { getFullName } from './StudentPage.utils';
import { CreateStudentModal } from '../CreateStudentModal';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import type { IStudent } from '@/entities/Student';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Label, PageLayout } from '@/shared/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { useStreams } from '@/features/StreamsCRUD/hooks';
import { useGroups } from '@/entities/Groups';
import {
  getStatusColor,
  getStatusText,
  useStudentsByGroup,
  useStudentsByStream,
} from '@/entities/Student';

export const StudentsPage = () => {
  const [selectedStreamId, setSelectedStreamId] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'stream' | 'group'>(
    'stream',
  );

  const { data: streams, isLoading: isLoadingStreams } = useStreams();
  const { data: allGroups, isLoading: isLoadingAllGroups } = useGroups();

  const { data: streamStudents, isLoading: isLoadingStreamStudents } =
    useStudentsByStream(selectedStreamId);

  const { data: groupStudents, isLoading: isLoadingGroupStudents } =
    useStudentsByGroup(selectedGroupId);

  const students = activeFilter === 'stream' ? streamStudents : groupStudents;

  const filteredStudents = students?.filter((student: IStudent) => {
    const fullName = getFullName(student).toLowerCase();
    const email = student.email?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();

    return fullName.includes(search) || email.includes(search);
  });

  useEffect(() => {
    if (activeFilter === 'stream' && selectedGroupId) {
      setSelectedGroupId('');
    } else if (activeFilter === 'group' && selectedStreamId) {
      setSelectedStreamId('');
    }
  }, [activeFilter, selectedGroupId, selectedStreamId]);

  const handleStreamChange = (streamId: string) => {
    setSelectedStreamId(streamId);
    setActiveFilter('stream');
  };

  const handleGroupChange = (groupId: string) => {
    setSelectedGroupId(groupId);
    setActiveFilter('group');
  };

  const handleClearFilters = () => {
    setSelectedStreamId('');
    setSelectedGroupId('');
    setSearchTerm('');
  };

  const handleViewStudent = (studentId: string) => {
    console.log('Просмотр студента:', studentId);
    // Здесь будет логика просмотра студента
  };

  const isLoading =
    isLoadingStreams ||
    isLoadingAllGroups ||
    isLoadingStreamStudents ||
    isLoadingGroupStudents;

  const hasActiveFilter = selectedStreamId || selectedGroupId;

  return (
    <PageLayout title='Студенты' subTitle=' Управление студентами и их данными'>
      <div className='container mx-auto py-6 space-y-6'>
        <div className='flex flex-col sm:flex-row justify-end gap-4'>
          <CreateStudentModal />
        </div>

        <Card>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <CardTitle>Фильтры</CardTitle>
              {hasActiveFilter && (
                <Button variant='ghost' size='sm' onClick={handleClearFilters}>
                  <FilterX className='mr-2 h-4 w-4' />
                  Сбросить фильтры
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue='stream'
              value={activeFilter}
              onValueChange={(value) =>
                setActiveFilter(value as 'stream' | 'group')
              }
            >
              <TabsList className='mb-4'>
                <TabsTrigger value='stream'>По потоку</TabsTrigger>
                <TabsTrigger value='group'>По группе</TabsTrigger>
              </TabsList>

              <TabsContent value='stream'>
                <div className='space-y-2'>
                  <Label htmlFor='stream-select'>Выберите поток</Label>
                  <Select
                    value={selectedStreamId}
                    onValueChange={handleStreamChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите поток' />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingStreams ? (
                        <SelectItem value='loading' disabled>
                          Загрузка...
                        </SelectItem>
                      ) : streams?.length ? (
                        streams.map((stream) => (
                          <SelectItem key={stream.id} value={stream.id}>
                            {stream.streamNumber || `Поток ${stream.id}`}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value='no-streams' disabled>
                          Нет доступных потоков
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value='group'>
                <div className='space-y-2'>
                  <Label htmlFor='group-select'>Выберите группу</Label>
                  <Select
                    value={selectedGroupId}
                    onValueChange={handleGroupChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите группу' />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingAllGroups ? (
                        <SelectItem value='loading' disabled>
                          Загрузка...
                        </SelectItem>
                      ) : allGroups?.length ? (
                        allGroups.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            Группа {group.groupNumber}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value='no-groups' disabled>
                          Нет доступных групп
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {hasActiveFilter && students && (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Всего студентов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{students?.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Обучаются</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {students?.filter((s) => s.status === 'InProcess').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Выпускники
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {students?.filter((s) => s.status === 'Graduated').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Старосты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {students?.filter((s) => s.isHeadMan).length}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {hasActiveFilter && (
          <div className='flex items-center space-x-2'>
            <div className='relative flex-1 max-w-sm'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Поиск по имени или email...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-8'
              />
            </div>
          </div>
        )}

        {isLoading && (
          <div className='flex items-center justify-center h-[400px] w-full'>
            <LoaderCircle className='h-8 w-8 animate-spin text-black-500 dark:text-gray-300' />
          </div>
        )}

        {!hasActiveFilter && !isLoading && (
          <Card>
            <CardContent className='flex items-center justify-center h-[400px]'>
              <div className='text-center'>
                <h3 className='text-lg font-medium text-muted-foreground mb-2'>
                  Выберите фильтр
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Для просмотра студентов необходимо выбрать поток или группу
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {hasActiveFilter && !isLoading && (
          <Card>
            <CardContent className='p-0'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ФИО</TableHead>
                    <TableHead>Контакты</TableHead>
                    {activeFilter === 'stream' && <TableHead>Группа</TableHead>}
                    <TableHead>Курс</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Роль</TableHead>
                    <TableHead className='w-[50px]' />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents?.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className='font-medium'>
                        {getFullName(student)}
                      </TableCell>
                      <TableCell>
                        <div className='space-y-1'>
                          {student.email && (
                            <div className='flex items-center text-sm text-muted-foreground'>
                              <Mail className='mr-1 h-3 w-3' />
                              {student.email}
                            </div>
                          )}
                          {student.phone && (
                            <div className='flex items-center text-sm text-muted-foreground'>
                              <Phone className='mr-1 h-3 w-3' />
                              {student.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      {activeFilter === 'stream' && (
                        <TableCell>
                          {student.groupNumber || 'Не указана'}
                        </TableCell>
                      )}
                      <TableCell>{student.course || 'Не указан'}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {getStatusText(student.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {student.isHeadMan ? (
                          <Badge
                            variant='outline'
                            className='bg-amber-50 text-amber-700 border-amber-200'
                          >
                            <Crown className='mr-1 h-3 w-3' />
                            Староста
                          </Badge>
                        ) : (
                          <Badge
                            variant='outline'
                            className='bg-gray-50 text-gray-700 border-gray-200'
                          >
                            Студент
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                              <span className='sr-only'>Открыть меню</span>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                              onClick={() => handleViewStudent(student.id)}
                            >
                              <Eye className='mr-2 h-4 w-4' />
                              Просмотр
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                          {/* <EditStudentModal studentId={student.id} />*/}
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredStudents?.length === 0 && hasActiveFilter && (
                <div className='text-center py-8 text-muted-foreground'>
                  {searchTerm
                    ? 'Студенты не найдены'
                    : 'Нет студентов для отображения'}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

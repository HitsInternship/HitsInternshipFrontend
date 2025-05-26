import { useState } from 'react';
import {
  MoreHorizontal,
  Search,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  Crown,
  Mail,
  Phone,
  LoaderCircle,
} from 'lucide-react';

import {
  getFullName,
  getStatusColor,
  getStatusText,
} from './StudentPage.utils';

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
import { IStudent } from '@/entities/Student';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select.tsx';
import { Label, PageLayout } from '@/shared/ui';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog.tsx';
import { Checkbox } from '@/shared/ui/checkbox.tsx';
import { useStudents } from '@/entities/Student/hooks/useStudents.ts';

export const StudentsPage = () => {
  const { data: students, isLoading } = useStudents();
  const [searchTerm, setSearchTerm] = useState('');
  const [editedStudent, setEditedStudent] = useState<IStudent | null>(null);

  const filteredStudents = students?.filter((student) => {
    const fullName = getFullName(student).toLowerCase();
    const email = student.email?.toLowerCase() || '';
    const groupNumber = student.groupNumber?.toString() || '';
    const search = searchTerm.toLowerCase();

    return (
      fullName.includes(search) ||
      email.includes(search) ||
      groupNumber.includes(search)
    );
  });

  const handleViewStudent = (studentId: string) => {
    console.log('Просмотр студента:', studentId);
    // Здесь будет логика просмотра студента
  };

  const handleEditStudent = (studentId: string) => {
    console.log('Редактирование студента:', studentId);
    const student = students?.find((student) => student.id === studentId);
    if (student) {
      setEditedStudent(student);
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[90vh] w-full'>
        <LoaderCircle className='h-8 w-8 animate-spin text-black-500 dark:text-gray-300' />
      </div>
    );
  }

  return (
    <>
      <PageLayout
        title='Студенты'
        subTitle='Управление студентами и их данными'
      >
        <div className='container mx-auto py-6 space-y-6'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <Dialog>
              <DialogTrigger>
                <Button>
                  <UserPlus className='mr-2 h-4 w-4' />
                  Добавить студента
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[600px]'>
                <DialogHeader>
                  <DialogTitle> Добавить студента</DialogTitle>
                </DialogHeader>
                <form className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='edit-surname'>Фамилия *</Label>
                      <Input id='edit-surname' required />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='edit-name'>Имя *</Label>
                      <Input id='edit-name' required />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='edit-middlename'>Отчество</Label>
                    <Input id='edit-middlename' />
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='edit-email'>Email *</Label>
                      <Input id='edit-email' type='email' required />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='edit-phone'>Телефон</Label>
                      <Input id='edit-phone' placeholder='+7 (999) 123-45-67' />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='edit-status'>Статус</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='InProcess'>Обучается</SelectItem>
                          <SelectItem value='OnAcademicLeave'>
                            Академический отпуск
                          </SelectItem>
                          <SelectItem value='Graduated'>Выпускник</SelectItem>
                          <SelectItem value='Expelled'>Отчислен</SelectItem>
                          <SelectItem value='Transfered'>Переведен</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='edit-groupId'>Номер группы</Label>
                      <Input id='edit-groupId' placeholder='101' />
                    </div>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Checkbox id='edit-isHeadMan' />
                    <Label htmlFor='edit-isHeadMan'>Староста группы</Label>
                  </div>

                  <div className='flex justify-end space-x-2 pt-4'>
                    <Button type='submit'>Сохранить изменения</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Статистика */}
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

          {/* Поиск */}
          <div className='flex items-center space-x-2'>
            <div className='relative flex-1 max-w-sm'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Поиск по имени, email или группе...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-8'
              />
            </div>
          </div>

          {/* Таблица студентов */}
          <Card>
            <CardContent className='p-0'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ФИО</TableHead>
                    <TableHead>Контакты</TableHead>
                    <TableHead>Группа</TableHead>
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
                      <TableCell>
                        {student.groupNumber || 'Не указана'}
                      </TableCell>
                      <TableCell>{student.course || 'Не указан'}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {getStatusText(student.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {student.isHeadMan && (
                          <Badge
                            variant='outline'
                            className='bg-amber-50 text-amber-700 border-amber-200'
                          >
                            <Crown className='mr-1 h-3 w-3' />
                            Староста
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
                            <Dialog>
                              <DialogTrigger>
                                <Button
                                  variant='ghost'
                                  onClick={() => {
                                    handleEditStudent(student.id);
                                  }}
                                >
                                  <Edit className='mr-2 h-4 w-4' />
                                  Редактировать
                                </Button>
                              </DialogTrigger>
                              <DialogContent className='sm:max-w-[600px]'>
                                <DialogHeader>
                                  <DialogTitle>
                                    Редактировать студента
                                  </DialogTitle>
                                </DialogHeader>
                                <form className='space-y-4'>
                                  <div className='grid grid-cols-2 gap-4'>
                                    <div className='space-y-2'>
                                      <Label htmlFor='edit-surname'>
                                        Фамилия *
                                      </Label>
                                      <Input
                                        id='edit-surname'
                                        required
                                        defaultValue={
                                          editedStudent?.surname ?? ''
                                        }
                                      />
                                    </div>
                                    <div className='space-y-2'>
                                      <Label htmlFor='edit-name'>Имя *</Label>
                                      <Input
                                        id='edit-name'
                                        required
                                        defaultValue={editedStudent?.name ?? ''}
                                      />
                                    </div>
                                  </div>

                                  <div className='space-y-2'>
                                    <Label htmlFor='edit-middlename'>
                                      Отчество
                                    </Label>
                                    <Input
                                      id='edit-middlename'
                                      defaultValue={
                                        editedStudent?.middlename ?? ''
                                      }
                                    />
                                  </div>

                                  <div className='grid grid-cols-2 gap-4'>
                                    <div className='space-y-2'>
                                      <Label htmlFor='edit-email'>
                                        Email *
                                      </Label>
                                      <Input
                                        id='edit-email'
                                        type='email'
                                        required
                                        defaultValue={
                                          editedStudent?.email ?? ''
                                        }
                                      />
                                    </div>
                                    <div className='space-y-2'>
                                      <Label htmlFor='edit-phone'>
                                        Телефон
                                      </Label>
                                      <Input
                                        id='edit-phone'
                                        placeholder='+7 (999) 123-45-67'
                                        defaultValue={
                                          editedStudent?.phone ?? ''
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className='grid grid-cols-2 gap-4'>
                                    <div className='space-y-2'>
                                      <Label htmlFor='edit-status'>
                                        Статус
                                      </Label>
                                      <Select
                                        defaultValue={editedStudent?.status}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value='InProcess'>
                                            Обучается
                                          </SelectItem>
                                          <SelectItem value='OnAcademicLeave'>
                                            Академический отпуск
                                          </SelectItem>
                                          <SelectItem value='Graduated'>
                                            Выпускник
                                          </SelectItem>
                                          <SelectItem value='Expelled'>
                                            Отчислен
                                          </SelectItem>
                                          <SelectItem value='Transfered'>
                                            Переведен
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className='space-y-2'>
                                      <Label htmlFor='edit-groupId'>
                                        Номер группы
                                      </Label>
                                      <Input
                                        id='edit-groupId'
                                        placeholder='101'
                                        defaultValue={
                                          editedStudent?.groupNumber ?? ''
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className='flex items-center space-x-2'>
                                    <Checkbox id='edit-isHeadMan' />
                                    <Label htmlFor='edit-isHeadMan'>
                                      Староста группы
                                    </Label>
                                  </div>

                                  <div className='flex justify-end space-x-2 pt-4'>
                                    <Button type='submit'>
                                      Сохранить изменения
                                    </Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <DropdownMenuItem className='text-red-600 focus:text-red-600'>
                              <Trash2 className='mr-2 h-4 w-4' />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredStudents?.length === 0 && (
                <div className='text-center py-8 text-muted-foreground'>
                  {searchTerm
                    ? 'Студенты не найдены'
                    : 'Нет студентов для отображения'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </>
  );
};

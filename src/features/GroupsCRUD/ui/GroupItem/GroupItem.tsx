import {
  ChevronDown,
  Edit,
  EllipsisVertical,
  Trash2,
  Users,
} from 'lucide-react';

import { GroupItemProps } from './GroupItem.types';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui';
import { StudentItem } from '@/features/GroupsCRUD/ui/StudentItem';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { useDeleteGroup } from '@/features/GroupsCRUD/hooks';

export const GroupItem = ({
  group,
  headMan,
  streamInfo,
  isExpanded,
  toggleGroupExpansion,
  handleEditGroup,
}: GroupItemProps) => {
  const { mutateAsync: deleteGroupMutation } = useDeleteGroup();

  const handleDeleteGroup = (id: string) => {
    deleteGroupMutation(id);
  };

  return (
    <Card className='w-full'>
      <Collapsible
        open={isExpanded}
        onOpenChange={() => toggleGroupExpansion(group.id)}
      >
        <CollapsibleTrigger asChild>
          <CardHeader className='cursor-pointer hover:bg-muted/50 transition-colors'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div>
                  <CardTitle className='text-lg'>
                    Группа {group.groupNumber}
                  </CardTitle>
                  <CardDescription>
                    Поток: {streamInfo?.streamNumber || 'Неизвестно'} (
                    {streamInfo?.year || 'N/A'}) • Студентов:{' '}
                    {group.students?.length ?? 0}
                    {headMan && (
                      <>
                        {' '}
                        • Староста: {headMan.surname} {headMan.name}
                      </>
                    )}
                  </CardDescription>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        requestAnimationFrame(() => {
                          handleEditGroup(group);
                        });
                      }}
                    >
                      <Edit className='mr-2 h-4 w-4' />
                      Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='text-destructive focus:text-destructive'
                      onClick={(e) => {
                        e.stopPropagation();
                        requestAnimationFrame(() => {
                          handleDeleteGroup(group.id);
                        });
                      }}
                    >
                      <Trash2 className='mr-2 h-4 w-4' />
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant='ghost' size='icon'>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </Button>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            {!group.students || group.students.length === 0 ? (
              <div className='text-center py-8 text-muted-foreground'>
                <Users className='mx-auto h-12 w-12 mb-4 opacity-50' />
                <p>В группе пока нет студентов</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ФИО</TableHead>
                    <TableHead>Контакты</TableHead>
                    <TableHead>Курс</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Роль</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.students.map((student) => (
                    <StudentItem key={student.id} student={student} />
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

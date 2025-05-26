import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

import { CreateSemesterDialog } from '@/features/SemesterCRUD/ui/CreateSemesterDialog';
import { Semester } from '@/features/SemesterCRUD/model';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
} from '@/shared/ui';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { SemesterItem } from '@/features/SemesterCRUD/ui/SemesterItem';
import {
  useDeleteOrArchiveSemester,
  useSemesters,
} from '@/features/SemesterCRUD/hooks';

export const SemesterList = () => {
  const { mutateAsync: deleteOrArchive } = useDeleteOrArchiveSemester();
  const [showArchived, setShowArchived] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: semesters = [] } = useSemesters(showArchived);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSemester, setCurrentSemester] = useState<Semester | null>(null);

  const handleAddSemester = () => {
    setCurrentSemester(null);
    setIsDialogOpen(true);
  };

  const handleEditSemester = (semester: Semester) => {
    setCurrentSemester(semester);
    setIsDialogOpen(true);
  };

  const handleArchiveSemester = (semesterId: string) => {
    deleteOrArchive({ semesterId, isArchive: true });
  };

  const handleDeleteSemester = (semesterId: string) => {
    deleteOrArchive({ semesterId, isArchive: false });
  };

  const filteredSemesters: Semester[] = semesters.filter(
    (s) => showArchived || !s.isDeleted,
  );

  return (
    <div className='container mx-auto py-10'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <div>
            <CardTitle>Семестры</CardTitle>
            <CardDescription>Управление учебными семестрами</CardDescription>
          </div>
          <Button onClick={handleAddSemester}>
            <PlusCircle className='mr-2 h-4 w-4' />
            Добавить семестр
          </Button>
        </CardHeader>
        <CardContent>
          <div className='mb-4 flex items-center space-x-2'>
            <Checkbox
              id='showArchived'
              checked={showArchived}
              onCheckedChange={(checked) => setShowArchived(checked as boolean)}
            />
            <Label htmlFor='showArchived'>Показать архивные семестры</Label>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Начало</TableHead>
                <TableHead>Окончание</TableHead>
                <TableHead className='w-[300px]'>Описание</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className='text-right'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSemesters.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className='text-center py-10 text-muted-foreground'
                  >
                    Семестры не найдены
                  </TableCell>
                </TableRow>
              ) : (
                filteredSemesters.map((semester) => (
                  <SemesterItem
                    key={semester.id}
                    semester={semester}
                    handleEditSemester={handleEditSemester}
                    handleArchiveSemester={handleArchiveSemester}
                    handleDeleteSemester={handleDeleteSemester}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateSemesterDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        currentSemester={currentSemester}
      />
    </div>
  );
};

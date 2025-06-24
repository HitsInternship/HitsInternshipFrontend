import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PracticeFilters } from '../PracticeFilters';
import { StudentPractice } from '../StudentPractice';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { CommentDialog } from '@/features/CommentDialog';
import { usePractices } from '@/entities/Practice';
import { ROUTER_PATHS } from '@/shared/consts';
import { useGroups } from '@/entities/Groups';
import { useCompaniesList } from '@/entities/Company';

export const PracticeList = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: groups = [] } = useGroups();
  const { data: companies } = useCompaniesList();

  const [filters, setFilters] = useState<{
    groupId: string | undefined;
    companyId: string | undefined;
    hasMark: boolean | undefined;
  }>({
    groupId: undefined,
    companyId: undefined,
    hasMark: undefined,
  });

  const { data: practices } = usePractices(
    id!,
    filters.groupId,
    filters.companyId,
    filters.hasMark,
  );

  const [commentDialog, setCommentDialog] = useState({
    isOpen: false,
    id: '' as string | null,
    type: '' as 'diary' | 'characteristics',
    comment: '',
  });

  const onBack = () => {
    navigate(ROUTER_PATHS.PRACTICES);
  };

  return (
    <>
      <div className='flex items-center gap-4'>
        <Button variant='outline' onClick={onBack}>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Назад к практикам
        </Button>
        <div>
          <h1 className='text-3xl font-bold'>Студенты практики</h1>
        </div>
      </div>

      <PracticeFilters
        filters={filters}
        onChange={setFilters}
        groups={groups}
        companies={companies}
      />

      <Card>
        <CardHeader>
          <CardTitle>Список студентов</CardTitle>
          <CardDescription>
            Показано {practices && practices.length} практик студентов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ФИО</TableHead>
                  <TableHead>Оценка</TableHead>
                  <TableHead>Дневник практики</TableHead>
                  <TableHead>Характеристика</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {practices &&
                  practices.map((practice) => (
                    <StudentPractice
                      key={practice.id}
                      practice={practice}
                      setCommentDialog={setCommentDialog}
                    />
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <CommentDialog
        commentDialog={commentDialog}
        setCommentDialog={setCommentDialog}
      />
    </>
  );
};

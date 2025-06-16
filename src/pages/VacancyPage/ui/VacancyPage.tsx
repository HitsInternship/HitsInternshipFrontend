import { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Archive,
  Briefcase,
  Building,
  Edit,
  Trash2,
  Bell,
  Loader,
} from 'lucide-react';

import { StatusBadge } from './StatusBadge';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PageLayout,
} from '@/shared/ui';
import { useDeleteVacancy, useVacancyInfo } from '@/entities/Vacancy';
import { useStores } from '@/shared/contexts';
import { UserRole } from '@/entities/User/models';
import { DeleteConfirmationDialog } from '@/widgets/DeleteConfirmationDialog';
import { EditVacancyDialog } from '@/features/EditVacancyDialog';
import { useRespondVacancy } from '@/entities/VacancyResponse';

export const VacancyPage = (): ReactElement => {
  const { id } = useParams();
  const { data, status } = useVacancyInfo(id!);
  const { mutate } = useDeleteVacancy();
  const { mutate: respond } = useRespondVacancy(id!);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);

  const {
    userStore: { roles },
  } = useStores();

  const isArchived = data?.isClosed;

  const canControl =
    roles.includes(UserRole.Curator) || roles.includes(UserRole.DeanMember);
  const isStudent = roles.includes(UserRole.Student);

  const subTitle = (
    <div className='flex items-center gap-2 justify-center'>
      <Building className='h-4 w-4' />
      <span className='text-lg'>{data?.company.name}</span>
    </div>
  );

  const handleEditVacancy = () => {
    setIsEditDialogOpen(true);
    console.log(isEditDialogOpen);
  };
  const handleDeleteVacancy = () => {
    console.log('Удаление вакансии:', data?.id);
    mutate({ isArchive: false, id: id! });
  };

  const handleArchiveVacancy = () => {
    console.log('Архивация вакансии:', data?.id);
    mutate({ isArchive: true, id: id! });
  };
  const handleRespondVacancy = () => {
    respond(id!);
  };

  if (status === 'pending') {
    return (
      <PageLayout>
        <Loader className='mx-auto' />
      </PageLayout>
    );
  }
  return (
    <PageLayout title={data?.title} subTitle={subTitle}>
      <div className='lg:col-span-2 space-y-4'>
        {canControl && (
          <div className='flex flex-wrap gap-2'>
            <Button variant='outline' onClick={handleEditVacancy}>
              <Edit className='mr-2 h-4 w-4' />
              Редактировать
            </Button>
            {!isArchived && (
              <Button
                variant='secondary'
                onClick={() => setIsArchiveDialogOpen(true)}
              >
                <Archive className='mr-2 h-4 w-4' />
                Архивировать
              </Button>
            )}
            <Button
              variant='destructive'
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Удалить
            </Button>
          </div>
        )}
        {!data?.hasResponse && isStudent && (
          <Button variant='secondary' onClick={handleRespondVacancy}>
            <Bell className='mr-2 h-4 w-4' />
            Откликнуться
          </Button>
        )}
        <div className='flex items-center gap-2'>
          {data?.isDeleted && <StatusBadge status='deleted' />}
          {data?.isClosed && <StatusBadge status='closed' />}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Briefcase className='h-5 w-5' />
              Описание вакансии
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm leading-relaxed whitespace-pre-line'>
              {data?.description}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>О позиции</CardTitle>
            <CardDescription>{data?.position.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm leading-relaxed'>
              {data?.position.description}
            </p>
          </CardContent>
        </Card>
      </div>
      {data && (
        <EditVacancyDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          vacancy={data}
        />
      )}

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteVacancy}
        mainButtonName='Удалить'
        title='Удалить вакансию'
        description={`Вы уверены, что хотите удалить вакансию "${data?.title}"? Это действие нельзя отменить.`}
      />

      <DeleteConfirmationDialog
        open={isArchiveDialogOpen}
        onOpenChange={setIsArchiveDialogOpen}
        onConfirm={handleArchiveVacancy}
        mainButtonName='Архивировать'
        title='Архивировать вакансию'
        description={`Вы уверены, что хотите архивировать вакансию "${data?.title}"? Архивированные вакансии могут быть восстановлены позже.`}
      />
    </PageLayout>
  );
};

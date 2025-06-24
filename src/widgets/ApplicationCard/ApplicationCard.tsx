import {
  Briefcase,
  Building,
  Calendar,
  Mail,
  MessageCircle,
  Phone,
  Trash2,
  User,
} from 'lucide-react';
import { useState } from 'react';

import { CommentsModal } from '../CommentsModal/CommentsModal';
import { IApplicationCardProps } from './ApplicationCard.interfaces';
import { DeleteConfirmationDialog } from '../DeleteConfirmationDialog';

import { EApplicationStatus } from '@/entities/Application/models/types';
import { Badge, Button, Card, CardContent } from '@/shared/ui';
import { ApplicationModal } from '@/widgets/ApplicationModal';
import { Separator } from '@/shared/ui/separator';
import { useDeleteApplication } from '@/entities/Application';
import { useStores } from '@/shared/contexts';
import { UserRole } from '@/entities/User/models';

export const ApplicationCard = ({
  application,
  onSuccess,
}: IApplicationCardProps) => {
  const {
    userStore: { roles },
  } = useStores();
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { mutate: deleteApplication } = useDeleteApplication();

  const isStudent = roles.includes(UserRole.Student);

  const getStatusBadge = (status: EApplicationStatus) => {
    const statusConfig = {
      [EApplicationStatus.Created]: {
        label: 'Создана',
        variant: 'secondary' as const,
      },
      [EApplicationStatus.UnderConsideration]: {
        label: 'На рассмотрении',
        variant: 'default' as const,
      },
      [EApplicationStatus.Rejected]: {
        label: 'Отклонена',
        variant: 'destructive' as const,
      },
      [EApplicationStatus.Accepted]: {
        label: 'Принята',
        variant: 'default' as const,
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];

    return (
      <Badge
        variant={config?.variant || 'secondary'}
        className={
          config?.label === 'Принята'
            ? 'bg-green-100 text-green-800 hover:bg-green-200'
            : ''
        }
      >
        {config?.label || status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleCommentsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCommentsOpen(true);
  };
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    deleteApplication(application.id, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <>
      <Card
        key={application.id}
        className={application.isDeleted ? 'opacity-60 border-dashed' : ''}
        onClick={() => setIsModelOpen(true)}
      >
        <CardContent className='px-6'>
          <div className='flex items-start justify-between mb-4'>
            <div className='flex items-center gap-3'>
              {getStatusBadge(application.status)}
              {application.isDeleted && (
                <Badge variant='outline' className='text-muted-foreground'>
                  Архивная
                </Badge>
              )}
            </div>

            <div className='text-sm text-muted-foreground flex items-center gap-1'>
              <Calendar className='h-4 w-4' />
              {formatDate(application.date)}
            </div>
          </div>

          <div className='flex flex-col wrap sm:flex-row gap-6  justify-between'>
            {/* Информация о студенте */}

            <div className='space-y-3'>
              <div className='flex items-center gap-2 text-sm font-medium'>
                <User className='h-4 w-4' />
                Студент
              </div>
              <div className='space-y-2'>
                <div className='font-medium'>
                  {`${application.student.surname} ${application.student.name} ${application.student.middlename}`}
                  {application.student.isHeadMan && (
                    <Badge variant='outline' className='ml-2 text-xs'>
                      Староста
                    </Badge>
                  )}
                </div>
                <div className='text-sm text-muted-foreground space-y-1'>
                  <div className='flex items-center gap-1'>
                    <Mail className='h-3 w-3' />
                    {application.student.email}
                  </div>
                  <div className='flex items-center gap-1'>
                    <Phone className='h-3 w-3' />
                    {application.student.phone}
                  </div>
                  <div>
                    группа {application.student.groupNumber}, курс{' '}
                    {application.student.course}
                  </div>
                </div>
              </div>
            </div>

            {/* Информация о компании */}
            <div className='space-y-3'>
              <div className='flex items-center gap-2 text-sm font-medium'>
                <Building className='h-4 w-4' />
                Компания
              </div>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <span className='font-medium'>
                    {application.newCompany.name}
                  </span>
                </div>
                <p className='text-sm text-muted-foreground'>
                  {application.newCompany.description}
                </p>
              </div>
            </div>

            {/* Информация о позиции */}
            <div className='space-y-3'>
              <div className='flex items-center gap-2 text-sm font-medium'>
                <Briefcase className='h-4 w-4' />
                Позиция
              </div>
              <div className='space-y-2'>
                <div className='font-medium'>
                  {application.newPosition.name}
                </div>
                <p className='text-sm text-muted-foreground'>
                  {application.newPosition.description}
                </p>
              </div>
            </div>
          </div>
          <Separator className='my-3' />
          <div className='flex gap-5 items-start justify-between'>
            <div className='flex items-start gap-4'>
              <div className='text-sm font-medium'>Прошлое место:</div>
              <div>
                <p className='text-sm t font-medium'>
                  {application.oldCompany.name}
                </p>
                <p className='text-sm t'>{application.oldPosition.name}</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              {isStudent && (
                <Button
                  variant='ghost'
                  size='sm'
                  className=' px-2 hover:bg-blue-50'
                  data-comments-button
                  onClick={handleDeleteClick}
                >
                  <Trash2 className='mr-2 h-4 w-4' />
                </Button>
              )}
              <Button
                variant='ghost'
                size='sm'
                className=' px-2 hover:bg-blue-50'
                onClick={handleCommentsClick}
                data-comments-button
              >
                <MessageCircle className='h-10 w-10' />
                {application.commentsCount > 0 && (
                  <span className=' text-xs font-medium'>
                    {application.commentsCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <ApplicationModal
        applicationId={application.id}
        isOpen={isModalOpen}
        onClose={() => setIsModelOpen(false)}
        onSuccess={onSuccess}
      />
      <CommentsModal
        applicationId={application.id}
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
      />
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        mainButtonName='Удалить'
        title='Удалить заявку'
        description={`Вы уверены, что хотите удалить заявку в компанию "${application.newCompany.name}"? Это действие нельзя отменить.`}
      />
    </>
  );
};

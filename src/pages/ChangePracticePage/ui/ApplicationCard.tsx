import { Briefcase, Building, Calendar, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';

import { IApplication } from '@/entities/Application';
import { EApplicationStatus } from '@/entities/Application/models/types';
import { Badge, Card, CardContent } from '@/shared/ui';
import { ApplicationModal } from '@/widgets/ApplicationModal';

export const ApplicationCard = (application: IApplication) => {
  const [isModalOpen, setIsModelOpen] = useState(false);
  const getStatusBadge = (status: EApplicationStatus) => {
    const statusConfig: Record<EApplicationStatus, any> = {
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
      [EApplicationStatus.null]: undefined,
    };

    const config = statusConfig[status];

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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Card
        key={application.id}
        className={application.isDeleted ? 'opacity-60 border-dashed' : ''}
        onClick={() => setIsModelOpen(true)}
      >
        <CardContent className='p-6'>
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

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
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
                    Группа {application.student.groupNumber},{' '}
                    {application.student.course} курс
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
                    {application.company.name}
                  </span>
                </div>
                <p className='text-sm text-muted-foreground'>
                  {application.company.description}
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
                <div className='font-medium'>{application.position.name}</div>
                <p className='text-sm text-muted-foreground'>
                  {application.position.description}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <ApplicationModal
        applicationId={application.id}
        isOpen={isModalOpen}
        onClose={() => setIsModelOpen(false)}
      />
    </>
  );
};

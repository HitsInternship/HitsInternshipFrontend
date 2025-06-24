import { useState, useEffect } from 'react';
import {
  Calendar,
  Mail,
  Phone,
  Download,
  FileText,
  User,
  Building,
  Briefcase,
} from 'lucide-react';
import toast from 'react-hot-toast';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  Label,
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Input,
} from '@/shared/ui';
import {
  IApplicationDetails,
  useApplicationFile,
  useApplicationInfo,
  useSendApplicationFile,
} from '@/entities/Application';
import { EApplicationStatus } from '@/entities/Application/models/types';
import { Separator } from '@/shared/ui/separator';
import { UserRole } from '@/entities/User/models';
import { useStores } from '@/shared/contexts';

interface ApplicationModalProps {
  applicationId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationModal = ({
  applicationId,
  isOpen,
  onClose,
}: ApplicationModalProps) => {
  const [applicationDetail, setApplicationDetail] =
    useState<IApplicationDetails | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [fileLink, setFileLink] = useState<string | null>(null);

  const {
    userStore: { roles },
  } = useStores();

  const isDeanMember = roles.includes(UserRole.DeanMember);
  const isStudent = roles.includes(UserRole.Student);

  const { mutate } = useApplicationInfo();
  const { mutate: fileMutate } = useApplicationFile();
  const { mutate: sendFileMutate } = useSendApplicationFile();

  const sendFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      sendFileMutate(
        { file, id: applicationId },
        {
          onSuccess: fetchData,
        },
      );
    }
  };

  const fetchData = async () => {
    setDetailLoading(true);

    mutate(applicationId, {
      onSuccess: (result) => {
        setApplicationDetail(result);
        setDetailLoading(false);
      },
      onError: () => {
        toast.error('Ошибка загрузки заявки');
        setDetailLoading(false);
      },
    });

    fileMutate(applicationId, {
      onSuccess: (result) => {
        setFileLink(result);
      },
      onError: () => {
        toast.error('Ошибка загрузки файла');
      },
    });
  };

  // Функция для обновления статуса заявки
  const updateApplicationStatus = async (newStatus: string) => {
    setStatusUpdating(true);
    // Здесь будет реальный API запрос
    // const response = await fetch(`/api/applications/${applicationId}/status`, {
    //   method: 'PATCH',
    //   body: JSON.stringify({ status: newStatus })
    // })

    // Имитация загрузки
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (applicationDetail) {
      setApplicationDetail({
        ...applicationDetail,

        status: newStatus as unknown as EApplicationStatus,
      });
    }

    setStatusUpdating(false);
    // Вызываем callback для обновления списка заявок
    // if (onStatusUpdate) {
    //   onStatusUpdate();
    // }
  };

  // Функции для получения бейджей статусов
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

  const getStudentStatusBadge = (status: string) => {
    const statusConfig = {
      Expelled: {
        label: 'Отчислен',
        variant: 'destructive' as const,
        className: '',
      },
      OnAcademicLeave: {
        label: 'Академический отпуск',
        variant: 'secondary' as const,
        className: '',
      },
      InProcess: {
        label: 'Обучается',
        variant: 'default' as const,
        className: 'bg-green-100 text-green-800 hover:bg-green-200',
      },
      Transferred: {
        label: 'Переведен',
        variant: 'secondary' as const,
        className: '',
      },
      Graduated: {
        label: 'Выпускник',
        variant: 'default' as const,
        className: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge
        variant={config?.variant || 'secondary'}
        className={config?.className}
      >
        {config?.label || status}
      </Badge>
    );
  };

  const getInternshipStatusBadge = (status: string) => {
    const statusConfig = {
      Small: {
        label: 'Не достиг 2 курса',
        variant: 'secondary' as const,
        className: '',
      },
      Candidate: {
        label: 'В поиске',
        variant: 'default' as const,
        className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      },
      Internship: {
        label: 'Проходит практику',
        variant: 'default' as const,
        className: 'bg-green-100 text-green-800 hover:bg-green-200',
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config?.variant || 'secondary'}>
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

  useEffect(() => {
    if (isOpen && applicationId) {
      fetchData();
    } else {
      setApplicationDetail(null);
    }
  }, [isOpen, applicationId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center justify-between'>
            <span>Детальная информация о заявке</span>
          </DialogTitle>
        </DialogHeader>

        {detailLoading ? (
          <div className='flex items-center justify-center py-8'>
            <div className='w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin' />
            <span className='ml-2'>Загрузка...</span>
          </div>
        ) : applicationDetail ? (
          <div className='space-y-6'>
            {/* Статус и дата */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                {getStatusBadge(applicationDetail.status)}
                <div className='text-sm text-muted-foreground flex items-center gap-1'>
                  <Calendar className='h-4 w-4' />
                  {formatDate(applicationDetail.date)}
                </div>
              </div>
            </div>
            {isDeanMember && (
              <div className='flex items-center gap-2 '>
                <Label htmlFor='status-select' className='text-sm font-medium'>
                  Изменить статус:
                </Label>
                <Select
                  value={applicationDetail.status.toString()}
                  onValueChange={updateApplicationStatus}
                  disabled={statusUpdating}
                >
                  <SelectTrigger className='w-48'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Created'>Создана</SelectItem>
                    <SelectItem value='UnderConsideration'>
                      На рассмотрении
                    </SelectItem>
                    <SelectItem value='Rejected'>Отклонена</SelectItem>
                    <SelectItem value='Accepted'>Принята</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Описание заявки */}
            <div className='space-y-2'>
              <Label className='text-sm font-medium'>Описание заявки</Label>
              <Textarea
                value={applicationDetail.description}
                readOnly
                className='min-h-[100px] resize-none'
              />
            </div>

            {/* Документ */}
            {fileLink ? (
              <div className='space-y-2'>
                <Label className='text-sm font-medium'>
                  Прикрепленный документ
                </Label>
                <div className='flex items-center gap-2 p-3 border rounded-lg'>
                  <FileText className='h-5 w-5 text-muted-foreground' />
                  <span className='flex-1 text-sm'>Документ заявки</span>
                  <Button variant='outline' size='sm' asChild>
                    <a
                      href={fileLink}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Download className='h-4 w-4 mr-2' />
                      Скачать
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className='space-y-2'>
                <Label htmlFor='document' className='text-sm font-medium'>
                  Документ заявки <span className='text-red-500'>*</span>
                </Label>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2 '>
                    <Input
                      id='document'
                      type='file'
                      accept='.pdf,.doc,.docx,.txt'
                      onChange={sendFile}
                      className='w-full file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80'
                    />
                  </div>
                </div>
              </div>
            )}

            <div className='grid grid-cols-1 gap-6'>
              {/* Подробная информация о студенте */}
              <div className='space-y-3'>
                <div className='flex items-center gap-2 text-sm font-medium'>
                  <User className='h-4 w-4' />
                  Информация о студенте
                </div>
                <div className='space-y-3'>
                  <div>
                    <div className='font-medium'>
                      {`${applicationDetail.student.surname} ${applicationDetail.student.name} ${applicationDetail.student.middlename}`}
                    </div>
                    <div className='flex flex-row  gap-2 mt-1'>
                      {applicationDetail.student.isHeadMan && (
                        <Badge variant='outline' className='text-xs'>
                          Староста
                        </Badge>
                      )}
                      {getStudentStatusBadge(applicationDetail.student.status)}
                      {getInternshipStatusBadge(
                        applicationDetail.student.internshipStatus,
                      )}
                    </div>
                  </div>
                  <div className='text-sm text-muted-foreground space-y-2'>
                    <div className='flex items-center gap-1'>
                      <Mail className='h-3 w-3' />
                      {applicationDetail.student.email}
                    </div>
                    <div className='flex items-center gap-1'>
                      <Phone className='h-3 w-3' />
                      {applicationDetail.student.phone}
                    </div>
                    <div>
                      <strong>Группа:</strong>{' '}
                      {applicationDetail.student.groupNumber}
                    </div>
                    <div>
                      <strong>Курс:</strong> {applicationDetail.student.course}
                    </div>
                  </div>
                </div>
              </div>

              {/* Подробная информация о компании */}
              <div className='space-y-3'>
                <div className='flex items-center gap-2 text-sm font-medium'>
                  <Building className='h-4 w-4' />
                  Информация о компании
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium'>
                      {applicationDetail.newCompany.name}
                    </span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {applicationDetail.newCompany.description}
                  </p>
                </div>
              </div>

              {/* Подробная информация о позиции */}
              <div className='space-y-3'>
                <div className='flex items-center gap-2 text-sm font-medium'>
                  <Briefcase className='h-4 w-4' />
                  Информация о позиции
                </div>
                <div className='space-y-2'>
                  <div className='font-medium'>
                    {applicationDetail.newPosition.name}
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {applicationDetail.newPosition.description}
                  </p>
                </div>
              </div>
            </div>
            <Separator />
            <div className='flex gap-5 items-start'>
              <div className='flex items-center gap-2 text-sm font-medium'>
                Прошлое место:
              </div>
              <div>
                <p className='text-sm t font-medium'>
                  {applicationDetail.oldCompany.name}
                </p>
                <p className='text-sm t'>
                  {applicationDetail.oldPosition.name}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center py-8'>
            <div className='text-muted-foreground'>Заявка не найдена</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

import {
  ArrowLeft,
  Briefcase,
  Building,
  Calendar,
  Mail,
  Phone,
  User,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import {
  SelectionStatus,
  SelectionVacancyStatus,
} from '@/entities/Selection/models/types.ts';
import { useMySelection } from '@/entities/Selection/hooks/useMySelection.ts';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/shared/ui';
import { useChangeVacancyResponseStatus } from '@/entities/VacancyResponse/hooks/useChangeVRStatus.ts';

const getResponseStatusLabel = (status: SelectionVacancyStatus) => {
  switch (status) {
    case SelectionVacancyStatus.Responding:
      return 'Жду ответа';
    case SelectionVacancyStatus.Rejected:
      return 'Отказ';
    case SelectionVacancyStatus.GotOffer:
      return 'Получил оффер';
    case SelectionVacancyStatus.Interview:
      return 'Собеседование';
    case SelectionVacancyStatus.OfferAccepted:
      return 'Оффер принят';
    default:
      return status;
  }
};

const getSelectionStatusLabel = (status: SelectionStatus) => {
  switch (status) {
    case SelectionStatus.InProgress:
      return 'В процессе';
    case SelectionStatus.OfferAccepted:
      return 'Оффер принят';
    case SelectionStatus.Inactive:
      return 'Неактивный';
    default:
      return status;
  }
};

const getSelectionStatusVariant = (status: SelectionStatus) => {
  switch (status) {
    case SelectionStatus.InProgress:
      return 'default';
    case SelectionStatus.OfferAccepted:
      return 'secondary';
    case SelectionStatus.Inactive:
      return 'outline';
    default:
      return 'secondary';
  }
};

export const SelectionDetailsPage = () => {
  const navigate = useNavigate();
  const { data: selection, isLoading } = useMySelection();
  const queryClient = useQueryClient();
  const { mutate } = useChangeVacancyResponseStatus({
    onSuccess: () => {
      toast.success('Статус обновлен успешно');
      queryClient.invalidateQueries({ queryKey: ['my-selection'] });
    },
    onError: () => {
      toast.error('Произошла ошибка');
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getFullName = () => {
    if (selection) {
      return `${selection.candidate.surname} ${selection.candidate.name} ${selection.candidate.middlename}`.trim();
    }
  };

  const onStatusChange = (status: SelectionVacancyStatus, id: string) => {
    mutate({ params: { status: status, id: id } });
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[90vh] w-[100vw]'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-green-600' />
        <span className='ml-3 text-muted-foreground'>Загрузка отбора...</span>
      </div>
    );
  }

  return (
    !!selection && (
      <div className='min-h-screen bg-gray-50'>
        <div className='container mx-auto p-6 max-w-4xl'>
          {/* Header */}
          <div className='flex items-center gap-4 mb-6'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => navigate(-1)}
              className='flex items-center gap-2'
            >
              <ArrowLeft className='h-4 w-4' />
              Назад
            </Button>
            <div className='flex-1'>
              <h1 className='text-3xl font-bold text-gray-900'>
                Детали отбора
              </h1>
              <p className='text-gray-600 mt-1'>
                Подробная информация об отборе студента
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Левая колонка - Основная информация */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Информация о студенте */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <User className='h-5 w-5' />
                    Информация о студенте
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-3'>
                      <div>
                        <p className='text-sm font-medium text-gray-500 mb-1'>
                          Полное имя
                        </p>
                        <p className='text-lg font-semibold'>{getFullName()}</p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500 mb-1'>
                          Группа
                        </p>
                        <Badge variant='outline' className='text-sm'>
                          Группа {selection.candidate.groupNumber}
                        </Badge>
                      </div>
                    </div>
                    <div className='space-y-3'>
                      <div className='flex items-center gap-2'>
                        <Mail className='h-4 w-4 text-gray-500' />
                        <div>
                          <p className='text-sm font-medium text-gray-500'>
                            Email
                          </p>
                          <a
                            href={`mailto:${selection.candidate.email}`}
                            className='text-blue-600 hover:underline'
                          >
                            {selection.candidate.email}
                          </a>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Phone className='h-4 w-4 text-gray-500' />
                        <div>
                          <p className='text-sm font-medium text-gray-500'>
                            Телефон
                          </p>
                          <a
                            href={`tel:${selection.candidate.phone}`}
                            className='text-blue-600 hover:underline'
                          >
                            {selection.candidate.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Отклики или Оффер */}
              {selection.isConfirmed ? (
                /* Подтвержденный оффер */
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Briefcase className='h-5 w-5' />
                      Подтвержденный оффер
                      <Badge
                        variant='default'
                        className='bg-green-500 hover:bg-green-600'
                      >
                        Подтвержден
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='bg-green-50 border border-green-200 rounded-lg p-6'>
                      <div className='flex items-start gap-4'>
                        <Building className='h-8 w-8 text-green-600 mt-1' />
                        <div className='flex-1'>
                          <h3 className='text-xl font-semibold text-green-900 mb-2'>
                            {selection.offer?.companyName ?? 'не определено'}
                          </h3>
                          <p className='text-green-700 text-lg'>
                            {selection.offer?.position ?? 'не определено'}
                          </p>
                          <p className='text-green-600 text-sm mt-2'>
                            Студент успешно получил и подтвердил данный оффер
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                /* Отклики на вакансии */
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Briefcase className='h-5 w-5' />
                      Отклики на вакансии
                      <Badge variant='secondary'>
                        {selection.responses?.length ?? 0} откликов
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selection.responses && selection.responses.length > 0 ? (
                      <div className='space-y-4'>
                        {selection.responses.map((response, index) => (
                          <div key={response.id}>
                            <div className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors'>
                              <div className='flex items-center gap-4'>
                                <Building className='h-8 w-8 text-gray-400' />
                                <div>
                                  <h4 className='font-semibold text-lg'>
                                    {response.company.name}
                                  </h4>
                                  <p className='text-gray-600'>
                                    {response.position}
                                  </p>
                                </div>
                              </div>

                              <Select
                                value={response.status}
                                onValueChange={(value) => {
                                  onStatusChange(
                                    value as SelectionVacancyStatus,
                                    response.id,
                                  );
                                }}
                              >
                                <SelectTrigger>
                                  {' '}
                                  {getResponseStatusLabel(response.status)}
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem
                                    value={SelectionVacancyStatus.Responding}
                                  >
                                    {getResponseStatusLabel(
                                      SelectionVacancyStatus.Responding,
                                    )}
                                  </SelectItem>
                                  <SelectItem
                                    value={SelectionVacancyStatus.Interview}
                                  >
                                    {getResponseStatusLabel(
                                      SelectionVacancyStatus.Interview,
                                    )}
                                  </SelectItem>
                                  <SelectItem
                                    value={SelectionVacancyStatus.GotOffer}
                                  >
                                    {getResponseStatusLabel(
                                      SelectionVacancyStatus.GotOffer,
                                    )}
                                  </SelectItem>
                                  <SelectItem
                                    value={SelectionVacancyStatus.Rejected}
                                  >
                                    {getResponseStatusLabel(
                                      SelectionVacancyStatus.Rejected,
                                    )}
                                  </SelectItem>
                                  <SelectItem
                                    value={SelectionVacancyStatus.OfferAccepted}
                                  >
                                    {getResponseStatusLabel(
                                      SelectionVacancyStatus.OfferAccepted,
                                    )}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {index < selection.responses.length - 1 && (
                              <Separator className='my-2' />
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='text-center py-8'>
                        <Briefcase className='h-12 w-12 text-gray-300 mx-auto mb-4' />
                        <p className='text-gray-500'>
                          Нет откликов на вакансии
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Правая колонка - Статус и детали */}
            <div className='space-y-6'>
              {/* Статус отбора */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Статус отбора</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='text-center'>
                    <Badge
                      variant={getSelectionStatusVariant(
                        selection.selectionStatus,
                      )}
                      className='text-lg px-4 py-2'
                    >
                      {getSelectionStatusLabel(selection.selectionStatus)}
                    </Badge>
                  </div>
                  <Separator />
                  <div className='space-y-3'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='h-4 w-4 text-gray-500' />
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Дедлайн
                        </p>
                        <p className='font-medium'>
                          {formatDate(selection.deadLine)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-500 mb-1'>
                        Подтверждение
                      </p>
                      <Badge
                        variant={
                          selection.isConfirmed ? 'default' : 'secondary'
                        }
                      >
                        {selection.isConfirmed
                          ? 'Подтвержден'
                          : 'Не подтвержден'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

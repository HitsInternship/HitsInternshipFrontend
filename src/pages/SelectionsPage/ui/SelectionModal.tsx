import { Info } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import {
  SelectionStatus,
  SelectionVacancyStatus,
} from '@/entities/Selection/models/types.ts';
import { useSelection } from '@/entities/Selection/hooks/useSelection.ts';

interface SelectionModalProps {
  selectionId: string;
}

const getResponseStatusLabel = (status: SelectionVacancyStatus) => {
  switch (status) {
    case SelectionVacancyStatus.Responding:
      return 'Отвечает';
    case SelectionVacancyStatus.Rejected:
      return 'Отклонен';
    case SelectionVacancyStatus.GotOffer:
      return 'Получил оффер';
    case SelectionVacancyStatus.Interview:
      return 'Собеседование';
    default:
      return status;
  }
};

const getResponseStatusVariant = (status: SelectionVacancyStatus) => {
  switch (status) {
    case SelectionVacancyStatus.Responding:
      return 'secondary';
    case SelectionVacancyStatus.Rejected:
      return 'destructive';
    case SelectionVacancyStatus.GotOffer:
      return 'default';
    case SelectionVacancyStatus.Interview:
      return 'outline';
    default:
      return 'secondary';
  }
};

export const SelectionModal = ({ selectionId }: SelectionModalProps) => {
  const { data: selection, isLoading } = useSelection(selectionId);

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

  return (
    selection && (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
            <Info className='h-4 w-4' />
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Информация об отборе</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className='flex items-center justify-center h-40'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-green-600' />
              <span className='ml-3 text-muted-foreground'>
                Загрузка отбора...
              </span>
            </div>
          ) : (
            <div className='space-y-6'>
              {/* Информация о студенте */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Студент</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-sm font-medium text-gray-500'>ФИО</p>
                      <p className='text-sm'>{getFullName()}</p>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-500'>
                        Группа
                      </p>
                      <p className='text-sm'>
                        {selection.candidate.groupNumber}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-500'>Email</p>
                      <p className='text-sm'>{selection.candidate.email}</p>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-500'>
                        Телефон
                      </p>
                      <p className='text-sm'>{selection.candidate.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Общая информация об отборе */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Отбор</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-sm font-medium text-gray-500'>
                        Дедлайн
                      </p>
                      <p className='text-sm'>
                        {formatDate(selection.deadLine)}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-500'>
                        Статус
                      </p>
                      <Badge variant='secondary'>
                        {selection.selectionStatus ===
                          SelectionStatus.InProgress && 'Активный'}
                        {selection.selectionStatus ===
                          SelectionStatus.OfferAccepted && 'Оффер'}
                        {selection.selectionStatus ===
                          SelectionStatus.Inactive && 'Неактивный'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Условное отображение: Оффер или Отклики */}
              {selection.isConfirmed ? (
                /* Отображаем оффер если подтвержден */
                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg flex items-center gap-2'>
                      Подтвержденный оффер
                      <Badge variant='default' className='bg-green-500'>
                        Подтвержден
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Компания
                        </p>
                        <p className='text-sm font-medium'>
                          {selection.offer?.companyName ?? 'не определено'}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Должность
                        </p>
                        <p className='text-sm'>
                          {selection.offer?.position ?? 'не определено'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                /* Отображаем все отклики если не подтвержден */
                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>
                      Отклики на вакансии
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selection.responses && selection.responses.length > 0 ? (
                      <div className='space-y-4'>
                        {selection.responses.map((response, index) => (
                          <div key={response.id}>
                            <div className='flex items-center justify-between p-4 border rounded-lg'>
                              <div className='space-y-1'>
                                <p className='font-medium'>
                                  {response.company.name}
                                </p>
                                <p className='text-sm text-gray-600'>
                                  {response.position}
                                </p>
                              </div>
                              <Badge
                                variant={getResponseStatusVariant(
                                  response.status,
                                )}
                              >
                                {getResponseStatusLabel(response.status)}
                              </Badge>
                            </div>
                            {index < selection.responses.length - 1 && (
                              <Separator className='my-2' />
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className='text-sm text-gray-500 text-center py-4'>
                        Нет откликов на вакансии
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    )
  );
};

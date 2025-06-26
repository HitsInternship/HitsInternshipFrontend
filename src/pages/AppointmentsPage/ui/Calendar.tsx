'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addWeeks,
  addMonths,
  subWeeks,
  subMonths,
  subDays,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';

import { timePeriods } from './data.ts';
import { CreateTimeslotModal } from './CreateTimeslotModal';

import {
  Badge,
  Button,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { BookAppointmentModal } from '@/pages/AppointmentsPage/ui/BookAppointmentModal.tsx';
import { UserRole } from '@/entities/User/models';
import { useStores } from '@/shared/contexts';
import { useCalendar } from '@/entities/Appointment/hooks';

type ViewMode = 'day' | 'week' | 'month';

export const AppointmentsCalendar = observer(() => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    slotId: string;
    periodNumber: number;
    date: string;
  }>({
    isOpen: false,
    slotId: '',
    periodNumber: 0,
    date: '',
  });

  const {
    userStore: { roles },
  } = useStores();

  const { isDean, isCurator } = useMemo(() => {
    const isDean = roles.includes(UserRole.DeanMember) && roles.length === 1;
    const isStudent = roles.includes(UserRole.Student) && roles.length === 1;
    const isCurator = roles.includes(UserRole.Curator) && roles.length === 1;
    const isAdmin = !isDean && !isStudent && !isCurator;
    return { isDean, isStudent, isCurator, isAdmin };
  }, [roles]);

  const formatDateKey = (date: Date) => {
    return format(date, 'dd.MM.yyyy');
  };

  const parseTimeToMinutes = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const isPastSlot = (date: Date, timeString: string) => {
    const now = new Date();
    const slotDate = new Date(date);
    const slotMinutes = parseTimeToMinutes(timeString);

    // Set the slot time
    slotDate.setHours(Math.floor(slotMinutes / 60), slotMinutes % 60, 0, 0);

    return slotDate < now;
  };

  const isCurrentSlot = (date: Date, timeString: string) => {
    const now = new Date();
    const slotDate = new Date(date);
    const slotMinutes = parseTimeToMinutes(timeString);

    // Set the slot time (assuming each slot is 1 hour 50 minutes long)
    const slotStart = new Date(slotDate);
    slotStart.setHours(Math.floor(slotMinutes / 60), slotMinutes % 60, 0, 0);

    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + 110); // 1 hour 50 minutes

    return now >= slotStart && now <= slotEnd;
  };

  // Функция для получения начала дня в UTC+7
  const getStartOfDayUTC7 = (date: Date) => {
    const startDay = startOfDay(date);
    // Конвертируем в UTC+7: добавляем 7 часов к UTC времени
    return new Date(startDay.getTime() + 7 * 60 * 60 * 1000);
  };

  // Функция для получения конца дня в UTC+7 (23:59:59.999)
  const getEndOfDayUTC7 = (date: Date) => {
    const endDay = endOfDay(date);
    // Конвертируем в UTC+7: добавляем 7 часов к UTC времени
    return new Date(endDay.getTime() + 7 * 60 * 60 * 1000);
  };

  const getDateRange = () => {
    const addUTC7Hours = (date: Date) =>
      new Date(date.getTime() + 7 * 60 * 60 * 1000);

    switch (viewMode) {
      case 'day':
        return [addUTC7Hours(currentDate)];
      case 'week':
        return eachDayOfInterval({
          start: addUTC7Hours(startOfWeek(currentDate, { weekStartsOn: 1 })),
          end: addUTC7Hours(
            subDays(endOfWeek(currentDate, { weekStartsOn: 1 }), 1),
          ), // Убираем воскресенье
        });
      case 'month':
        return eachDayOfInterval({
          start: addUTC7Hours(startOfMonth(currentDate)),
          end: addUTC7Hours(endOfMonth(currentDate)),
        });
      default:
        return [addUTC7Hours(currentDate)];
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    switch (viewMode) {
      case 'day':
        setCurrentDate(
          direction === 'next'
            ? addDays(currentDate, 1)
            : subDays(currentDate, 1),
        );
        break;
      case 'week':
        setCurrentDate(
          direction === 'next'
            ? addWeeks(currentDate, 1)
            : subWeeks(currentDate, 1),
        );
        break;
      case 'month':
        setCurrentDate(
          direction === 'next'
            ? addMonths(currentDate, 1)
            : subMonths(currentDate, 1),
        );
        break;
    }
  };

  const getViewTitle = () => {
    switch (viewMode) {
      case 'day':
        return format(currentDate, 'EEEE, d MMMM yyyy', { locale: ru });
      case 'week':
        return `${format(
          startOfWeek(currentDate, { weekStartsOn: 1 }),
          'd MMM',
          {
            locale: ru,
          },
        )} - ${format(subDays(endOfWeek(currentDate, { weekStartsOn: 1 }), 1), 'd MMM yyyy', { locale: ru })}`;
      case 'month':
        return format(currentDate, 'LLLL yyyy', { locale: ru });
      default:
        return '';
    }
  };

  const dateRange = getDateRange();
  const startDate = getStartOfDayUTC7(dateRange[0]).toISOString();
  const endDate = getEndOfDayUTC7(
    dateRange[dateRange.length - 1],
  ).toISOString();

  const {
    data: calendarData,
    isLoading,
    error,
  } = useCalendar({
    startDate,
    endDate,
  });

  const handleSlotClick = (date: Date, periodNumber: number) => {
    const dateKey = formatDateKey(date);
    const dayData = calendarData?.[dateKey];
    const slotData = dayData?.[periodNumber.toString()];

    const period = timePeriods.find((p) => p.number === periodNumber);
    if (!period) return;

    const isPastSlotValue = isPastSlot(date, period.time);

    // If slot is free (string slotId) and user is curator and slot is not in the past, allow booking
    if (isCurator && typeof slotData === 'string' && !isPastSlotValue) {
      setBookingModal({
        isOpen: true,
        slotId: slotData, // Use the actual slotId from API
        periodNumber: periodNumber,
        date: dateKey,
      });
    }
  };

  const renderTimeSlot = (date: Date, period: (typeof timePeriods)[0]) => {
    const dateKey = formatDateKey(date);
    const dayData = calendarData?.[dateKey];
    const slotData = dayData?.[period.number.toString()];

    // Determine slot type
    const isAppointment = typeof slotData === 'object';
    const isFreeSlot = typeof slotData === 'string';
    const appointmentDetails = isAppointment ? slotData : null;
    const hasSlot = !!slotData;

    const isPastSlotValue = isPastSlot(date, period.time);
    const isCurrentSlotValue = isCurrentSlot(date, period.time);

    return (
      <div
        key={`${dateKey}-${period.number}`}
        className={`
    p-3 border rounded-lg min-h-[100px] transition-colors cursor-pointer relative
    ${
      isCurrentSlotValue
        ? 'bg-yellow-100 border-yellow-400 ring-2 ring-yellow-300' // Current slot highlighting
        : isAppointment
          ? isPastSlotValue
            ? 'bg-blue-100 border-blue-300 opacity-60' // Past appointment
            : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
          : isFreeSlot
            ? isPastSlotValue
              ? 'bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed' // Past free slot
              : 'bg-green-50 border-green-200 hover:bg-green-100'
            : 'bg-gray-50 border-gray-300' // Empty slot styling
    }
    ${isCurator && isFreeSlot && !isPastSlotValue ? 'hover:border-green-300' : ''}
    ${isPastSlotValue && !isCurrentSlotValue ? 'striped-background' : ''} // Add striped class for past slots
  `}
        onClick={() =>
          !isPastSlotValue && hasSlot && handleSlotClick(date, period.number)
        }
      >
        {/* Striped overlay for past slots */}
        {isPastSlotValue && !isCurrentSlotValue && (
          <div
            className='absolute inset-0 opacity-30 pointer-events-none'
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 10px)',
            }}
          />
        )}

        <div className='flex items-center justify-between mb-2 relative z-10'>
          <span
            className={`text-sm font-medium ${isCurrentSlotValue ? 'text-yellow-800' : 'text-gray-700'}`}
          >
            {period.time}
          </span>
          {isCurrentSlotValue && (
            <Badge
              variant='default'
              className='text-xs bg-yellow-500 text-white'
            >
              Сейчас
            </Badge>
          )}
          {isAppointment && !isCurrentSlotValue && (
            <Badge variant='secondary' className='text-xs'>
              {isPastSlotValue ? 'Прошло' : 'Занято'}
            </Badge>
          )}
          {isFreeSlot && !isCurrentSlotValue && (
            <Badge
              variant='outline'
              className={`text-xs ${isPastSlotValue ? 'text-gray-400' : 'text-green-600'}`}
            >
              {isPastSlotValue ? 'Прошло' : 'Свободно'}
            </Badge>
          )}
          {!hasSlot && (
            <Badge variant='outline' className='text-xs text-gray-400'>
              Нет слота
            </Badge>
          )}
        </div>

        {appointmentDetails && (
          <div className='space-y-1 relative z-10'>
            <p
              className={`text-sm font-semibold truncate ${isCurrentSlotValue ? 'text-yellow-900' : 'text-blue-900'}`}
            >
              {appointmentDetails.companyName}
            </p>
            <p
              className={`text-xs line-clamp-3 ${isCurrentSlotValue ? 'text-yellow-700' : 'text-gray-600'}`}
            >
              {appointmentDetails.description}
            </p>
          </div>
        )}

        {isFreeSlot && !isPastSlotValue && isCurator && (
          <div className='flex items-center justify-center h-full text-gray-400 relative z-10'>
            <Plus className='h-5 w-5' />
          </div>
        )}

        {!hasSlot && (
          <div className='flex items-center justify-center h-full text-gray-300 relative z-10'>
            <span className='text-xs'>Слот не создан</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='w-full max-w-none space-y-6'>
      {/* Заголовок и управление */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <h1 className='text-3xl font-bold'>Встречи</h1>
          {isDean && <CreateTimeslotModal />}
        </div>

        <div className='flex items-center gap-4'>
          <Select
            value={viewMode}
            onValueChange={(value: ViewMode) => setViewMode(value)}
          >
            <SelectTrigger className='w-32'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='day'>День</SelectItem>
              <SelectItem value='week'>Неделя</SelectItem>
              <SelectItem value='month'>Месяц</SelectItem>
            </SelectContent>
          </Select>

          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => navigateDate('prev')}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentDate(new Date())}
            >
              Сегодня
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => navigateDate('next')}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>

      {/* Заголовок периода */}
      <div className='text-center'>
        <h2 className='text-xl font-semibold capitalize'>{getViewTitle()}</h2>
      </div>

      {/* Календарь */}
      {isLoading && (
        <div className='flex justify-center items-center h-[90vh] w-[100vw]'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-green-600' />
          <span className='ml-3 text-muted-foreground'>
            Загрузка календаря...
          </span>
        </div>
      )}

      {error && (
        <div className='flex justify-center items-center h-64'>
          <div className='text-lg text-red-600'>Ошибка загрузки календаря</div>
        </div>
      )}

      {!isLoading && !error && (
        <Card className='w-full'>
          <CardContent className='p-6'>
            <div
              className={`grid gap-4 w-full ${
                viewMode === 'day'
                  ? 'grid-cols-1 max-w-md mx-auto'
                  : viewMode === 'week'
                    ? 'grid-cols-7'
                    : 'grid-cols-7'
              }`}
            >
              {dateRange.map((date) => (
                <div key={date.toISOString()} className='space-y-3 min-w-0'>
                  <div className='text-center p-3 border-b bg-gray-50 rounded-t-lg'>
                    <div className='text-sm font-medium text-gray-600'>
                      {format(date, 'EEE', { locale: ru })
                        .replace('пн.', 'пн')
                        .replace('вт.', 'вт')
                        .replace('ср.', 'ср')
                        .replace('чт.', 'чт')
                        .replace('пт.', 'пт')
                        .replace('сб.', 'сб')
                        .replace('вс.', 'вс')}
                    </div>
                    <div
                      className={`text-xl font-bold ${isSameDay(date, new Date()) ? 'text-blue-600' : 'text-gray-900'}`}
                    >
                      {format(date, 'd')}
                    </div>
                    {viewMode !== 'day' && (
                      <div className='text-xs text-gray-500'>
                        {format(date, 'MMM', { locale: ru })}
                      </div>
                    )}
                  </div>

                  <div className='space-y-3 px-1'>
                    {timePeriods.map((period) => renderTimeSlot(date, period))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Модальное окно бронирования */}
      {isCurator && (
        <BookAppointmentModal
          isOpen={bookingModal.isOpen}
          onClose={() =>
            setBookingModal({
              isOpen: false,
              slotId: '',
              periodNumber: 0,
              date: '',
            })
          }
          timeslotId={bookingModal.slotId}
          periodNumber={bookingModal.periodNumber}
          date={bookingModal.date}
        />
      )}
    </div>
  );
});

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
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';

import {
  mockAppointmentDetails,
  mockTimeSlots,
  timePeriods,
} from './mockAppointments';
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

type ViewMode = 'day' | 'week' | 'month';

export const AppointmentsCalendar = observer(() => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    date: string;
    periodNumber: number;
  }>({
    isOpen: false,
    date: '',
    periodNumber: 0,
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

  const getDateRange = () => {
    switch (viewMode) {
      case 'day':
        return [currentDate];
      case 'week':
        return eachDayOfInterval({
          start: startOfWeek(currentDate, { weekStartsOn: 1 }),
          end: endOfWeek(currentDate, { weekStartsOn: 1 }),
        });
      case 'month':
        return eachDayOfInterval({
          start: startOfMonth(currentDate),
          end: endOfMonth(currentDate),
        });
      default:
        return [currentDate];
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
          { locale: ru },
        )} - ${format(endOfWeek(currentDate, { weekStartsOn: 1 }), 'd MMM yyyy', { locale: ru })}`;
      case 'month':
        return format(currentDate, 'LLLL yyyy', { locale: ru });
      default:
        return '';
    }
  };

  const dateRange = getDateRange();

  const handleSlotClick = (date: Date, periodNumber: number) => {
    const dateKey = formatDateKey(date);
    const slots = (mockTimeSlots as Record<string, Record<string, string>>)[
      dateKey
    ];
    const isSlotTaken = slots?.[periodNumber.toString()];

    if (isCurator && !isSlotTaken) {
      setBookingModal({
        isOpen: true,
        date: dateKey,
        periodNumber,
      });
    }
  };

  const renderTimeSlot = (date: Date, period: (typeof timePeriods)[0]) => {
    const dateKey = formatDateKey(date);
    const timeSlotsForDate =
      mockTimeSlots[dateKey as keyof typeof mockTimeSlots];
    const appointmentId =
      timeSlotsForDate?.[
        period.number.toString() as keyof typeof timeSlotsForDate
      ];
    const appointmentDetails = appointmentId
      ? mockAppointmentDetails[
          appointmentId as keyof typeof mockAppointmentDetails
        ]
      : null;

    const isSlotTaken = !!appointmentId;
    const isPastDate = date < new Date();

    return (
      <div
        key={`${dateKey}-${period.number}`}
        className={`
          p-3 border rounded-lg min-h-[100px] transition-colors cursor-pointer
          ${
            isSlotTaken
              ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
              : isPastDate
                ? 'bg-gray-50 border-gray-200 cursor-not-allowed'
                : 'bg-white border-gray-200 hover:bg-gray-50'
          }
          ${isCurator && !isSlotTaken && !isPastDate ? 'hover:border-blue-300' : ''}
        `}
        onClick={() => !isPastDate && handleSlotClick(date, period.number)}
      >
        <div className='flex items-center justify-between mb-2'>
          <span className='text-sm font-medium text-gray-700'>
            {period.time}
          </span>
          {isSlotTaken && (
            <Badge variant='secondary' className='text-xs'>
              Занято
            </Badge>
          )}
        </div>

        {appointmentDetails && (
          <div className='space-y-1'>
            <p className='text-sm font-semibold text-blue-900 truncate'>
              {appointmentDetails.company}
            </p>
            <p className='text-xs text-gray-600 line-clamp-3'>
              {appointmentDetails.description}
            </p>
            <p className='text-xs text-gray-500 mt-1'>
              {appointmentDetails.curator}
            </p>
          </div>
        )}

        {!isSlotTaken && !isPastDate && isCurator && (
          <div className='flex items-center justify-center h-full text-gray-400'>
            <Plus className='h-5 w-5' />
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
                    {format(date, 'EEE', { locale: ru })}
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

      {/* Модальное окно бронирования */}
      {isCurator && (
        <BookAppointmentModal
          isOpen={bookingModal.isOpen}
          onClose={() =>
            setBookingModal({ isOpen: false, date: '', periodNumber: 0 })
          }
          date={bookingModal.date}
          periodNumber={bookingModal.periodNumber}
        />
      )}
    </div>
  );
});

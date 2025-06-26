import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

import {
  EStudentStatus,
  getStatusColor,
  getStatusText,
} from '@/entities/Student';
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { useEditStudentStatus } from '@/entities/Student/hooks/useEditStudentStatus.ts';

interface IStudentStatusBadgeProps {
  status: EStudentStatus;
  studentId: string;
}

const statusConfig = {
  [EStudentStatus.Expelled]: {
    label: getStatusText(EStudentStatus.Expelled),
    className: getStatusColor(EStudentStatus.Expelled),
  },
  [EStudentStatus.OnAcademicLeave]: {
    label: getStatusText(EStudentStatus.OnAcademicLeave),
    className: getStatusColor(EStudentStatus.OnAcademicLeave),
  },
  [EStudentStatus.InProcess]: {
    label: getStatusText(EStudentStatus.InProcess),
    className: getStatusColor(EStudentStatus.InProcess),
  },
  [EStudentStatus.Transferred]: {
    label: getStatusText(EStudentStatus.Transferred),
    className: getStatusColor(EStudentStatus.Transferred),
  },
  [EStudentStatus.Graduated]: {
    label: getStatusText(EStudentStatus.Graduated),
    className: getStatusColor(EStudentStatus.Graduated),
  },
};

export const ChangeStudentStatusDialog = ({
  status,
  studentId,
}: IStudentStatusBadgeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<EStudentStatus>(status);
  const [isHovered, setIsHovered] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useEditStudentStatus({
    onSuccess: () => {
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Статус успешно изменен!');
    },
    onError: () => {
      toast.error('Произошла ошибка');
    },
  });
  const currentConfig = statusConfig[status];

  const handleSave = () => {
    mutate({ params: { status: selectedStatus, studentId } });
  };

  const handleCancel = () => {
    setSelectedStatus(status);
    setIsModalOpen(false);
  };

  const handleBadgeClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Badge
        className={`
          relative inline-flex items-center justify-center cursor-pointer 
          transition-all duration-300 ease-in-out overflow-hidden
          ${currentConfig.className}
          ${isHovered ? 'pr-7' : ''}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleBadgeClick}
      >
        <span className='whitespace-nowrap'>{currentConfig.label}</span>
        <Edit2
          className={`
            absolute right-2 h-3 w-3 transition-all duration-300 ease-in-out
            ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
          `}
        />
      </Badge>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Изменить статус студента</DialogTitle>
            <DialogDescription>
              Выберите новый статус студента из списка ниже.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label
                htmlFor='status'
                className='text-right text-sm font-medium'
              >
                Статус
              </label>
              <div className='col-span-3'>
                <Select
                  value={selectedStatus}
                  onValueChange={(value: EStudentStatus) =>
                    setSelectedStatus(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Выберите статус' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={EStudentStatus.InProcess}>
                      {getStatusText(EStudentStatus.InProcess)}
                    </SelectItem>
                    <SelectItem value={EStudentStatus.OnAcademicLeave}>
                      {getStatusText(EStudentStatus.OnAcademicLeave)}
                    </SelectItem>
                    <SelectItem value={EStudentStatus.Transferred}>
                      {getStatusText(EStudentStatus.Transferred)}
                    </SelectItem>
                    <SelectItem value={EStudentStatus.Graduated}>
                      {getStatusText(EStudentStatus.Graduated)}
                    </SelectItem>
                    <SelectItem value={EStudentStatus.Expelled}>
                      {getStatusText(EStudentStatus.Expelled)}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={handleCancel}>
              Отмена
            </Button>
            <Button onClick={handleSave} disabled={isPending}>
              {isPending ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

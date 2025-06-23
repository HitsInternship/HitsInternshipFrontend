import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { ECompanyStatus } from '@/entities/Company/models';
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { useEditCompanyStatus } from '@/entities/Company';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

interface ICompanyStatusBadgeProps {
  status: ECompanyStatus;
  editingEnabled: boolean;
  companyId: string;
}

const statusConfig = {
  Partner: {
    label: 'Партнер',
    className: 'bg-green-500 hover:bg-green-600',
  },
  FormerPartner: {
    label: 'Бывший партнер',
    className: 'bg-gray-500 hover:bg-gray-600',
  },
  PotentialPartner: {
    label: 'Потенциальный партнер',
    className: 'bg-amber-500 hover:bg-amber-600',
  },
};

export const CompanyStatusBadge = ({
  status,
  editingEnabled = false,
  companyId,
}: ICompanyStatusBadgeProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useEditCompanyStatus({
    onSuccess: () => {
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Статус компании изменен успешно');
    },
    onError: () => {
      toast.error('Произошла ошибка');
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ECompanyStatus>(status);
  const [isHovered, setIsHovered] = useState(false);

  const currentConfig = statusConfig[status];

  const handleSave = () => {
    mutate({ params: { companyId: companyId, status: selectedStatus } });
  };

  const handleCancel = () => {
    setSelectedStatus(status);
    setIsModalOpen(false);
  };

  const handleBadgeClick = () => {
    if (editingEnabled) {
      setIsModalOpen(true);
    }
  };

  if (!editingEnabled) {
    return (
      <Badge className={currentConfig.className}>{currentConfig.label}</Badge>
    );
  }

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
        <span className='whitespace-nowrap text-white'>
          {currentConfig.label}
        </span>
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
            <DialogTitle>Изменить статус компании</DialogTitle>
            Выберите новый статус для компании из списка ниже.
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-5 items-center gap-4'>
              <label
                htmlFor='status'
                className='text-right text-sm font-medium'
              >
                Статус
              </label>
              <div className='col-span-4'>
                <Select
                  value={selectedStatus}
                  onValueChange={(value: ECompanyStatus) =>
                    setSelectedStatus(value)
                  }
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Выберите статус' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ECompanyStatus.Partner}>
                      Партнер
                    </SelectItem>
                    <SelectItem value={ECompanyStatus.FormerPartner}>
                      Бывший партнер
                    </SelectItem>
                    <SelectItem value={ECompanyStatus.PotentialPartner}>
                      Потенциальный партнер
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
              {isPending ? 'Обработка...' : 'Изменить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

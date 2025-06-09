import { Plus, Upload } from 'lucide-react';
import { useState } from 'react';

import { CreatePracticeDialogProps } from './CreatePracticeDialog.interfaces';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { useSemesters } from '@/features/SemesterCRUD';
import { useStreams } from '@/features/StreamsCRUD/hooks';

export const CreatePracticeDialog = ({
  open,
  setIsCreateDialogOpen,
}: CreatePracticeDialogProps) => {
  /*const mockStreams = [
    'Информационные системы',
    'Программная инженерия',
    'Кибербезопасность',
  ];
  const mockSemesters = ['2024-1', '2024-2', '2025-1', '2025-2'];*/
  const { data: semesters = [] } = useSemesters(false);
  const { data: streams = [] } = useStreams();

  const [newInternship, setNewInternship] = useState({
    name: '',
    stream: '',
    semester: '',
    diaryTemplate: null as File | null,
    characteristicTemplate: null as File | null,
  });

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'diary' | 'characteristic',
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewInternship((prev) => ({
        ...prev,
        [type === 'diary' ? 'diaryTemplate' : 'characteristicTemplate']: file,
      }));
    }
  };

  const handleCreateInternship = () => {
    console.log('Создание практики:', newInternship);
    setIsCreateDialogOpen(false);
    setNewInternship({
      name: '',
      stream: '',
      semester: '',
      diaryTemplate: null,
      characteristicTemplate: null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='w-4 h-4 mr-2' />
          Создать практику
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Создание новой практики</DialogTitle>
          <DialogDescription>
            Заполните информацию для создания новой практики
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='stream'>Поток</Label>
            <Select
              value={newInternship.stream}
              onValueChange={(value) =>
                setNewInternship((prev) => ({ ...prev, stream: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Выберите поток' />
              </SelectTrigger>
              <SelectContent>
                {streams.map((stream) => (
                  <SelectItem key={stream.id} value={stream.id}>
                    {stream.streamNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='name'>Название практики</Label>
            <Input
              id='name'
              value={newInternship.name}
              onChange={(e) =>
                setNewInternship((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder='Введите название практики'
            />
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='semester'>Семестр</Label>
            <Select
              value={newInternship.semester}
              onValueChange={(value) =>
                setNewInternship((prev) => ({ ...prev, semester: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Выберите семестр' />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((semester) => (
                  <SelectItem key={semester.id} value={semester.id}>
                    {semester.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='diary-template'>Шаблон дневника</Label>
            <div className='flex items-center gap-2'>
              <Input
                id='diary-template'
                type='file'
                accept='.pdf,.doc,.docx'
                onChange={(e) => handleFileUpload(e, 'diary')}
                className='hidden'
              />
              <Button
                type='button'
                variant='outline'
                onClick={() =>
                  document.getElementById('diary-template')?.click()
                }
                className='w-full'
              >
                <Upload className='w-4 h-4 mr-2' />
                {newInternship.diaryTemplate
                  ? newInternship.diaryTemplate.name
                  : 'Загрузить шаблон дневника'}
              </Button>
            </div>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='characteristic-template'>
              Шаблон характеристики
            </Label>
            <div className='flex items-center gap-2'>
              <Input
                id='characteristic-template'
                type='file'
                accept='.pdf,.doc,.docx'
                onChange={(e) => handleFileUpload(e, 'characteristic')}
                className='hidden'
              />
              <Button
                type='button'
                variant='outline'
                onClick={() =>
                  document.getElementById('characteristic-template')?.click()
                }
                className='w-full'
              >
                <Upload className='w-4 h-4 mr-2' />
                {newInternship.characteristicTemplate
                  ? newInternship.characteristicTemplate.name
                  : 'Загрузить шаблон характеристики'}
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => setIsCreateDialogOpen(false)}
          >
            Отмена
          </Button>
          <Button type='button' onClick={handleCreateInternship}>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

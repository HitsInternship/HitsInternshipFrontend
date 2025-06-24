import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Search, UserPlus } from 'lucide-react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Card,
  CardContent,
} from '@/shared/ui';
import { useAddCurator } from '@/entities/Curators/hooks';
import { useSearchUsers } from '@/entities/User/hooks';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Company } from '@/entities/Company/models';
import { IUser } from '@/entities/User';
import { useDebounce } from '@/shared/utils/debounce.ts';

enum ECuratorCreationType {
  EXISTING = 'existing',
  NEW = 'new',
}

const createCuratorSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(ECuratorCreationType.EXISTING),
    userId: z.string().min(1, 'Выберите пользователя'),
    telegram: z.string(),
    phone: z.string().min(1, 'Телефон обязателен'),
  }),
  z.object({
    type: z.literal(ECuratorCreationType.NEW),
    userRequest: z.object({
      name: z
        .string()
        .min(1, 'Имя обязательно')
        .max(50, 'Имя не должно превышать 50 символов'),
      surname: z
        .string()
        .min(1, 'Фамилия обязательна')
        .max(50, 'Фамилия не должна превышать 50 символов'),
      email: z.string().email('Некорректный email'),
    }),
    telegram: z.string().min(1, 'Телеграм обязателен'),
    phone: z.string().min(1, 'Телефон обязателен'),
  }),
]);

type CreateCuratorFormData = z.infer<typeof createCuratorSchema>;

const creationTypeLabels = {
  [ECuratorCreationType.EXISTING]: 'Выбрать существующего пользователя',
  [ECuratorCreationType.NEW]: 'Создать нового пользователя',
};

export const CreateCuratorModal = ({ company }: { company: Company }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creationType, setCreationType] = useState<ECuratorCreationType>(
    ECuratorCreationType.EXISTING,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  const form = useForm<CreateCuratorFormData>({
    resolver: zodResolver(createCuratorSchema),
    defaultValues: {
      type: ECuratorCreationType.EXISTING,
      userId: '',
      telegram: '',
      phone: '',
    },
  });

  // Поиск пользователей с debounce
  const { data: searchResults, isLoading: isSearching } = useSearchUsers(
    { surname: debouncedQuery },
    creationType === ECuratorCreationType.EXISTING,
  );

  const { mutate: addCurator, isPending } = useAddCurator({
    onSuccess: () => {
      setIsModalOpen(false);
      resetForm();
      // Можно добавить toast уведомление
    },
    onError: () => {
      // Можно добавить toast уведомление об ошибке
    },
  });

  // Сброс формы при смене типа создания
  useEffect(() => {
    if (creationType === ECuratorCreationType.EXISTING) {
      form.reset({
        type: ECuratorCreationType.EXISTING,
        userId: '',
        telegram: '',
        phone: '',
      });
    } else {
      form.reset({
        type: ECuratorCreationType.NEW,
        userRequest: {
          name: '',
          surname: '',
          email: '',
        },
        telegram: '',
        phone: '',
      });
    }
  }, [creationType, form]);

  const resetForm = () => {
    setCreationType(ECuratorCreationType.EXISTING);
    setSearchQuery('');
    form.reset({
      type: ECuratorCreationType.EXISTING,
      userId: '',
      telegram: '',
      phone: '',
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const onSubmit = (data: CreateCuratorFormData) => {
    if (data.type === ECuratorCreationType.EXISTING) {
      addCurator({
        params: {
          companyId: company.id,
          dto: {
            userId: data.userId,
            telegram: data.telegram,
            phone: data.phone,
          },
        },
      });
    } else {
      addCurator({
        params: {
          companyId: company.id,
          dto: {
            userRequest: data.userRequest,
            telegram: data.telegram,
            phone: data.phone,
          },
        },
      });
    }
  };

  // Опции для селекта пользователей
  const userOptions = useMemo(() => {
    return (
      searchResults?.map((user: IUser) => ({
        value: user.id,
        label: `${user.surname} ${user.name}`,
        email: user.email,
      })) || []
    );
  }, [searchResults]);

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant='ghost' onClick={() => setIsModalOpen(true)}>
          <UserPlus className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <div className='p-2 bg-green-100 rounded-lg'>
              <UserPlus className='h-5 w-5 text-green-600' />
            </div>
            Добавление куратора
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Выбор типа создания */}
          <Card>
            <CardContent>
              <Label className='text-lg font-medium mb-4 block'>
                Способ добавления куратора
              </Label>
              <RadioGroup
                value={creationType}
                onValueChange={(value) =>
                  setCreationType(value as ECuratorCreationType)
                }
                className='space-y-1'
              >
                {Object.entries(creationTypeLabels).map(([value, label]) => (
                  <div key={value} className='flex items-center space-x-2'>
                    <RadioGroupItem value={value} id={value} />
                    <Label htmlFor={value} className='text-sm cursor-pointer'>
                      {label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {creationType === ECuratorCreationType.EXISTING ? (
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label className='text-sm font-medium'>
                      Поиск пользователя
                    </Label>
                    <div className='relative'>
                      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                      <Input
                        placeholder='Введите фамилию для поиска...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='pl-10'
                        disabled={isPending}
                      />
                    </div>
                    {isSearching && (
                      <p className='text-xs text-muted-foreground'>
                        Поиск пользователей...
                      </p>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name='userId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Выберите пользователя *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Выберите пользователя из результатов поиска' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {userOptions && userOptions.length > 0 ? (
                              userOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  <div className='flex gap-2 align-middle'>
                                    <span className='font-medium'>
                                      {option.label}
                                    </span>
                                    <span className=' text-muted-foreground'>
                                      ({option.email})
                                    </span>
                                  </div>
                                </SelectItem>
                              ))
                            ) : searchQuery.length > 0 && !isSearching ? (
                              <SelectItem value='__not_found' disabled>
                                Пользователи не найдены
                              </SelectItem>
                            ) : (
                              <SelectItem value='__empty' disabled>
                                Введите фамилию для поиска
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <div className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='userRequest.surname'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Фамилия *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Введите фамилию'
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='userRequest.name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имя *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Введите имя'
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='userRequest.email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            placeholder='Введите email'
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Общие поля */}
              <div className='space-y-4 pt-4 border-t'>
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Телефон *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='+7 (999) 999-99-99'
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='telegram'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telegram</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='username (без @)'
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex justify-end gap-2 pt-4'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={closeModal}
                  disabled={isPending}
                >
                  Отмена
                </Button>
                <Button type='submit' disabled={isPending}>
                  {isPending ? (
                    <>
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
                      Создание...
                    </>
                  ) : (
                    <>
                      <Plus className='mr-2 h-4 w-4' />
                      Добавить куратора
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

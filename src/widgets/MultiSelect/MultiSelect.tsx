'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown, Loader2, X } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui';
import { cn } from '@/shared/lib/utils';
import { Separator } from '@/shared/ui/separator';

interface MultiSelectOption {
  id: string;
  name: string;
}

interface MultiSelectProps {
  options?: MultiSelectOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
  loading?: boolean;
  error: Error | null;
  disabled?: boolean;
  maxDisplayItems?: number;
}

export const MultiSelect = ({
  options,
  selectedValues,
  onSelectionChange,
  placeholder = 'Выберите элементы...',
  label,
  loading = false,
  error = null,
  disabled = false,
  maxDisplayItems = 2,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (optionId: string) => {
    const newValues = selectedValues.includes(optionId)
      ? selectedValues.filter((id) => id !== optionId)
      : [...selectedValues, optionId];

    onSelectionChange(newValues);
  };

  const handleRemove = (optionId: string) => {
    onSelectionChange(selectedValues.filter((id) => id !== optionId));
  };

  const selectAll = () => {
    if (options) onSelectionChange(options.map((option) => option.id));
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  const isAllSelected =
    selectedValues.length === options?.length && options.length > 0;
  const isPartiallySelected =
    options &&
    selectedValues.length > 0 &&
    selectedValues.length < options.length;

  const selectedOptions = options?.filter((option) =>
    selectedValues.includes(option.id),
  );

  if (error) {
    return (
      <div className='space-y-2'>
        {label && (
          <label className='text-sm font-medium text-destructive'>
            {label}
          </label>
        )}
        <div className='p-3 border border-destructive rounded-md bg-destructive/5'>
          <p className='text-sm text-destructive'>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-2'>
      {label && <label className='text-sm font-medium'>{label}</label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            disabled={disabled || loading}
            className='w-full justify-between min-h-10 h-auto'
          >
            <div className='flex flex-wrap gap-1 flex-1'>
              {loading ? (
                <div className='flex items-center gap-2'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  <span className='text-muted-foreground'>Загрузка...</span>
                </div>
              ) : selectedValues.length === 0 ? (
                <span className='text-muted-foreground'>{placeholder}</span>
              ) : isAllSelected ? (
                <Badge variant='secondary' className='text-xs'>
                  Все элементы ({options.length})
                </Badge>
              ) : (
                <>
                  {selectedOptions?.slice(0, maxDisplayItems).map((option) => (
                    <Badge
                      key={option.id}
                      variant='secondary'
                      className='text-xs'
                    >
                      {option.name}
                    </Badge>
                  ))}
                  {selectedValues.length > maxDisplayItems && (
                    <Badge variant='secondary' className='text-xs'>
                      +{selectedValues.length - maxDisplayItems} еще
                    </Badge>
                  )}
                </>
              )}
            </div>
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0' align='start'>
          <Command>
            <CommandInput placeholder='Поиск...' />
            <CommandList>
              <CommandEmpty>Элементы не найдены.</CommandEmpty>
              <CommandGroup>
                {options && options.length > 0 && (
                  <>
                    {/* Опция "Выбрать все" */}
                    <CommandItem
                      onSelect={isAllSelected ? clearAll : selectAll}
                      className='font-medium'
                    >
                      <div
                        className={cn(
                          'mr-2 h-4 w-4 border border-primary rounded-sm flex items-center justify-center',
                          isAllSelected
                            ? 'bg-primary text-primary-foreground'
                            : '',
                          isPartiallySelected ? 'bg-primary/50' : '',
                        )}
                      >
                        {isAllSelected && <Check className='h-3 w-3' />}
                        {isPartiallySelected && !isAllSelected && (
                          <div className='h-2 w-2 bg-primary rounded-sm' />
                        )}
                      </div>
                      {isAllSelected ? 'Снять выбор со всех' : 'Выбрать все'}
                      <span className='ml-auto text-xs text-muted-foreground'>
                        ({options.length})
                      </span>
                    </CommandItem>
                    <Separator className='my-1' />
                  </>
                )}

                {/* Отдельные элементы */}
                {options?.map((option) => (
                  <CommandItem
                    key={option.id}
                    onSelect={() => handleSelect(option.id)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedValues.includes(option.id)
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            {selectedValues.length > 0 && (
              <div className='border-t p-2 flex gap-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={clearAll}
                  className='flex-1'
                >
                  Очистить все
                </Button>
                {!isAllSelected && options && options.length > 0 && (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={selectAll}
                    className='flex-1'
                  >
                    Выбрать все
                  </Button>
                )}
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>

      {/* Отображение выбранных элементов */}
      {selectedValues.length > 0 && (
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <div className='text-sm font-medium'>
              Выбрано ({selectedValues.length}/{options?.length}):
            </div>
            <div className='flex gap-1'>
              {!isAllSelected && options && options.length > 0 && (
                <Button variant='outline' size='sm' onClick={selectAll}>
                  Выбрать все
                </Button>
              )}
              <Button variant='outline' size='sm' onClick={clearAll}>
                Очистить
              </Button>
            </div>
          </div>
          <div className='flex flex-wrap gap-2'>
            {isAllSelected ? (
              <Badge variant='default' className='flex items-center gap-1'>
                Все элементы ({options.length})
                <X
                  className='h-3 w-3 cursor-pointer hover:bg-destructive/20 rounded-full'
                  onClick={clearAll}
                />
              </Badge>
            ) : (
              selectedOptions?.map((option) => (
                <Badge
                  key={option.id}
                  variant='default'
                  className='flex items-center gap-1'
                >
                  {option.name}
                  <X
                    className='h-3 w-3 cursor-pointer hover:bg-destructive/20 rounded-full'
                    onClick={() => handleRemove(option.id)}
                  />
                </Badge>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

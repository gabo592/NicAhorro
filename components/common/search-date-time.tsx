'use client';

import { Suspense, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Skeleton } from '../ui/skeleton';

function DateTime() {
  const [date, setDate] = useState<DateRange | undefined>();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  function handleDateSearch(selectedDate: DateRange | undefined) {
    const params = new URLSearchParams(searchParams);

    if (selectedDate && selectedDate.from) {
      params.set('dateFrom', selectedDate.from.toISOString());

      if (selectedDate.to) {
        params.set('dateTo', selectedDate.to.toISOString());
      }
    } else {
      params.delete('dateFrom');
      params.delete('dateTo');
    }

    router.replace(`${pathName}?${params.toString()}`);
    setDate(selectedDate);
  }

  function handleDeleteFilter() {
    setDate(undefined);

    const params = new URLSearchParams(searchParams);
    params.delete('dateFrom');
    params.delete('dateTo');

    router.replace(`${pathName}?${params.toString()}`);
  }

  return (
    <section className='flex items-center justify-between gap-4'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'min-w-[280px] w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Selecciona una fecha</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSearch}
            numberOfMonths={2}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />
        </PopoverContent>
      </Popover>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='destructive' size='icon' onClick={() => handleDeleteFilter()}>
              <Trash2 className='w-4 h-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eliminar Filtro</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </section>
  );
}

export default function SearchDateTime() {
  return (
    <Suspense fallback={<Skeleton className='min-w-[280px] rounded-md h-9 px-4 py-2' />}>
      <DateTime />
    </Suspense>
  )
}

'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { DateRange } from 'react-day-picker';

interface Props {
  searchParams?: {
    query?: string;
    dateFrom?: string;
    dateTo?: string;
  };
}

export async function getTransactions({ searchParams }: Props) {
  const supabase = createClient();

  let query = supabase
    .from('transactions')
    .select('*, account:saving_accounts(*, currency:currencies(*))');

  if (searchParams?.query) {
    query = query.ilike('description', `%${searchParams.query}%`);
  }

  if (searchParams?.dateFrom) {
    const dateRange: DateRange = {
      from: new Date(searchParams.dateFrom),
    };

    if (searchParams.dateTo) {
      dateRange.to = new Date(searchParams.dateTo);

      query = query
        .gte('created_at', dateRange.from?.toISOString())
        .lte('created_at', dateRange.to.toISOString());
    } else {
      const today = new Date();
      query = query
        .gte('created_at', dateRange.from?.toISOString())
        .lte('created_at', today.toISOString());
    }
  }

  const { error, data } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function deleteTransaction(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath('/transactions', 'layout');
}

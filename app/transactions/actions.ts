'use server';

import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from '@/types/transaction';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { DateRange } from 'react-day-picker';

export async function createTransaction(formData: FormData) {
  const supabase = createClient();

  const payload: CreateTransactionDto = {
    description: formData.get('description') as string,
    amount: Number(formData.get('amount') as string),
    account_id: formData.get('accountId') as string,
  };

  const { error, data } = await supabase
    .from('transactions')
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  revalidatePath('/', 'layout');

  return data;
}

interface Props {
  searchParams?: {
    query?: string;
    dateFrom?: string;
    dateTo?: string;
  };
  onlyToday?: boolean;
}

export async function getTransactions({ searchParams, onlyToday }: Props) {
  const supabase = createClient();

  let query = supabase
    .from('transactions')
    .select('*, account:saving_accounts(*, currency:currencies(*))');

  if (onlyToday) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    query = query
      .gte('created_at', today.toISOString())
      .lt('created_at', tomorrow.toISOString());
  }

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

export async function getTransaction(id: string) {
  const supabase = createClient();

  const { error, data } = await supabase
    .from('transactions')
    .select('*, account:saving_accounts(*, currency:currencies(*))')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function updateTransaction(formData: FormData) {
  const supabase = createClient();

  const payload: UpdateTransactionDto = {
    description: formData.get('description') as string,
    amount: Number(formData.get('amount') as string),
    account_id: formData.get('accountId') as string,
  };
  const id = formData.get('id') as string;

  const { error, data } = await supabase
    .from('transactions')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  revalidatePath('/', 'layout');

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

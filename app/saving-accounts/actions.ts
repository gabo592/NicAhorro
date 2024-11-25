'use server';

import {
  CreateSavingAccountDto,
  SavingAccount,
  SavingAccountEntity,
  UpdateSavingAccountDto,
} from '@/types/saving_account';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getUser } from '../auth/actions';
import { revalidatePath } from 'next/cache';

interface SearchProps {
  searchQuery?: string;
}

export async function createSavingAccount(
  formData: FormData
): Promise<SavingAccountEntity | null> {
  const user = await getUser();

  if (!user) {
    console.error('Create Saving Account', 'User is required!');
    return null;
  }

  const supabase = await createClient();

  const dto: CreateSavingAccountDto = {
    balance: Number(formData.get('balance') as string),
    description: formData.get('description') as string,
    name: formData.get('name') as string,
    currency_id: formData.get('currencyId') as string,
    user_id: user.id,
  };

  const { error, data } = await supabase
    .from('saving_accounts')
    .insert(dto)
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  revalidatePath('/saving-accounts', 'layout');

  return data;
}

export async function getSavingAccounts({
  searchQuery,
}: SearchProps): Promise<SavingAccount[]> {
  const supabase = await createClient();

  let query = supabase
    .from('saving_accounts')
    .select('*, currency:currencies(*)')
    .order('id', { ascending: false });

  if (searchQuery) {
    query = query.or(
      `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
    );
  }

  const { error, data } = await query;

  if (error) {
    console.error(error);
    redirect('/error');
  }

  return data;
}

export async function getSavingAccount(id: string): Promise<SavingAccount> {
  const supabase = await createClient();

  const { error, data } = await supabase
    .from('saving_accounts')
    .select('*, currency:currencies(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    redirect('/error');
  }

  return data;
}

export async function updateSavingAccount(
  formData: FormData
): Promise<SavingAccountEntity | null> {
  const user = await getUser();

  if (!user) {
    console.error('Create Saving Account', 'User is required!');
    return null;
  }

  const supabase = await createClient();
  const id = formData.get('id') as string;

  const dto: UpdateSavingAccountDto = {
    balance: Number(formData.get('balance') as string),
    description: formData.get('description') as string,
    name: formData.get('name') as string,
    currency_id: formData.get('currencyId') as string,
  };

  const { error, data } = await supabase
    .from('saving_accounts')
    .update(dto)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  revalidatePath('/saving-accounts', 'layout');

  return data;
}

export async function deleteSavingAccount(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from('saving_accounts')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath('/saving-accounts', 'layout');
}

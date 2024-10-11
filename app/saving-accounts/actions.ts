'use server';

import {
  CreateSavingAccountDto,
  UpdateSavingAccountDto,
} from '@/types/saving-account';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { getUser } from '../auth/actions';

export async function createSavingAccount(formData: FormData) {
  const user = await getUser();

  if (!user) {
    console.error('Se necesita de un usuario para crear una Cuenta de Ahorro.');
    return null;
  }

  const payload: CreateSavingAccountDto = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    balance: Number(formData.get('balance') as string),
    currency_id: formData.get('currencyId') as string,
    user_id: user.id,
  };

  const supabase = createClient();

  const { error, data } = await supabase
    .from('saving_accounts')
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  revalidatePath('/saving-accounts', 'layout');

  return data;
}

export async function getSavingAccounts(searchQuery?: string) {
  const supabase = createClient();

  let query = supabase
    .from('saving_accounts')
    .select('*, currency:currencies(*)');

  if (searchQuery) {
    query = query.or(
      `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
    );
  }

  const { error, data } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getSavingAccount(id: string) {
  const supabase = createClient();

  const { error, data } = await supabase
    .from('saving_accounts')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function updateSavingAccount(formData: FormData) {
  const payload: UpdateSavingAccountDto = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    balance: Number(formData.get('balance') as string),
    currency_id: formData.get('currencyId') as string,
  };

  const supabase = createClient();

  const { error, data } = await supabase
    .from('saving_accounts')
    .update(payload)
    .eq('id', formData.get('id') as string)
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  revalidatePath('/saving-accounts', 'layout');

  return data;
}

export async function deleteSavingAccount(id: string) {
  const supabase = createClient();

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

'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function getSavingAccounts() {
  const supabase = createClient();

  const { data, error: userError } = await supabase.auth.getUser();
  const user = data.user;

  if (userError || !user) {
    console.error(userError);
    redirect('/error');
  }

  const { data: savingAccounts, error: savingAccountsError } = await supabase
    .from('saving_accounts')
    .select();

  if (savingAccountsError || !savingAccounts) {
    console.error(savingAccountsError);
    redirect('/error');
  }

  console.log(savingAccounts);

  return savingAccounts;
}

'use server';

import { createClient } from '@/utils/supabase/server';

export async function getCurrencies() {
  const supabase = createClient();

  const { error, data } = await supabase.from('currencies').select();

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

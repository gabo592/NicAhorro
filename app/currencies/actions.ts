'use server';

import { Currency } from '@/types/currency';
import { createClient } from '@/utils/supabase/server';

export async function getCurrencies(): Promise<Currency[]> {
  const supabase = await createClient();

  const { error, data } = await supabase.from('currencies').select();

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

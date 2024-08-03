import { type Currency } from './currency';
import { type Database } from './database';

export type SavingAccount =
  Database['public']['Tables']['saving_accounts']['Row'] & {
    currency: Currency | null;
  };

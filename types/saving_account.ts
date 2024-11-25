import { Currency } from './currency';
import { Database } from './database';

type Table = Database['public']['Tables']['saving_accounts'];

export type SavingAccountEntity = Table['Row'];

export type SavingAccount = SavingAccountEntity & {
  currency: Currency | null;
};

export type CreateSavingAccountDto = Table['Insert'];

export type UpdateSavingAccountDto = Table['Update'];

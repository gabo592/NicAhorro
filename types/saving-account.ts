import { CurrencyEntity } from './currency';
import { Database } from './database';

type Table = Database['public']['Tables']['saving_accounts'];

export type SavingAccountEntity = Table['Row'];

export type SavingAccount = SavingAccountEntity & {
  currency?: CurrencyEntity | null;
};

export type CreateSavingAccountDto = Table['Insert'];

export type UpdateSavingAccountDto = Table['Update'];

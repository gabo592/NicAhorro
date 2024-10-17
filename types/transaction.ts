import { Database } from './database';
import { SavingAccount } from './saving-account';

type Table = Database['public']['Tables']['transactions'];

export type TransactionEntity = Table['Row'];

export type Transaction = TransactionEntity & {
  account: SavingAccount | null;
};

export type CreateTransactionDto = Table['Insert'];

export type UpdateTransactionDto = Table['Update'];

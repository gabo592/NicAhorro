import { Database } from './database';

type Table = Database['public']['Tables']['currencies'];

export type Currency = Table['Row'];

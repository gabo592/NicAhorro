'use client';

import NavigationBackButton from '@/components/common/navigation-back-button';
import { ModeToggle } from '@/components/mode-toggle';
import { getSavingAccounts } from './actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { type SavingAccount } from '@/types/saving-account';

export default function SavingAccountsPage() {
  const [savingAccounts, setSavingAccounts] = useState<SavingAccount[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<SavingAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSavingAccounts = async () => {
      const data = await getSavingAccounts();
      setSavingAccounts(data);
    };

    fetchSavingAccounts();
  }, []);

  useEffect(() => {
    const filterAccounts = (accounts: SavingAccount[], query: string) => {
      if (!query || query === '') {
        return savingAccounts;
      }

      return accounts.filter((account) => {
        const nameMatch = account.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const descriptionMatch = account.description
          .toLowerCase()
          .includes(query.toLowerCase());
        return nameMatch || descriptionMatch;
      });
    };

    setFilteredAccounts((prev) => filterAccounts(prev, searchQuery));
  }, [searchQuery, savingAccounts]);

  return (
    <>
      <header className="flex flex-row items-center justify-between p-4">
        <NavigationBackButton />

        <h1 className="text-xl font-bold">Cuentas de Ahorro</h1>

        <ModeToggle />
      </header>

      <main className="flex flex-col items-center p-4 gap-8">
        <section className="flex flex-row items-center gap-2 w-full md:max-w-md">
          <Input
            type="search"
            placeholder="Buscar"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </section>

        <section className="w-full lg:max-w-7xl">
          <Table>
            <TableCaption>Cuentas de Ahorro encontradas</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha y Hora Creada</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Moneda</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {new Date(item.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>{item.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </main>
    </>
  );
}

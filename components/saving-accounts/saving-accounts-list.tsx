'use client';

import { getSavingAccounts } from '@/app/saving-accounts/actions';
import { SavingAccount } from '@/types/saving-account';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Loader from '../common/loader';
import SavingAccountsItem from './saving-accounts-item';

const SavingAccountsList = () => {
  const [items, setItems] = useState<SavingAccount[]>([]);
  const [filteredItems, setFilteredItems] = useState<SavingAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSavingAccounts = async () => {
      const data = await getSavingAccounts();
      setItems(data);
    };

    setIsLoading(true);
    fetchSavingAccounts().then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const filterSavingAccounts = (
      savingAccounts: SavingAccount[],
      query: string
    ) => {
      if (!query || query === '') {
        return items;
      }

      return savingAccounts.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(query.toLowerCase());
        const descriptionMatch = item.description
          .toLowerCase()
          .includes(query.toLowerCase());
        return nameMatch || descriptionMatch;
      });
    };

    setFilteredItems((prev) => filterSavingAccounts(prev, searchQuery));
  }, [searchQuery, items]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="flex flex-row items-center gap-2 w-full md:max-w-md">
        <Input
          type="search"
          placeholder="Buscar..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button>Agregar</Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-8">
        {filteredItems.map((item) => (
          <SavingAccountsItem key={item.id} item={item} />
        ))}
      </section>
    </>
  );
};

export default SavingAccountsList;

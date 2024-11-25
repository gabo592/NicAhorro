import AppHeader from '@/components/common/app-header';
import MainContainer from '@/components/common/main-container';
import Search from '@/components/common/search';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const SavingAccountsList = dynamic(() => import('@/components/saving-accounts/list'));

interface Props {
  searchParams?: Promise<{
    query?: string;
  }>;
}

export default async function SavingAccountsPage(props: Props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  return (
    <>
      <AppHeader title="Cuentas de Ahorro" />
      <MainContainer>
        <section className="flex items-center gap-4 w-full max-w-md">
          <Search />
          <Button asChild>
            <Link href='/saving-accounts/new'>
              <Plus className="w-4 h-4" />
              Nuevo
            </Link>
          </Button>
        </section>

        <SavingAccountsList query={query} />
      </MainContainer>
    </>
  );
}
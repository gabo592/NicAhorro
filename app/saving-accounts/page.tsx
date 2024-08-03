import NavigationBackButton from '@/components/common/navigation-back-button';
import SavingAccountsList from '@/components/saving-accounts/saving-accounts-list';
import { ModeToggle } from '@/components/mode-toggle';

export default async function SavingAccountsPage() {
  return (
    <>
      <header className="flex flex-row items-center justify-between p-4">
        <NavigationBackButton />

        <h1 className="text-xl font-bold">Cuentas de Ahorro</h1>

        <ModeToggle />
      </header>

      <main className="flex flex-col items-center p-4 gap-8">
        <SavingAccountsList />
      </main>
    </>
  );
}

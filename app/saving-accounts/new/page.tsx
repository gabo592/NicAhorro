import { getCurrencies } from "@/app/currencies/actions";
import { ModeToggle } from "@/components/common/mode-toggle";
import ReturnButton from "@/components/common/return-button";
import SavingAccountsForm from "@/components/saving-accounts/saving-accounts-form";
import { Toaster } from "@/components/ui/toaster";

export default async function NewSavingAccountPage() {
  const currencies = await getCurrencies();

  return (
    <>
      <header className="flex items-center justify-between p-4">
        <ReturnButton />
        <h1 className="text-xl font-bold">Crear Cuenta de Ahorro</h1>
        <ModeToggle />
      </header>
      <main className="flex flex-col items-center p-4 gap-8">
        <SavingAccountsForm currencies={currencies} />
      </main>
      <Toaster />
    </>
  );
}

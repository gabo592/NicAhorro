import { getCurrencies } from "@/app/currencies/actions";
import { ModeToggle } from "@/components/common/mode-toggle";
import ReturnButton from "@/components/common/return-button";
import SavingAccountsForm from "@/components/saving-accounts/saving-accounts-form";
import { Toaster } from "@/components/ui/toaster";
import { getSavingAccount } from "../actions";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  }
}

export default async function EditSavingAccountPage({ params }: Props) {
  const currencies = await getCurrencies();
  const savingAccount = await getSavingAccount(params.id);

  if (!savingAccount) {
    redirect('/saving-accounts');
  }

  return (
    <>
      <header className="flex items-center justify-between p-4">
        <ReturnButton />
        <h1 className="text-xl font-bold">Crear Cuenta de Ahorro</h1>
        <ModeToggle />
      </header>
      <main className="flex flex-col items-center p-4 gap-8">
        <SavingAccountsForm currencies={currencies} savingAccount={savingAccount} />
      </main>
      <Toaster />
    </>
  );
}

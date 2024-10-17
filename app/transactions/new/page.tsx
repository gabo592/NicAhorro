import { getSavingAccounts } from "@/app/saving-accounts/actions";
import { ModeToggle } from "@/components/common/mode-toggle";
import ReturnButton from "@/components/common/return-button";
import TransactionForm from "@/components/transactions/transactions-form";
import { Toaster } from "@/components/ui/toaster";

export default async function NewTransactionPage() {
  const savingAccounts = await getSavingAccounts();

  return (
    <>
      <header className="flex items-center justify-between p-4">
        <ReturnButton />
        <h1 className="text-xl font-bold">Crear Transacción</h1>
        <ModeToggle />
      </header>
      <main className="flex flex-col items-center p-4 gap-8">
        <TransactionForm savingAccounts={savingAccounts} />
      </main>
      <Toaster />
    </>
  )
}

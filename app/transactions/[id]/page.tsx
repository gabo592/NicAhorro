import ReturnButton from "@/components/common/return-button";
import { getTransaction } from "../actions";
import { ModeToggle } from "@/components/common/mode-toggle";
import TransactionForm from "@/components/transactions/transactions-form";
import { Toaster } from "@/components/ui/toaster";
import { getSavingAccounts } from "@/app/saving-accounts/actions";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  }
}

export default async function EditTransactionPage({ params }: Props) {
  const [transaction, savingAccounts] = await Promise.all([getTransaction(params.id), getSavingAccounts()]);

  if (!transaction) {
    redirect('/error');
  }

  return (
    <>
      <header className="flex items-center justify-between p-4">
        <ReturnButton />
        <h1 className="text-xl font-bold">Editar Transacción</h1>
        <ModeToggle />
      </header>
      <main className="flex flex-col items-center p-4 gap-8">
        <TransactionForm savingAccounts={savingAccounts} transaction={transaction} />
      </main>
      <Toaster />
    </>
  )
}

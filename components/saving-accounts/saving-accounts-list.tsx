import { getSavingAccounts } from "@/app/saving-accounts/actions";
import SavingAccountsItem from "./saving-accounts-item";

interface SavingAccountsListProps {
  query?: string;
}

export default async function SavingAccountsList({ query }: SavingAccountsListProps) {
  const savingAccounts = await getSavingAccounts(query);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      {savingAccounts.map((savingAccount) => (
        <SavingAccountsItem key={savingAccount.id} savingAccount={savingAccount} />
      ))}
    </section>
  )
}

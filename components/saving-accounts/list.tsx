import { getSavingAccounts } from "@/app/saving-accounts/actions";
import SavingAccountsListItem from "./item";

interface Props {
  query: string;
}

export default async function SavingAccountsList({ query }: Props) {
  const savingAccounts = await getSavingAccounts({ searchQuery: query });

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {savingAccounts.map((item, index) => (
        <SavingAccountsListItem key={`item-${index}`} item={item} />
      ))}
    </section>
  )
}
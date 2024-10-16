import { getTransactions } from "@/app/transactions/actions";
import TransactionItem from "./transactions-item";

interface Props {
  searchParams?: {
    query?: string;
    dateFrom?: string;
    dateTo?: string;
  }
}

export default async function TransactionsList(props: Props) {
  const transactions = await getTransactions(props);

  return (
    <section className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </section>
  )
}

import { ModeToggle } from "@/components/common/mode-toggle";
import ReturnButton from "@/components/common/return-button";
import Search from "@/components/common/search";
import SearchDateTime from "@/components/common/search-date-time";
import TransactionsList from "@/components/transactions/transactions-list";

interface Props {
  searchParams?: {
    query?: string;
    dateFrom?: string;
    dateTo?: string;
  }
}

export default function TransactionsPage({ searchParams }: Props) {
  return (
    <>
      <header className="flex items-center justify-between p-4">
        <ReturnButton />
        <h1 className="text-xl font-bold">Transacciones</h1>
        <ModeToggle />
      </header>
      <main className="flex flex-col items-center gap-8 p-4">
        <section className="flex flex-col gap-4 w-full max-w-md">
          <Search />
          <SearchDateTime />
        </section>

        <h2 className="text-lg font-bold">Historial</h2>

        <TransactionsList searchParams={searchParams} />
      </main>
    </>
  )
}

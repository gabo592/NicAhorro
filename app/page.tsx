import SearchBar from "@/components/common/search";
import AvatarMenu from "@/components/home/avatar-menu";
import Sidebar from "@/components/home/sidebar";
import TransactionsList from "@/components/transactions/transactions-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  searchParams?: {
    query?: string;
  };
}

export default function Home({ searchParams }: Props) {
  return (
    <>
      <header className="flex flex-row items-center justify-between p-4">
        <Sidebar />
        <h1 className="text-xl font-bold">NicAhorro</h1>
        <AvatarMenu />
      </header>
      <main className="flex flex-col items-center p-4 gap-8">
        <h2 className="text-2xl font-bold">Transacciones de Hoy</h2>
        <section className="flex items-center gap-4 w-full max-w-md">
          <SearchBar />
          <Button asChild>
            <Link href='/transactions/new'>Agregar</Link>
          </Button>
        </section>
        <TransactionsList searchParams={searchParams} onlyToday />
      </main>
    </>
  );
}

import { ModeToggle } from "@/components/common/mode-toggle";
import ReturnButton from "@/components/common/return-button";
import Search from "@/components/common/search";
import SavingAccountsList from "@/components/saving-accounts/saving-accounts-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  searchParams?: {
    query?: string;
  }
}

export default function SavingAccountsPage({ searchParams }: Props) {
  return (
    <>
      <header className="flex flex-row items-center justify-between p-4">
        <ReturnButton />
        <h1 className="text-xl font-bold">Cuentas de Ahorro</h1>
        <ModeToggle />
      </header>
      <main className="flex flex-col items-center p-4 gap-8">
        <section className="flex flex-row items-center gap-4">
          <Search />
          <Button asChild>
            <Link href='/saving-accounts/new'>Agregar</Link>
          </Button>
        </section>

        <SavingAccountsList query={searchParams?.query} />
      </main>
    </>
  )
}

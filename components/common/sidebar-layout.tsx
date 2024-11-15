import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "./app-sidebar";
import { ModeToggle } from "./mode-toggle";
import { cookies } from "next/headers";

interface Props {
  children: ReactNode
}

export default async function SidebarLayout({ children }: Props) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full flex flex-col gap-2">
        <header className="ml-2 mt-2 mr-2 flex items-center justify-between">
          <SidebarTrigger type="button" />
          <h1 className="text-xl font-bold">NicAhorro</h1>
          <ModeToggle />
        </header>
        <section className="flex flex-col items-center p-4 gap-8">
          {children}
        </section>
      </main>
    </SidebarProvider>
  )
}
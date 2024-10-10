import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Separator } from "../ui/separator";
import { sidebarRoutes } from "@/constant/routes";
import Link from "next/link";

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle>Menú</SheetTitle>
        <SheetDescription>
          A continuación se le muestran las opciones por las que puede navegar dentro de la aplicación.
        </SheetDescription>
        <Separator />
        <section className="flex flex-col items-start w-full p-2">
          {sidebarRoutes.map((route) => (
            <Link key={route.path} href={route.path} className="flex flex-row w-full items-center gap-3 p-2 hover:bg-secondary rounded-md">
              {route.icon && <route.icon className="w-4 h-4" />}
              {route.title}
            </Link>
          ))}
        </section>
      </SheetContent>
    </Sheet>
  )
}

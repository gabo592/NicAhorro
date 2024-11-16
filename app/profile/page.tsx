import { ModeToggle } from "@/components/common/mode-toggle";
import ReturnButton from "@/components/common/return-button";
import { getUser } from "../auth/actions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lock, Pencil, Trash2 } from "lucide-react";

export default async function ProfilePage() {
  const user = await getUser()

  if (!user) {
    redirect("/error")
  }

  return (
    <>
      <header className="flex items-center justify-between p-4">
        <ReturnButton />
        <h1 className="text-xl font-bold">Mi Perfil</h1>
        <ModeToggle />
      </header>
      <main className="flex flex-col items-center p-4 gap-8">
        <section className="flex flex-col items-center gap-4">
          <img src={user.avatar_url} alt="user_avatar" className="w-20 md:w-32 h-auto rounded-full" />
          <h2 className="text-lg font-bold">{user.first_name} {user.last_name}</h2>
        </section>

        <section className="flex flex-col md:flex-row w-full max-w-md lg:max-w-lg gap-4">
          <Button variant="outline">
            <Pencil className="w-4 h-4" />
            Editar Perfil
          </Button>
          <Button variant="outline">
            <Lock className="w-4 h-4" />
            Cambiar contraseña
          </Button>
          <Button variant="destructive">
            <Trash2 className="w-4 h-4" />
            Eliminar cuenta
          </Button>
        </section>
      </main>
    </>
  )
}
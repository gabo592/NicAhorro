import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lock, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import AppHeader from "@/components/common/app-header";
import MainContainer from "@/components/common/main-container";

export default async function ProfilePage() {
  const supabase = await createClient()
  const { error, data } = await supabase.auth.getUser()

  if (!data || error) {
    redirect("/error")
  }

  const { first_name, last_name, avatar_url } = data.user.user_metadata;

  return (
    <>
      <AppHeader title="Mi Perfil" />
      <MainContainer>
        <section className="flex flex-col items-center gap-4">
          <Image src={avatar_url} alt="user_avatar" width={100} height={100} className="w-20 md:w-32 h-auto rounded-full" />
          <h2 className="text-lg font-bold">{first_name} {last_name}</h2>
          <h3 className="text-md">{data.user.email}</h3>
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
      </MainContainer>
    </>
  )
}
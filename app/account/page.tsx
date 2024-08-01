import NavigationBackButton from '@/components/common/navigation-back-button';
import { ModeToggle } from '@/components/mode-toggle';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { Lock, Trash2, UserPen } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  const user = data.user;

  if (error || !user) {
    redirect('/error');
  }

  const { first_name, last_name, avatar_url } = user.user_metadata;

  const fullName = `${first_name} ${last_name}`;
  const imageUrl = avatar_url as string;

  return (
    <>
      <header className="flex flex-row items-center justify-between p-4">
        <NavigationBackButton />

        <h1 className="text-xl font-bold">Cuenta</h1>

        <ModeToggle />
      </header>
      <main className="flex flex-col items-center p-4 gap-8">
        <img
          src={imageUrl}
          alt="user_avatar"
          loading="lazy"
          className="w-32 lg:w-40 h-auto rounded-full"
        />

        <section className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold">{fullName}</h2>
          <h3 className="text-lg font-semibold">{user.email}</h3>
        </section>

        <section className="flex flex-col gap-4 w-full md:max-w-md">
          <Button variant="outline">
            <UserPen className="w-4 h-4 mr-2" />
            Editar Perfil
          </Button>

          <Button variant="outline">
            <Lock className="w-4 h-4 mr-2" />
            Cambiar Contraseña
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar Cuenta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Desea eliminar su cuenta?</AlertDialogTitle>
                <AlertDialogDescription>
                  Al eliminar su cuenta, toda información o registro de su
                  usuario en NicAhorro será eliminado permanentemente. Esta
                  acción no puede revertirse.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>Eliminar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      </main>
    </>
  );
}

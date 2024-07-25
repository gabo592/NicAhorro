import { ModeToggle } from '@/components/mode-toggle';
import NavigationBackButton from '@/components/common/navigation-back-button';
import Logo from '@/public/assets/icons/logo.png';
import Image from 'next/image';
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <>
      <header className="flex flex-row items-center justify-between p-4">
        <NavigationBackButton />

        <h1 className="text-xl font-bold">Crear Cuenta</h1>

        <ModeToggle />
      </header>
      <main className="flex flex-col items-center p-4 gap-8">
        <Image src={Logo} alt="logo" className="w-20 h-auto" />

        <RegisterForm />
      </main>
    </>
  );
}

import { ModeToggle } from "@/components/common/mode-toggle";
import Image from "next/image";
import Logo from "@/public/assets/images/logo.png";
import ReturnButton from "@/components/common/return-button";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <>
      <header className="flex flex-row items-center justify-between p-4">
        <ReturnButton />
        <h1 className="text-xl font-bold">Crear Cuenta</h1>
        <ModeToggle />
      </header>
      <main className="flex flex-col items-center gap-8 p-4">
        <Image src={Logo} alt="logo" className="w-16 h-auto" />
        <RegisterForm />
      </main>
    </>
  )
}

import RegisterForm from "@/components/auth/register-form";
import { ModeToggle } from "@/components/common/mode-toggle";
import ReturnButton from "@/components/common/return-button";
import Logo from "@/public/favicon.svg";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <>
      <header className="flex items-center justify-between p-4">
        <ReturnButton />
        <h1 className="text-xl font-bold">Crear Cuenta</h1>
        <ModeToggle />
      </header>
      <main className="flex flex-col items-center p-4 gap-8">
        <Image src={Logo} alt="logo" className="w-20 h-auto" />
        <RegisterForm />
      </main>
    </>
  )
}
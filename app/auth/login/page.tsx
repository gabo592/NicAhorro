import LoginForm from "@/components/auth/login-form";
import { ModeToggle } from "@/components/common/mode-toggle";
import Logo from "@/public/favicon.svg";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <header className="flex items-center justify-between p-4">
        <section className="hidden md:block w-9 h-9"></section>
        <h1 className="text-xl font-bold">Iniciar Sesión</h1>
        <ModeToggle />
      </header>
      <main className="flex items-center flex-col p-4 gap-8">
        <Image src={Logo} alt="logo" className="w-20 h-auto" />
        <LoginForm />
      </main>
    </>
  )
}
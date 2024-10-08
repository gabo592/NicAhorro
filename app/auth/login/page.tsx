import LoginForm from "@/components/auth/login-form";
import { ModeToggle } from "@/components/common/mode-toggle";
import Logo from "@/public/assets/images/logo.png";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <header className="flex flex-row items-center justify-between p-4">
        <div className="w-[36px] h-[36px]"></div>
        <h1 className="text-xl font-bold">Iniciar Sesión</h1>
        <ModeToggle />
      </header>
      <main className="flex flex-col items-center gap-8 p-4">
        <Image src={Logo} alt="logo" className="w-16 h-auto" />
        <LoginForm />
      </main>
    </>
  )
}

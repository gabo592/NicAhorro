"use client";

import { signOut } from "@/app/auth/actions";
import { Button } from "../ui/button";
import { LoaderCircle, LogOut } from "lucide-react";
import { useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="destructive" disabled={pending}>
      {pending ? (
        <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4 mr-2" />
      )}
      Cerrar Sesión
    </Button>
  );
}

export default function LogoutButton() {
  return (
    <form action={signOut} className="flex flex-col w-full">
      <Submit />
    </form>
  );
}

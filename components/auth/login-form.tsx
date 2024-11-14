"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { signIn } from "@/app/auth/actions";

const formSchema = z.object({
  email: z.string().email({ message: "Ingrese una dirección de correo electrónico válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
})

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values

    const formData = new FormData()

    formData.append("email", email)
    formData.append("password", password)

    setIsLoading(true)

    await signIn(formData)

    setIsLoading(true)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input placeholder="Escriba aquí..." type="email" {...field} />
              </FormControl>
              <FormDescription>
                Ingrese la dirección de correo electrónico con la que creó su cuenta en NicAhorro.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="Escriba aquí..." type="password" {...field} />
              </FormControl>
              <FormDescription>
                Ingrese la contraseña con la que creó su cuenta en NicAhorro.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="flex flex-col w-full gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <LoaderCircle className="w-4 h-4 mr-2" />}
            Iniciar Sesión
          </Button>
          <Button variant="outline" type="button" asChild disabled={isLoading}>
            <Link href="/auth/register">
              Crear Cuenta
            </Link>
          </Button>
        </section>
      </form>
    </Form>
  )
}
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { login } from "@/app/auth/actions";

const formSchema = z.object({
  email: z.string().email({ message: 'Ingrese una dirección de correo electrónico válida.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;

    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    setIsLoading(true);

    await login(formData);

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Escriba aquí..." {...field} />
              </FormControl>
              <FormDescription>
                Ingrese el correo electrónico con el que fue creada su cuenta en NicAhorro.
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
                <Input type="password" placeholder="Escriba aquí..." {...field} />
              </FormControl>
              <FormDescription>
                Ingrese la contraseña que está vinculada a su cuenta en NicAhorro.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <section className="w-full flex flex-col gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
            Iniciar Sesión
          </Button>
          <Button type="button" variant="outline" asChild disabled={isLoading}>
            <Link href="/auth/register">Crear Cuenta</Link>
          </Button>
        </section>
      </form>
    </Form>
  )
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import Link from 'next/link';
import { ReloadIcon } from '@radix-ui/react-icons';
import { login } from '@/app/auth/actions';

const formSchema = z.object({
  email: z.string().email('Ingrese una dirección de correo válida.'),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;

    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    setIsLoading(!isLoading);
    await login(formData);
    setIsLoading(!isLoading);
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
                <Input placeholder="Escriba aquí" type="email" {...field} />
              </FormControl>
              <FormDescription>
                Ingrese el correo electrónico con el que creó su cuenta de
                NicAhorro.
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
                <Input placeholder="Escriba aquí" type="password" {...field} />
              </FormControl>
              <FormDescription>
                Ingrese la contraseña con la que creó su cuenta de NicAhorro.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <section className="flex flex-col items-center w-full gap-4">
          <Button className="w-full" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Iniciar Sesión
          </Button>
          <Button asChild className="w-full" variant="outline">
            <Link href="/auth/register">Crear Cuenta</Link>
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default LoginForm;

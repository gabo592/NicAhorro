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
import { ChangeEvent, useState } from 'react';
import { Button } from '../ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { signup } from '@/app/auth/actions';

const formSchema = z.object({
  image: z.any(),
  firstname: z
    .string()
    .min(3, { message: 'El primer nombre debe tener al menos 3 caracteres.' }),
  lastname: z.string().min(3, {
    message: 'El primer apellido debe tener al menos 3 caracteres.',
  }),
  email: z.string().email('Ingrese una dirección de correo válida.'),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

const RegisterForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!image || image == null) {
      alert('La imagen es requerida.');
      return;
    }

    const { email, firstname, lastname, password } = values;

    const formData = new FormData();

    formData.append('image', image);
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);

    setIsLoading(!isLoading);
    await signup(formData);
    setIsLoading(!isLoading);
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (!files || files == null) {
      return;
    }

    const file = files[0];

    setImage(file);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Foto de Perfil</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageChange(event)}
                />
              </FormControl>
              <FormDescription>
                Podrá cambiar su foto de perfil posteriormente en Ajustes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primer Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Escriba aquí" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primer Apellido</FormLabel>
              <FormControl>
                <Input placeholder="Escriba aquí" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                Ingrese el correo electrónico con el que desea crear su cuenta
                de NicAhorro.
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
                Ingrese la contraseña con la que desea crear su cuenta de
                NicAhorro.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isLoading}>
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Crear Cuenta
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;

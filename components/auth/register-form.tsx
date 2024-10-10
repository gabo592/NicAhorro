"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { signUp } from "@/app/auth/actions";

const formSchema = z.object({
  image: z.any(),
  firstName: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres.' }),
  lastName: z.string().min(3, { message: 'El apellido debe tener al menos 3 caracteres.' }),
  email: z.string().email({ message: 'Ingrese una dirección de correo electrónico válida.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
});

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: null,
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedImage) {
      alert('La imagen es requerida.');
      return;
    }

    const { firstName, lastName, email, password } = values;

    const formData = new FormData();

    formData.append('image', selectedImage);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);

    setIsLoading(true);

    await signUp(formData);

    setIsLoading(false);
  }

  function handleSelectedImage(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files) {
      alert('Se requiere de una imagen para continuar');
      return;
    }

    const file = files[0];

    setSelectedImage(file);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto de Perfil</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={handleSelectedImage} onBlur={field.onBlur} />
              </FormControl>
              <FormDescription>
                Selecciona una foto de perfil. Esta se podrá cambiar posteriormente en el apartado de Perfil.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primer Nombre</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Escriba aquí..." {...field} />
              </FormControl>
              <FormDescription>
                Ingrese el nombre con el que se identifica.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primer Apellido</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Escriba aquí..." {...field} />
              </FormControl>
              <FormDescription>
                Ingrese el apellido con el que se identifica.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
          Crear Cuenta
        </Button>
      </form>
    </Form>
  )
}

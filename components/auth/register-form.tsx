"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { ChangeEvent, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { LoaderCircle } from "lucide-react"
import { signUp } from "@/app/auth/actions"

const formSchema = z.object({
  image: z.any(),
  firstName: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
  lastName: z.string().min(3, { message: "El apellido debe tener al menos 3 caracteres." }),
  email: z.string().email({ message: "Ingrese una dirección de correo electrónico válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
})

export default function RegisterForm() {
  const [image, setImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!image) {
      alert("La foto de perfil es requerida.")
      return
    }

    const { firstName, lastName, email, password } = values

    const formData = new FormData()

    formData.append("image", image)
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("email", email)
    formData.append("password", password)

    setIsLoading(true)

    await signUp(formData)

    setIsLoading(false)
  }

  function handleSelectedImage(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files) {
      alert('Se requiere de una imagen para continuar');
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
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Escriba aquí..." type="text" {...field} />
              </FormControl>
              <FormDescription>
                Puede ser su primer nombre o segundo nombre, el que prefiera.
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
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input placeholder="Escriba aquí..." type="text" {...field} />
              </FormControl>
              <FormDescription>
                Puede ser su primer apellido o segundo apellido, el que prefiera.
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
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <LoaderCircle className="w-4 h-4 mr-2" />}
          Iniciar Sesión
        </Button>
      </form>
    </Form>
  )
}
'use client';

import { useToast } from '@/hooks/use-toast';
import { Currency } from '@/types/currency';
import { SavingAccount, SavingAccountEntity } from '@/types/saving_account';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';
import {
  createSavingAccount,
  updateSavingAccount,
} from '@/app/saving-accounts/actions';

interface Props {
  savingAccount?: SavingAccount;
  currencies: Currency[];
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido.' }),
  description: z.string().min(1, { message: 'La descripción es requerida.' }),
  balance: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'El balance debe ser un número mayor o igual a 0 (cero).',
  }),
  currencyId: z
    .string()
    .uuid({ message: 'El ID de la Moneda debe ser válido.' }),
});

export default function SavingAccountsForm({
  savingAccount,
  currencies,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: savingAccount ? savingAccount.name : '',
      description: savingAccount ? savingAccount.description : '',
      balance: savingAccount ? savingAccount.balance.toString() : '0',
      currencyId: savingAccount ? savingAccount.currency_id : '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, description, balance, currencyId } = values;

    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('balance', balance);
    formData.append('currencyId', currencyId);

    setIsLoading(true);

    let result: SavingAccountEntity | null = null;

    if (savingAccount) {
      formData.append('id', savingAccount.id);
      result = await updateSavingAccount(formData);
    } else {
      result = await createSavingAccount(formData);
    }

    if (result) {
      toast({
        title: 'Se ha guardado con éxito.',
        description: 'Puede continuar con sus actividades.',
      });

      if (!savingAccount) {
        form.reset();
      }
    } else {
      toast({
        variant: 'destructive',
        title: '¡Uh oh! Parece que algo salió mal.',
        description: 'Intente nuevamente.',
      });
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Escriba aquí..." {...field} />
              </FormControl>
              <FormDescription>
                El nombre ayuda a identificar más rápido la Cuenta de Ahorro.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea placeholder="Escriba aquí..." {...field} />
              </FormControl>
              <FormDescription>
                Proporciona información adicional, por ejemplo, el propósito de
                la Cuenta de Ahorro.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Escriba aquí..." {...field} />
              </FormControl>
              <FormDescription>
                Indica la cantidad de dinero inicial en la Cuenta de Ahorro.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currencyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moneda</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una moneda" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {currencies.map((item, index) => (
                    <SelectItem key={`item-${index}`} value={item.id}>
                      {item.iso3_code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                La moneda indica la magnitud del dinero guardado en una Cuenta
                de Ahorro.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
          Guardar
        </Button>
      </form>
    </Form>
  );
}

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
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { SavingAccount } from '@/types/saving-account';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { Transaction, TransactionEntity } from '@/types/transaction';
import { createTransaction, updateTransaction } from '@/app/transactions/actions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  description: z.string().min(0, { message: 'La descripción es necesaria.' }),
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) !== 0, {
      message: 'El monto debe ser un número diferente de 0 (cero).',
    }),
  accountId: z
    .string()
    .uuid({ message: 'El ID de la cuenta debe ser válido.' }),
});

interface Props {
  savingAccounts: SavingAccount[];
  transaction?: Transaction;
}

export default function TransactionForm({ savingAccounts, transaction }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: transaction ? transaction.description : '',
      amount: transaction ? transaction.amount.toString() : '0',
      accountId: transaction ? transaction.account_id : '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { description, amount, accountId } = values;

    const formData = new FormData();

    formData.append('description', description);
    formData.append('amount', amount);
    formData.append('accountId', accountId);

    setIsLoading(true);

    let result: TransactionEntity | null = null;

    if (transaction) {
      formData.append('id', transaction.id);
      result = await updateTransaction(formData);
    } else {
      result = await createTransaction(formData);
    }

    if (result) {
      toast({
        title: 'Se ha guardado con éxito.',
        description: 'Puede continuar con sus actividades.'
      });

      if (!transaction) {
        form.reset();
      }
    } else {
      toast({
        variant: 'destructive',
        title: '¡Uh oh! Parece que algo salió mal.',
        description: 'Intente nuevamente.'
      });
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                Proporciona información adicional acerca de la transacción.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormDescription>
                Las cantidades POSITIVAS indican un INGRESO, las cantidades
                NEGATIVAS indican un EGRESO.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuenta de Ahorro</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una Cuenta." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {savingAccounts.map((savingAccount) => (
                    <SelectItem key={savingAccount.id} value={savingAccount.id}>
                      {savingAccount.name} ({savingAccount.currency?.iso3_code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                El balance de la Cuenta de Ahorro seleccionada se verá afectado
                por el monto de la transacción.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <LoaderCircle className='w-4 h-4 mr-2 animate-spin' />}
          Guardar
        </Button>
      </form>
    </Form>
  );
}

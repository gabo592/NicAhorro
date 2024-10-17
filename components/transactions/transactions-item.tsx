import { Transaction } from '@/types/transaction';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import DeleteAlertDialog from '../common/delete-alert-dialog';
import { deleteTransaction } from '@/app/transactions/actions';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowLeftRight, Edit } from 'lucide-react';

interface Props {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: Props) {
  const isIncome = transaction.amount > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowLeftRight className='w-4 h-4' />
          {transaction.description}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-2xl font-semibold ${isIncome ? 'text-primary' : 'text-destructive'}`}>
          {transaction.amount.toLocaleString(
            transaction.account?.currency?.locale,
            {
              style: 'currency',
              currency: transaction.account?.currency?.iso3_code,
            }
          )}
        </p>
        <p className="text-sm text-muted-foreground">{new Date(transaction.created_at).toLocaleDateString()}</p>
      </CardContent>
      <CardFooter className='flex justify-end gap-2'>
        <DeleteAlertDialog action={deleteTransaction} id={transaction.id} />
        <Button variant='secondary' asChild>
          <Link href={`/transactions/${transaction.id}`}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

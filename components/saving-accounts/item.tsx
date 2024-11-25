import { SavingAccount } from '@/types/saving_account';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Edit, Info, Landmark } from 'lucide-react';
import { formatCurrency } from '@/utils/common/formats';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import DeleteAlertDialog from '../common/delete-alert-dialog';
import { deleteSavingAccount } from '@/app/saving-accounts/actions';

interface Props {
  item: SavingAccount;
}

export default function SavingAccountsListItem({ item }: Props) {
  return (
    <Card className="w-full max-w-md flex flex-col justify-between">
      <CardHeader className='flex flex-col items-start justify-between gap-2'>
        <CardTitle className="flex items-center gap-2">
          <Landmark className="w-4 h-4" />
          {item.name}
        </CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <section className="flex justify-between items-center">
          <span className="text-2xl font-bold">
            {formatCurrency({
              locales: item.currency?.locale,
              currencyISO3Code: item.currency?.iso3_code,
              value: item.balance,
            })}
          </span>
          <Badge variant='secondary'>{item.currency?.iso2_code}</Badge>
        </section>
      </CardContent>
      <CardFooter className='flex flex-col items-start gap-4'>
        <section className="flex items-center gap-1">
          <Info className="h-4 w-4" />
          Creada el {new Date(item.created_at).toLocaleDateString()}
        </section>
        <section className="flex justify-end gap-2 w-full">
          <DeleteAlertDialog onAction={deleteSavingAccount} id={item.id} />
          <Button variant="secondary" asChild>
            <Link href={`/saving-accounts/${item.id}`}>
              <Edit className="h-4 w-4" />
              Editar
            </Link>
          </Button>
        </section>
      </CardFooter>
    </Card>
  );
}

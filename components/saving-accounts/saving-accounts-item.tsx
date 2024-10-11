import { SavingAccount } from '@/types/saving-account';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Edit, Info, Landmark } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import DeleteAlertDialog from '../common/delete-alert-dialog';
import { deleteSavingAccount } from '@/app/saving-accounts/actions';

interface SavingAccountsItemProps {
  savingAccount: SavingAccount;
}

export default function SavingAccountsItem({
  savingAccount,
}: SavingAccountsItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Landmark className="w-4 h-4" />
          {savingAccount.name}
        </CardTitle>
        <CardDescription>{savingAccount.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <section className="flex justify-between items-center">
          <span className="text-2xl font-bold">
            {savingAccount.balance.toLocaleString(
              savingAccount.currency?.locale,
              {
                style: 'currency',
                currency: savingAccount.currency?.iso3_code,
              }
            )}
          </span>
          <Badge variant="secondary">{savingAccount.currency?.iso3_code}</Badge>
        </section>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <section className="flex items-center gap-1 text-sm text-muted-foreground w-full">
          <Info className="h-4 w-4" />
          Creada el {new Date(savingAccount.created_at).toLocaleDateString()}
        </section>
        <section className="flex justify-end gap-2 w-full">
          <DeleteAlertDialog action={deleteSavingAccount} id={savingAccount.id} />
          <Button variant="secondary" asChild>
            <Link href={`saving-accounts/${savingAccount.id}`}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Link>
          </Button>
        </section>
      </CardFooter>
    </Card>
  );
}

import { SavingAccount } from '@/types/saving-account';
import { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/utils/common/formatters';

interface SavingAccountsItemProps {
  item: SavingAccount;
}

const SavingAccountsItem: FC<SavingAccountsItemProps> = ({ item }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col items-start gap-4">
          <p>
            {formatCurrency(
              item.balance,
              item.currency?.iso3_code,
              item.currency?.locale
            )}
          </p>
        </section>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between">
        <Button variant="destructive">
          <Trash2 className="w-4 h-4 mr-2" />
          Eliminar
        </Button>
        <Button variant="outline">
          <Pencil className="w-4 h-4 mr-2" />
          Editar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SavingAccountsItem;

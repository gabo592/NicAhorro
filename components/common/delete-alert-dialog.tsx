'use client';

import { LoaderCircle, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { useState } from 'react';

interface Props {
  onAction: (id: string) => Promise<void>;
  id: string;
}

export default function DeleteAlertDialog({ onAction, id }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleOnClick() {
    setIsLoading(true);
    await onAction(id);
    setIsLoading(false);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="w-4 h-4" />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¡Peligro!</AlertDialogTitle>
          <AlertDialogDescription>
            Está a punto de eliminar información valiosa de manera permanente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={() => handleOnClick()}>
            {isLoading && <LoaderCircle className='w-4 h-4 mr-2 animate-spin' />}
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

'use client';

import { logout } from '@/app/auth/actions';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(!isLoading);
    await logout();
    setIsLoading(!isLoading);
  }

  return (
    <Button
      variant="destructive"
      className="w-full"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;

import { Route } from '@/models/route';
import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import LogoutButton from '../common/logout-button';

interface AvatarMenuProps {
  user: User;
  routes: Route[];
}

function getInitials(firstname: string, lastname: string) {
  const firstLetter = firstname.split('')[0].toUpperCase();
  const secondLetter = lastname.split('')[0].toUpperCase();

  const initials = `${firstLetter}${secondLetter}`;

  return initials;
}

const AvatarMenu: FC<AvatarMenuProps> = ({ user, routes }) => {
  const { avatar_url, first_name, last_name } = user.user_metadata;

  const firstname = first_name as string;
  const lastname = last_name as string;
  const avatarUrl = avatar_url as string;

  const initials = getInitials(firstname, lastname);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {routes.map((route) => (
            <DropdownMenuItem key={route.title}>
              <Link
                href={route.path}
                className="flex flex-row items-center w-full"
              >
                {route.icon && <route.icon className="mr-2 h-4 w-4" />}
                {route.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarMenu;

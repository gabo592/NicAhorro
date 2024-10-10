import { getUser } from "@/app/auth/actions";
import { redirect } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { avatarMenuRoutes } from "@/constant/routes";
import Link from "next/link";
import LogoutButton from "../common/logout-button";

function getInitials(firstName: string, lastName: string) {
  const firstNameLetters = firstName.split('');
  const lastNameLetters = lastName.split('');

  const initials = `${firstNameLetters[0]}${lastNameLetters[0]}`;

  return initials;
}

export default async function AvatarMenu() {
  const user = await getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { avatar_url, first_name, last_name } = user;
  const initials = getInitials(first_name, last_name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="hover:cursor-pointer">
          <AvatarImage src={avatar_url} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {avatarMenuRoutes.map((route) => (
          <DropdownMenuItem key={route.path} asChild>
            <Link href={route.path} className="flex flex-row items-center gap-2">
              {route.icon && <route.icon className="w-4 h-4" />}
              {route.title}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

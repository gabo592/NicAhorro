import { Route } from '@/models/route';
import { FC } from 'react';
import Link from 'next/link';

interface SideBarMenuProps {
  routes: Route[];
}

const SideBarMenu: FC<SideBarMenuProps> = ({ routes }) => {
  return (
    <section className="flex flex-col items-start w-full">
      {routes.map((route) => (
        <Link
          key={route.title}
          href={route.path}
          className="flex flex-row items-center hover:bg-accent hover:text-accent-foreground w-full p-3 rounded-md"
        >
          {route.icon && <route.icon className="mr-2 h-4 w-4" />}
          {route.title}
        </Link>
      ))}
    </section>
  );
};

export default SideBarMenu;

import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Separator } from '../ui/separator';
import { Route } from '@/models/route';
import { FC } from 'react';
import SideBarMenu from './sidebar-menu';

interface SideBarProps {
  routes: Route[];
}

const SideBar: FC<SideBarProps> = ({ routes }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
          <SheetDescription>Menú de navegación.</SheetDescription>
        </SheetHeader>

        <Separator />

        <SideBarMenu routes={routes} />
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;

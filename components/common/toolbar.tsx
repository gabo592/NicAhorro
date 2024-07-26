import { Route } from '@/models/route';
import {
  CalendarDays,
  ChartNoAxesCombined,
  Goal,
  House,
  Landmark,
  Settings,
  User as UserIcon,
} from 'lucide-react';
import { FC } from 'react';
import { User } from '@supabase/supabase-js';
import SideBar from '../sidebar/sidebar';
import AvatarMenu from '../avatar-menu/avatar-menu';

const routes: Route[] = [
  {
    title: 'Inicio',
    path: '/',
    icon: House,
  },
  {
    title: 'Panel de Estadísticas',
    path: '/dashboard',
    icon: ChartNoAxesCombined,
  },
  {
    title: 'Metas de Ahorro',
    path: '/saving-goals',
    icon: Goal,
  },
  {
    title: 'Planificador',
    path: '/planner',
    icon: CalendarDays,
  },
  {
    title: 'Cuentas de Ahorro',
    path: '/saving-accounts',
    icon: Landmark,
  },
];

const avatarRoutes: Route[] = [
  {
    title: 'Cuenta',
    path: '/account',
    icon: UserIcon,
  },
  {
    title: 'Ajustes',
    path: '/settings',
    icon: Settings,
  },
];

interface ToolBarProps {
  user: User;
}

const ToolBar: FC<ToolBarProps> = ({ user }) => {
  return (
    <header className="flex flex-row items-center justify-between p-4">
      <SideBar routes={routes} />

      <h1 className="text-xl font-bold">NicAhorro</h1>

      <AvatarMenu user={user} routes={avatarRoutes} />
    </header>
  );
};

export default ToolBar;

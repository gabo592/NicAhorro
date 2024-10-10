import {
  ArrowLeftRight,
  Banknote,
  ChartLine,
  HandCoins,
  House,
  Landmark,
  LucideProps,
  Settings,
  User,
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface Route {
  title: string;
  path: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
}

export const sidebarRoutes: Route[] = [
  {
    title: 'Inicio',
    path: '/',
    icon: House,
  },
  {
    title: 'Panel de Estadísticas',
    path: '/dashboard',
    icon: ChartLine,
  },
  {
    title: 'Presupuestos',
    path: '/budgets',
    icon: Banknote,
  },
  {
    title: 'Metas de Ahorro',
    path: '/saving-goals',
    icon: HandCoins,
  },
  {
    title: 'Transacciones',
    path: '/transactions',
    icon: ArrowLeftRight,
  },
  {
    title: 'Cuentas de Ahorro',
    path: '/saving-accounts',
    icon: Landmark,
  },
];

export const avatarMenuRoutes: Route[] = [
  {
    title: 'Mi Perfil',
    path: '/profile',
    icon: User,
  },
  {
    title: 'Ajustes',
    path: '/settings',
    icon: Settings,
  },
];

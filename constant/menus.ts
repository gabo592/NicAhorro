import { Route } from "@/types/route";
import {
  ArrowRightLeft,
  Coins,
  CreditCard,
  Goal,
  Home,
  Landmark,
  Settings,
  User,
} from "lucide-react";

export const APP_MENU: Route[] = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  {
    title: "Presupuestos",
    url: "/budgets",
    icon: Coins,
  },
  {
    title: "Cuentas de Ahorro",
    url: "/saving-accounts",
    icon: Landmark,
  },
  {
    title: "Metas de Ahorro",
    url: "/saving-goals",
    icon: Goal,
  },
  {
    title: "Transacciones",
    url: "/transactions",
    icon: ArrowRightLeft,
  },
];

export const SETTINGS_MENU: Route[] = [
  {
    title: "Ajustes Generales",
    url: "/settings",
    icon: Settings,
  },
];

export const AVATAR_MENU: Route[] = [
  {
    title: "Mi Perfil",
    url: "/profile",
    icon: User,
  },
  {
    title: "Facturación",
    url: "/billing",
    icon: CreditCard,
  },
];

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.admin.overview, icon: 'chart-pie' },
  { key: 'customers', title: 'Customers', href: paths.admin.customers, icon: 'users' },
  { key: 'integrations', title: 'Integrations', href: paths.admin.integrations, icon: 'plugs-connected' },
  { key: 'settings', title: 'Settings', href: paths.admin.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.admin.account, icon: 'user' },
  { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];

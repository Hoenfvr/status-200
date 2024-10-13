import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'approve', title: 'Approve', href: paths.admin.approve, icon: 'chart-pie' },
  { key: 'calendar', title: 'Calendar', href: paths.admin.calendar, icon: 'users' },
  { key: 'bookingList', title: 'Booking list', href: paths.admin.bookingList, icon: 'plugs-connected' },
  { key: 'employee', title: 'Employee', href: paths.admin.employee, icon: 'gear-six' },
  { key: 'room', title: 'Room', href: paths.admin.room, icon: 'user' },
  { key: 'dashboard', title: 'Dashboard', href: paths.admin.dashboard, icon: 'user' },
  { key: 'logout', title: 'Logout', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];

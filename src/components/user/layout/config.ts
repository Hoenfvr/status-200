import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'calendar', title: 'Calendar', href: paths.user.calendar, icon: 'chart-pie' },
  { key: 'booking', title: 'Booking', href: paths.user.booking, icon: 'users' },
  { key: 'bookingList', title: 'Booking List', href: paths.user.bookingList, icon: 'user' },
] satisfies NavItemConfig[];

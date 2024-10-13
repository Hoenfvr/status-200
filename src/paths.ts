//original code
// export const paths = {
//   home: '/',
//   auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
//   dashboard: {
//     overview: '/dashboard',
//     account: '/dashboard/account',
//     customers: '/dashboard/customers',
//     integrations: '/dashboard/integrations',
//     settings: '/dashboard/settings',
//   },
//   errors: { notFound: '/errors/not-found' },
// } as const;

// export const paths = {
//   home: '/',
//   auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
//   admin: {
//     overview: '/admin',
//     account: '/admin/account',
//     customers: '/admin/customers',
//     integrations: '/admin/integrations',
//     settings: '/admin/settings',
//     calendar: '/admin/calendar',
//   },
//   errors: { notFound: '/errors/not-found' },
// } as const;

export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  admin: {
    approve: '/admin',
    calendar: '/admin/calendar',
    bookingList: '/admin/booking-list',
    employee: '/admin/employee',
    room: '/admin/room',
    dashboard: '/admin/dashboard',
    logout: '/admin/logout',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
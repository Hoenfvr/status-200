export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  admin: {
    approve: '/admin',
    calendar: '/admin/calendar',
    booking: '/admin/booking',
    bookingList: '/admin/booking-list',
    employee: '/admin/employee',
    room: '/admin/room',
    dashboard: '/admin/dashboard',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
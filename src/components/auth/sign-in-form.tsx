//#legendstart original code
'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  username: zod.string().min(1, { message: 'username is required' }).username(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { username: 'sofia@devias.io', password: 'Secret1' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.signInWithPassword(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh();
    },
    [checkSession, router, setError]
  );

  return (
    <Stack spacing={4} sx={{pb:'143px'}} >
      <Stack spacing={1}>
        <Typography color="#fff" variant="h4">
          Sign in
        </Typography>
        <Typography color="#fff" variant="body2">
          Don&apos;t have an account?{' '}
          <Link  component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
            Sign up
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <FormControl error={Boolean(errors.username)}>
                <InputLabel>username</InputLabel>
                <OutlinedInput
                  {...field}
                  label="username address"
                  type="username"
                  sx={{ color: '#fff'}}
                />
                {errors.username ? <FormHelperText>{errors.username.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  sx={{ color: '#fff'}}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <div>
            <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
              Forgot password?
            </Link>
          </div>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Sign in
          </Button>
        </Stack>
      </form>
      <Alert color="warning">
        Use{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          sofia@devias.io
        </Typography>{' '}
        with password{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          Secret1
        </Typography>
      </Alert>
    </Stack>
  );
}
//#legendend

// 'use client';

// import * as React from 'react';
// import RouterLink from 'next/link';
// import { useRouter } from 'next/navigation';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Alert from '@mui/material/Alert';
// import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
// import InputLabel from '@mui/material/InputLabel';
// import Link from '@mui/material/Link';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
// import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
// import { Controller, useForm } from 'react-hook-form';
// import { z as zod } from 'zod';

// import { paths } from '@/paths';
// import { authClient } from '@/lib/auth/client';
// import { useUser } from '@/hooks/use-user';

// const schema = zod.object({
//   username: zod.string().min(1, { message: 'Username is required' }),
//   password: zod.string().min(1, { message: 'Password is required' }),
// });

// type Values = zod.infer<typeof schema>;

// const defaultValues = { username: 'admin1', password: '1234' } satisfies Values;

// export function SignInForm(): React.JSX.Element {
//   const router = useRouter();
//   const { checkSession } = useUser();
//   const [showPassword, setShowPassword] = React.useState<boolean>(false);
//   const [isPending, setIsPending] = React.useState<boolean>(false);

//   const { control, handleSubmit, setError, formState: { errors } } = useForm<Values>({
//     defaultValues,
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = React.useCallback(
//     async (values: Values): Promise<void> => {
//       setIsPending(true);
  
//       try {
//         // เรียกใช้งาน API จาก JSON Server เพื่อตรวจสอบผู้ใช้
//         const response = await fetch(
//           `http://localhost:3005/users?username=${values.username}&password=${values.password}`
//         );
        
//         const users = await response.json();
  
//         // ตรวจสอบว่ามีผู้ใช้ที่ตรงกับ username และ password หรือไม่
//         if (users.length === 0) {
//           throw new Error('Invalid username or password');
//         }
  
//         // Sign-in สำเร็จ ทำการ refresh session และ redirect
//         await checkSession?.();
//         router.refresh();
//         // router.replace(paths.admin.approve);
        
//       } catch (error) {
//         setError('root', { type: 'server', message: (error as Error).message });
//         setIsPending(false);
//         return;
//       }
//     },
//     [checkSession, router, setError]
//   );
  

//   return (
//     <Stack spacing={4} sx={{ pb: '143px', color: 'text.primary' }}>
//       <Stack spacing={1}>
//         <Typography color="#fff" variant="h4">
//           Sign in
//         </Typography>
//         <Typography color="#fff" variant="body2">
//           Don&apos;t have an account?{' '}
//           <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
//             Sign up
//           </Link>
//         </Typography>
//       </Stack>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Stack spacing={2}>
//           <Controller
//             control={control}
//             name="username"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.username)}>
//                 <InputLabel>Username</InputLabel>
//                 <OutlinedInput {...field} label="Username" sx={{ color: '#fff' }} />
//                 {errors.username ? <FormHelperText>{errors.username.message}</FormHelperText> : null}
//               </FormControl>
//             )}
//           />
//           <Controller
//             control={control}
//             name="password"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.password)}>
//                 <InputLabel>Password</InputLabel>
//                 <OutlinedInput
//                   {...field}
//                   endAdornment={showPassword ? (
//                     <EyeIcon cursor="pointer" onClick={() => setShowPassword(false)} />
//                   ) : (
//                     <EyeSlashIcon cursor="pointer" onClick={() => setShowPassword(true)} />
//                   )}
//                   label="Password"
//                   type={showPassword ? 'text' : 'password'}
//                   sx={{ color: '#fff' }}
//                 />
//                 {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
//               </FormControl>
//             )}
//           />
//           <div>
//             <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
//               Forgot password?
//             </Link>
//           </div>
//           {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
//           <Button disabled={isPending} type="submit" variant="contained">
//             Sign in
//           </Button>
//         </Stack>
//       </form>
//     </Stack>
//   );
// }
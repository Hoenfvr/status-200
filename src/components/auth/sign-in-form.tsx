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
import { authClient } from '@/lib/auth/client'; // นำเข้า authClient จากไฟล์ที่กำหนด
import { useUser } from '@/hooks/use-user';
import { useState } from 'react';

// กำหนด Schema สำหรับการตรวจสอบข้อมูล
const schema = zod.object({
  username: zod.string().min(1, { message: 'Username is required' }),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

// ค่าปริยายสำหรับฟอร์ม
const defaultValues = { username: 'john_doe', password: 'password123' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();
  const { checkSession } = useUser();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const { control, handleSubmit, setError, formState: { errors } } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      console.log('Submitted values:', values);
      setIsPending(true);

      // เรียกใช้ authenticateUser จาก authClient
      const { error } = await authClient.authenticateUser(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      // Refresh the auth state
      await checkSession?.();

      // Refresh the router after successful login
      router.refresh();
    },
    [checkSession, router, setError]
  );

  return (
    <Stack spacing={4} sx={{ pb: '143px', color: 'text.primary' }}>
      <Stack spacing={1}>
        <Typography color="#fff" variant="h4">
          Sign in
        </Typography>
        <Typography color="#fff" variant="body2">
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
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
                <InputLabel>Username</InputLabel>
                <OutlinedInput {...field} label="Username" sx={{ color: '#fff' }} />
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
                  endAdornment={showPassword ? (
                    <EyeIcon cursor="pointer" onClick={() => setShowPassword(false)} />
                  ) : (
                    <EyeSlashIcon cursor="pointer" onClick={() => setShowPassword(true)} />
                  )}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  sx={{ color: '#fff' }}
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
    </Stack>
  );
}

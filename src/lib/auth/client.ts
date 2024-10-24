// #Legendstart original code
// 'use client';

// import type { User } from '@/types/user';

// function generateToken(): string {
//   const arr = new Uint8Array(12);
//   window.crypto.getRandomValues(arr);
//   return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
// }

// export interface SignUpParams {
//   firstName: string;
//   lastName: string;
//   username: string;
//   password: string;
// }

// export interface SignInWithOAuthParams {
//   provider: 'google' | 'discord';
// }

// export interface SignInWithPasswordParams {
//   username: string;
//   password: string;
// }

// export interface ResetPasswordParams {
//   email: string;
// }

// class AuthClient {
//   async signUp(_: SignUpParams): Promise<{ error?: string }> {
//     // Make API request

//     // We do not handle the API, so we'll just generate a token and store it in localStorage.
//     const token = generateToken();
//     localStorage.setItem('custom-auth-token', token);

//     return {};
//   }

//   async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
//     return { error: 'Social authentication not implemented' };
//   }

//   async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
//     const { username, password } = params;

//     // Make API request

//     // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
//     if (username !== 'admin1' || password !== '1234') {
//       return { error: 'Invalid credentials' };
//     }

//     const token = generateToken();
//     localStorage.setItem('custom-auth-token', token);

//     return {};
//   }

//   async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
//     return { error: 'Password reset not implemented' };
//   }

//   async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
//     return { error: 'Update reset not implemented' };
//   }

//   async getUser(): Promise<{ data?: User | null; error?: string }> {
//     // Make API request

//     // We do not handle the API, so just check if we have a token in localStorage.
//     const token = localStorage.getItem('custom-auth-token');

//     if (!token) {
//       return { data: null };
//     }

//     return { data: user };
//   }

//   async signOut(): Promise<{ error?: string }> {
//     localStorage.removeItem('custom-auth-token');

//     return {};
//   }
// }

// export const authClient = new AuthClient();
// #Legendend

'use client';

import type { User } from '@/types/user';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

export interface SignUpParams {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface SignInWithPasswordParams {
  username: string;
  password: string;
}

class AuthClient {
  // Sign up - you can implement if needed
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);
    return {};
  }

  // Sign in with password
  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { username, password } = params;

    try {
      // Fetch users from JSON server
      const response = await fetch('http://localhost:3005/users');
      const users: User[] = await response.json();

      // Find the user with the matching credentials
      const user = users.find(u => u.username === username && u.password === password);

      if (!user) {
        return { error: 'Invalid credentials' };
      }

      // Generate token and store in localStorage
      const token = generateToken();
      localStorage.setItem('custom-auth-token', token);

      return {};
    } catch (error) {
      return { error: 'Error during authentication' };
    }
  }

  // Get the current logged-in user based on token
  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    try {
      // Fetch users from JSON server
      const response = await fetch('http://localhost:3005/users');
      const users: User[] = await response.json();

      // For simplicity, assume the first user matches (or extend logic to map tokens to users)
      const user = users[0]; // You might implement token-user mapping

      return { data: user || null };
    } catch (error) {
      return { error: 'Unable to fetch user data' };
    }
  }

  // Sign out
  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');
    return {};
  }
}

export const authClient = new AuthClient();


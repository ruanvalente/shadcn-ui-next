'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string) {
          cookieStore.set({ name, value, secure: true, httpOnly: true });
        },
        remove(name: string) {
          cookieStore.set({ name, value: '', secure: true, httpOnly: true });
        },
      },
    }
  );
}

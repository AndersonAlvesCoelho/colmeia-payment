'use client';

import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';

const queryClient = new QueryClient();

export function ContextGlobal({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster />
          
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </QueryClientProvider>
  );
}

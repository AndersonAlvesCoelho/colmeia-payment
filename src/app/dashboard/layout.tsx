'use client';

import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { ChargesProvider } from '@/contexts/ChargesContext';
import { CustomerProvider } from '@/contexts/CustomerContext';
import { redirect } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Carregando...</div>;
  if (!user) redirect('/auth/login');

  return (
    <CustomerProvider>
      <ChargesProvider>
        <div className="min-h-screen bg-background">
          <Header />
          {children}
        </div>
      </ChargesProvider>
    </CustomerProvider>
  );
}

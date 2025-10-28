'use client';

import { AuthService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = AuthService.getUser();
    if (!user) {
      router.push('/auth/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null; 

  return <>{children}</>;
}

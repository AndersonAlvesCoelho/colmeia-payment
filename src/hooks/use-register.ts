'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!name.trim()) throw new Error('Nome é obrigatório');
      if (password.length < 6)
        throw new Error('A senha deve ter pelo menos 6 caracteres');

      await register(email, password, name);

      toast({
        title: 'Cadastro realizado!',
        description: 'Sua conta foi criada com sucesso.',
      });

      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Erro ao cadastrar',
        description: error.message || 'Falha ao registrar. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user, router]);

  return {
    name,
    email,
    password,
    isLoading,
    setName,
    setEmail,
    setPassword,
    handleRegister,
    user,
  };
}

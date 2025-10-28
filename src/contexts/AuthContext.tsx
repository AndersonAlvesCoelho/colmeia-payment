'use client';

import { translatePgError } from '@/constants/serviceMessages';
import { useToast } from '@/hooks/use-toast';
import { AuthService } from '@/services/auth.service';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Carrega sessão do usuário ao iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await AuthService.me(token);
          setUser(userData);
        }
      } catch {
        localStorage.removeItem('token');
        toast({
          title: 'Sessão expirada',
          description: 'Por favor, faça login novamente.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [toast]);

  // Login
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { access_token, user } = await AuthService.login({ email, password });
        localStorage.setItem('token', access_token);
        setUser(user);

        toast({
          title: 'Login realizado com sucesso!',
          description: `Bem-vindo de volta, ${user.name}.`,
        });
      } catch (error: any) {
        const code = error.code || 'UNKNOWN';
        const message = translatePgError(code, 'Autenticação', error?.message);

        toast({
          title: 'Erro no login',
          description: message,
          variant: 'destructive',
        });

        throw new Error(message);
      }
    },
    [toast]
  );

  // Registro
  const register = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        const { access_token, user } = await AuthService.register({
          email,
          password,
          name,
        });
        localStorage.setItem('token', access_token);
        setUser(user);

        toast({
          title: 'Conta criada com sucesso!',
          description: `Bem-vindo, ${user.name}.`,
        });
      } catch (error: any) {
        const code = error.code || 'UNKNOWN';
        const message = translatePgError(code, 'Autenticação', error?.message);

        toast({
          title: 'Erro no login',
          description: message,
          variant: 'destructive',
        });

        throw new Error(message);
      }
    },
    [toast]
  );

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
    toast({
      title: 'Logout realizado',
      description: 'Você saiu da sua conta com segurança.',
    });
  }, [toast]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

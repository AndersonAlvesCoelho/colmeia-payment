'use client';

import { TPaginationType } from '@/@types/Pagination';
import { IResponseWithPaginatedResult } from '@/@types/response';
import { translatePgError } from '@/constants/serviceMessages';
import { useToast } from '@/hooks/use-toast';
import {
  CustomerService,
  ICustomerPayload,
  ICustomerResponse,
} from '@/services/customer.service';
import React, { createContext, useCallback, useContext, useState } from 'react';

interface CustomerContextProps {
  customers: ICustomerResponse[];
  isLoading: boolean;
  isLoadingService: boolean;
  customersToView: ICustomerResponse | null;
  createCustomer: (data: ICustomerPayload) => Promise<void>;
  updateCustomer: (
    id: string,
    data: Partial<ICustomerPayload>
  ) => Promise<void>;
  removeCustomer: (id: string) => Promise<boolean>;
  getCustomers: (
    params?: TPaginationType
  ) => Promise<IResponseWithPaginatedResult<ICustomerResponse>>;
  setCustomers: React.Dispatch<React.SetStateAction<ICustomerResponse[]>>;
  setCustomersToView: React.Dispatch<
    React.SetStateAction<ICustomerResponse | null>
  >;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerContext = createContext<CustomerContextProps | undefined>(
  undefined
);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<ICustomerResponse[]>([]);
  const [customersToView, setCustomersToView] =
    useState<ICustomerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingService, setIsLoadingService] = useState(false);

  const getCustomers = useCallback(
    async (params?: TPaginationType) => {
      setIsLoading(true);
      try {
        const res = await CustomerService.findAll(params);
        setCustomers(res.data);
        return res;
      } catch (error: any) {
        const code = error.code || 'UNKNOWN';
        const message = translatePgError(code, 'Cliente', error?.message);

        toast({
          title: 'Erro ao buscar clientes',
          description: message,
          variant: 'destructive',
        });
        setCustomers([]);
        return {
          data: [],
          total: 0,
          page: 1,
          limit: params?.limit ?? 10,
          totalPages: 0,
        };
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  const createCustomer = useCallback(
    async (data: ICustomerPayload) => {
      setIsLoadingService(true);
      try {
        const newCustomer = await CustomerService.create(data);
        setCustomers((prev) => [newCustomer, ...prev]);
        toast({
          title: 'Cliente criado!',
          description: `${newCustomer.name} foi adicionado com sucesso.`,
        });
      } catch (error: any) {
        const code = error.code || 'UNKNOWN';
        const message = translatePgError(code, 'Cliente', error?.message);

        toast({
          title: 'Erro ao criar cliente',
          description: message,
          variant: 'destructive',
        });

        throw error;
      } finally {
        setIsLoadingService(false);
      }
    },
    [toast]
  );

  const updateCustomer = useCallback(
    async (id: string, data: Partial<ICustomerPayload>) => {
      setIsLoadingService(true);
      try {
        const updated = await CustomerService.update(id, data);

        setCustomers((prev) => {
          const filtered = prev.filter((c) => c.id !== id);
          return [updated, ...filtered];
        });

        toast({
          title: 'Cliente atualizado!',
          description: `${updated.name} foi atualizado com sucesso.`,
        });
      } catch (error: any) {
        const code = error.code || 'UNKNOWN';
        const message = translatePgError(code, 'Cliente', error?.message);

        toast({
          title: 'Erro ao atualizar cliente',
          description: message,
          variant: 'destructive',
        });

        throw error;
      } finally {
        setIsLoadingService(false);
      }
    },
    [toast]
  );

  const removeCustomer = useCallback(
    async (id: string) => {
      setIsLoadingService(true);
      try {
        await CustomerService.remove(id);
        setCustomers((prev) => prev.filter((c) => c.id !== id));
        toast({
          title: 'Cliente removido!',
          description: 'O cliente foi removido com sucesso.',
        });
        return true;
      } catch (error: any) {
        const code = error.code || 'UNKNOWN';
        const message = translatePgError(code, 'Cliente', error?.message);

        toast({
          title: 'Erro ao remover cliente',
          description: message,
          variant: 'destructive',
        });

        return false;
      } finally {
        setIsLoadingService(false);
      }
    },
    [toast]
  );

  return (
    <CustomerContext.Provider
      value={{
        customers,
        isLoading,
        customersToView,
        isLoadingService,

        createCustomer,
        updateCustomer,
        removeCustomer,
        getCustomers,
        setCustomers,
        setIsLoading,
        setCustomersToView,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context)
    throw new Error('useCustomer deve ser usado dentro de CustomerProvider');
  return context;
};

'use client';

import { EnumChargeStatus } from '@/@types/enum.type';
import { TPaginationType } from '@/@types/Pagination';
import { IResponseWithPaginatedResult } from '@/@types/response';
import { translatePgError } from '@/constants/serviceMessages';
import { useToast } from '@/hooks/use-toast';
import {
  ChargesService,
  IChargesPayload,
  IChargesResponse,
} from '@/services/charges.service';
import React, { createContext, useCallback, useContext, useState } from 'react';

interface ChargesContextProps {
  charges: IChargesResponse[];
  isLoading: boolean;
  isLoadingService: boolean;
  chargesToView: IChargesResponse | null;
  createCharges: (data: IChargesPayload) => Promise<void>;
  updateCharges: (id: string, data: Partial<IChargesPayload>) => Promise<void>;
  updateChargeStatus: (id: string, status: EnumChargeStatus) => Promise<void>;
  removeCharges: (id: string) => Promise<boolean>;
  getCharges: (
    params?: TPaginationType
  ) => Promise<IResponseWithPaginatedResult<IChargesResponse>>;
  setCharges: React.Dispatch<React.SetStateAction<IChargesResponse[]>>;
  setChargesToView: React.Dispatch<
    React.SetStateAction<IChargesResponse | null>
  >;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChargesContext = createContext<ChargesContextProps | undefined>(
  undefined
);

export const ChargesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { toast } = useToast();
  const [charges, setCharges] = useState<IChargesResponse[]>([]);
  const [chargesToView, setChargesToView] = useState<IChargesResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingService, setIsLoadingService] = useState(false);

  const getCharges = useCallback(
    async (params?: TPaginationType) => {
      setIsLoading(true);
      try {
        const res = await ChargesService.findAll(params);
        setCharges(res.data);
        return res;
      } catch (error: any) {
        const code = error.code || 'UNKNOWN';
        const message = translatePgError(code, 'Cobrança', error?.message);

        toast({
          title: 'Erro ao buscar cobranças',
          description: message,
          variant: 'destructive',
        });
        setCharges([]);
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

  const createCharges = useCallback(
    async (data: IChargesPayload) => {
      setIsLoadingService(true);
      try {
        const newCharges = await ChargesService.create(data);
        setCharges((prev) => [newCharges, ...prev]);
        toast({
          title: 'Cobrança criado!',
          description: `Foi adicionado com sucesso.`,
        });
      } catch (error: any) {
        const code = error.code || 'UNKNOWN';
        const message = translatePgError(code, 'Cobrança', error?.message);

        toast({
          title: 'Erro ao criar cobrança',
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

  const updateCharges = useCallback(
    async (id: string, data: Partial<IChargesPayload>) => {
      setIsLoadingService(true);
      try {
        const updated = await ChargesService.update(id, data);

        setCharges((prev) => {
          const filtered = prev.filter((c) => c.id !== id);
          return [updated, ...filtered];
        });

        toast({
          title: 'Cobrança atualizado!',
          description: `Foi atualizado com sucesso.`,
        });
      } catch (error: any) {
        const code = error.code || 'UNKNOWN';
        const message = translatePgError(code, 'Cobrança', error?.message);

        toast({
          title: 'Erro ao atualizar cobrança',
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

  const removeCharges = useCallback(
    async (id: string) => {
      setIsLoadingService(true);
      try {
        await ChargesService.remove(id);
        setCharges((prev) => prev.filter((c) => c.id !== id));
        toast({
          title: 'Cobrança removido!',
          description: 'A cobrança foi removido com sucesso.',
        });
        return true;
      } catch (error: any) {
        const code = error.code || 'UNKNOWN';
        const message = translatePgError(code, 'Cobrança', error?.message);

        toast({
          title: 'Erro ao remover cobrança',
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

  const updateChargeStatus = useCallback(
    async (id: string, status: EnumChargeStatus) => {
      setIsLoadingService(true);
      try {
        const updated = await ChargesService.updateStatus(id, status);

        setCharges((prev) => {
          const filtered = prev.filter((c) => c.id !== id);
          return [updated, ...filtered];
        });

        toast({
          title: 'Cobrança atualizado!',
          description: `Foi atualizado com sucesso.`,
        });
      } catch (error: any) {
        const code = error.code || 'UNKNOWN';
        const message = translatePgError(code, 'Cobrança', error?.message);

        toast({
          title: 'Erro ao atualizar cobrança',
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

  return (
    <ChargesContext.Provider
      value={{
        charges,
        isLoading,
        chargesToView,
        isLoadingService,

        createCharges,
        updateCharges,
        removeCharges,
        updateChargeStatus,
        getCharges,
        setCharges,
        setIsLoading,
        setChargesToView,
      }}
    >
      {children}
    </ChargesContext.Provider>
  );
};

export const useCharges = () => {
  const context = useContext(ChargesContext);
  if (!context)
    throw new Error('useCharges deve ser usado dentro de ChargesProvider');
  return context;
};

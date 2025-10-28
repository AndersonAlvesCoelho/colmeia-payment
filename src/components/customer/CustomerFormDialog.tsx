'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCustomerForm } from '@/hooks/customer/useCustomerForm';
import { maskCpfCnpj } from '@/utils/mask';
import { maskPhone } from '@/utils/validate';
import { MailIcon, User2Icon } from 'lucide-react';
import * as React from 'react';
import { FormProvider } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';

interface CustomerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CustomerFormDialog: React.FC<CustomerFormDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { form, handleSubmit, handleClose, isEdit, isLoadingService } =
    useCustomerForm({ onOpenChange });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Editar Cliente' : 'Novo Cliente'}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4 py-4"
          >
            {/* Nome */}
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label className="flex items-center gap-1 text-base">
                      <User2Icon className="h-4 w-4 text-muted-foreground" />
                      Nome do cliente
                      <span className="text-red-500">*</span>
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="text-lg"
                        placeholder="Nome do cliente"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* E-mail */}
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label className="flex items-center gap-1 text-base">
                      <MailIcon className="h-4 w-4 text-muted-foreground" />
                      E-mail
                      <span className="text-red-500">*</span>
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="text-lg"
                        placeholder="joao.silva@colmeia.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Documento (CPF ou CNPJ) */}
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <Label className="flex items-center gap-1 text-base">
                      <MailIcon className="h-4 w-4 text-muted-foreground" />
                      Documento
                      <span className="text-red-500">*</span>
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="text-lg"
                        placeholder="000.000.000-00 ou 00.000.000/0000-00"
                        onChange={(e) =>
                          field.onChange(maskCpfCnpj(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Telefone */}
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <Label className="flex items-center gap-1 text-base">
                      <MailIcon className="h-4 w-4 text-muted-foreground" />
                      Telefone (opcional)
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="text-lg"
                        placeholder="(00) 00000-0000"
                        onChange={(e) =>
                          field.onChange(maskPhone(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Footer */}
            <DialogFooter className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  handleClose();
                  onOpenChange(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || isLoadingService}
              >
                {isLoadingService
                  ? 'Salvando...'
                  : isEdit
                  ? 'Atualizar'
                  : 'Cadastrar'}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

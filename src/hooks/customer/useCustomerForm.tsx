'use client';

import { useCustomer } from '@/contexts/CustomerContext';
import { ICustomerPayload } from '@/services/customer.service';
import { phoneForeignRegex, unicodeEmailRegex } from '@/utils/regexs';
import { isValidCNPJ, isValidCPF } from '@/utils/validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().nonempty('O nome do cliente é obrigatório.'),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório.')
    .regex(unicodeEmailRegex, { message: 'E-mail inválido' }),
  document: z
    .string()
    .nonempty('Campo obrigatório')
    .superRefine((val, ctx) => {
      const digitsOnly = val.replace(/\D/g, '');

      if (digitsOnly.length === 11 && !isValidCPF(digitsOnly)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CPF inválido.',
        });
        return;
      }

      if (digitsOnly.length === 14 && !isValidCNPJ(digitsOnly)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CNPJ inválido.',
        });
        return;
      }

      if (![11, 14].includes(digitsOnly.length)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Documento inválido (CPF ou CNPJ).',
        });
      }
    }),
  phone: z
    .string()
    .regex(phoneForeignRegex, { message: 'Número de telefone inválido' })
    .optional(),
});

export type CustomerFormSchema = z.infer<typeof customerSchema>;

export function useCustomerForm({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  const {
    createCustomer,
    updateCustomer,
    isLoadingService,
    setCustomersToView,
    customersToView,
  } = useCustomer();

  const form = useForm<CustomerFormSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      document: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (customersToView) {
      form.reset(customersToView);
    }
  }, [customersToView, form]);

  const handleSubmit = useCallback(
    async (data: CustomerFormSchema) => {
      const { email, name, phone, document } = data;

      const payload: Partial<ICustomerPayload> = {
        email,
        name,
        document,
        ...(phone ? { phone } : {}),
      };
      if (customersToView) {
        await updateCustomer(customersToView.id, payload);
      } else {
        await createCustomer(payload as ICustomerPayload);
      }

      setCustomersToView(null);
      form.reset({
        name: '',
        email: '',
        phone: '',
        document: '',
      });
      onOpenChange(false);
    },
    [createCustomer, updateCustomer, customersToView, form, onOpenChange]
  );

  const handleClose = useCallback(() => {
    setCustomersToView(null);
    form.reset();
  }, [form]);

  return {
    form,
    handleSubmit,
    handleClose,
    isEdit: !!customersToView,
    isLoadingService,
  };
}

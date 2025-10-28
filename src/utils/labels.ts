import { EnumChargeStatus, EnumPaymentMethod } from '@/@types/enum.type';

export const chargeStatusLabels: Record<EnumChargeStatus, string> = {
  PENDING: 'Pendente',
  PAID: 'Pago',
  EXPIRED: 'Expirado',
  FAILED: 'Falhado',
};

export const paymentMethodLabels: Record<EnumPaymentMethod, string> = {
  CREDIT_CARD: 'Cartão de Crédito',
  PIX: 'Pix',
  BANK_SLIP: 'Boleto Bancário',
};

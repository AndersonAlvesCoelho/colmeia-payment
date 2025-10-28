import { EnumChargeStatus, EnumPaymentMethod } from './enum.type';

export type TPaginationType = {
  page?: number;
  limit?: number;
  search?: string;
  customerId?: string;
  status?: EnumChargeStatus;
  EnumPaymentMethod?: EnumPaymentMethod;
  minAmount?: number;
  maxAmount?: number;
  startDate?: string;
  endDate?: string;
};

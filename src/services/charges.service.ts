import { EnumChargeStatus, EnumPaymentMethod } from '@/@types/enum.type';
import { TPaginationType } from '@/@types/Pagination';
import { IResponseWithPaginatedResult } from '@/@types/response';
import { api } from './api';
import { ICustomerResponse } from './customer.service';

export type IChargesPayload = {
  customerId: string;
  amount: number;
  currency?: string;
  EnumPaymentMethod: EnumPaymentMethod;
  description?: string;
  dueDate?: string;
  idempotencyKey: string;
  metadata?: Record<string, unknown>;
};

export interface IChargesResponse {
  id: string;
  amount: number;
  currency: string;
  description?: string;
  status: EnumChargeStatus;
  paymentMethod: EnumPaymentMethod;
  idempotencyKey: string;
  dueDate?: Date;
  paidAt?: Date;
  failureReason?: string;
  metadata?: Record<string, unknown>;
  customerId: string;
  customer: ICustomerResponse;
  createdAt: Date;
  updatedAt: Date;
}

export const ChargesService = {
  async create(data: IChargesPayload): Promise<IChargesResponse> {
    const response = await api.post<IChargesResponse>('/charges', data);
    return response.data;
  },

  async findAll(
    params?: TPaginationType
  ): Promise<IResponseWithPaginatedResult<IChargesResponse>> {
    const { data } = await api.get<
      IResponseWithPaginatedResult<IChargesResponse>
    >('/charges', { params });
    return data;
  },

  async findOne(id: string): Promise<IChargesResponse> {
    const response = await api.get<IChargesResponse>(`/charges/${id}`);
    return response.data;
  },

  async update(
    id: string,
    data: Partial<IChargesPayload>
  ): Promise<IChargesResponse> {
    const response = await api.patch<IChargesResponse>(`/charges/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/charges/${id}`);
  },

  async updateStatus(
    id: string,
    status: EnumChargeStatus
  ): Promise<IChargesResponse> {
    const response = await api.patch<IChargesResponse>(
      `/charges/${id}/status`,
      { status }
    );
    return response.data;
  },
};

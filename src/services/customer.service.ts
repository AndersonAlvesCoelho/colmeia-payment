import { TPaginationType } from '@/@types/Pagination';
import { IResponseWithPaginatedResult } from '@/@types/response';
import { api } from './api';

export interface ICustomerPayload {
  name: string;
  email: string;
  document?: string;
  phone?: string;
}

export interface ICustomerResponse {
  id: string;
  name: string;
  email: string;
  document?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export const CustomerService = {
  async create(data: ICustomerPayload): Promise<ICustomerResponse> {
    const response = await api.post<ICustomerResponse>('/customer', data);
    return response.data;
  },

  async findAll(
    params?: TPaginationType
  ): Promise<IResponseWithPaginatedResult<ICustomerResponse>> {
    const { data } = await api.get<
      IResponseWithPaginatedResult<ICustomerResponse>
    >('/customer', { params });
    return data;
  },

  async findOne(id: string): Promise<ICustomerResponse> {
    const response = await api.get<ICustomerResponse>(`/customer/${id}`);
    return response.data;
  },

  async update(
    id: string,
    data: Partial<ICustomerPayload>
  ): Promise<ICustomerResponse> {
    const response = await api.patch<ICustomerResponse>(
      `/customer/${id}`,
      data
    );
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/customer/${id}`);
  },
};

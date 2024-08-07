import { AxiosResponse } from 'axios';

import { ClientFormData, ClientModel } from '@/lib/types/models/client';
import { InvoiceFormData, InvoiceModel } from '@/lib/types/models/invoice';
import { BankingInformation, UserModel } from '@/lib/types/models/user';
import {
  AddBankingInformationResp,
  AddClientResp,
  AddInvoiceResp,
  DeleteClientResp,
  DeleteInvoiceResp,
  GetBankAccountResp,
  GetBankingInformationResp,
  GetInvoiceResp,
  RegisterUserResponse,
  UpdateClientResp,
  UpdateInvoiceResp,
  UpdateUserResp,
} from '@/lib/types/response';

import api from './apiInstance';

type UserModelWithPassword = UserModel & { password: string };

export const registerUser = async ({
  email,
  password,
  confirmedPassword,
}: Pick<UserModelWithPassword, 'email' | 'password'> & {
  confirmedPassword: string;
}): Promise<AxiosResponse<RegisterUserResponse>> =>
  await api.post('/api/users', { email, password, confirmedPassword });

export const getInvoice = async (
  userId: number,
  invoiceId: number
): Promise<AxiosResponse<GetInvoiceResp>> =>
  await api.get(`/api/${userId}/invoices/${invoiceId}`);

export const addInvoice = async (
  userId: number,
  invoiceData: InvoiceFormData
): Promise<AxiosResponse<AddInvoiceResp>> =>
  await api.post(`/api/${userId}/invoices`, invoiceData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateInvoice = async (
  userId: number,
  invoiceData: InvoiceModel
): Promise<AxiosResponse<UpdateInvoiceResp>> =>
  api.put(`/api/${userId}/invoices/${invoiceData.id}`, invoiceData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteInvoice = async (
  userId: number,
  invoiceId: number
): Promise<AxiosResponse<DeleteInvoiceResp>> =>
  await api.delete(`/api/${userId}/invoices/${invoiceId}`);

export const addClient = async (
  userId: number,
  clientData: ClientFormData
): Promise<AxiosResponse<AddClientResp>> =>
  await api.post(`/api/${userId}/clients`, clientData);

export const updateClient = async (
  userId: number,
  clientData: ClientModel
): Promise<AxiosResponse<UpdateClientResp>> =>
  await api.put(`/api/${userId}/clients/${clientData.id}`, clientData);

export const deleteClient = async (
  userId: number,
  clientId: number
): Promise<AxiosResponse<DeleteClientResp>> =>
  await api.delete(`/api/${userId}/clients/${clientId}`);

export const updateUser = async (
  id: number,
  userData: UserModel
): Promise<AxiosResponse<UpdateUserResp>> =>
  await api.put(`/api/users/${id}`, userData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getUser = async (id: number): Promise<AxiosResponse<UserModel>> =>
  await api.get(`/api/users/${id}`);

export const getUserByEmail = async (
  email: string
): Promise<AxiosResponse<UserModelWithPassword>> =>
  await api.get(`/api/users/email/${email}`);

export const getBankAccount = async (
  userId: number,
  bankAccountId: number
): Promise<AxiosResponse<GetBankAccountResp>> =>
  await api.get(`/api/${userId}/banking-information/${bankAccountId}`);

export const getBankingInformation = async (
  userId: number
): Promise<AxiosResponse<GetBankingInformationResp>> =>
  await api.get(`/api/${userId}/banking-information`);

export const addBankingInformation = async (
  userId: number,
  bankingInformation: BankingInformation
): Promise<AxiosResponse<AddBankingInformationResp>> =>
  await api.post(`/api/${userId}/banking-information`, bankingInformation);

export const deleteBankingInformation = async (
  userId: number,
  bankAccountId: number
) => await api.delete(`/api/${userId}/banking-information/${bankAccountId}`);

export const updateUserSelectedBankAccount = async (
  userId: number,
  selectedBankAccountId: number
): Promise<AxiosResponse<UpdateUserResp>> =>
  await api.put(`/api/users/${userId}/selected-bank-account`, {
    selectedBankAccountId,
  });

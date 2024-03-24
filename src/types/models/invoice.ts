export type InvoiceParty = {
  firstName: string;
  lastName: string;
  type: string;
  businessNumber: string;
  address: string;
  email?: string;
};

export type InvoiceService = {
  description: string;
  unit: string;
  quantity: number;
  amount: number;
};

export type InvoiceModel = {
  id: string;
  date: string;
  company: string;
  sender: InvoiceParty;
  receiver: InvoiceParty;
  totalAmount: number;
  status: InvoiceStatus;
  services: Array<InvoiceService>;
  dueDate: string;
};

export type InvoiceStatus = 'paid' | 'pending' | 'canceled';

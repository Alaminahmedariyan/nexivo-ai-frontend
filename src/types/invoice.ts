import { Payment } from "./payments";


export type InvoiceStatus = "DRAFT" | "SENT" | "PARTIALLY_PAID" | "PAID" | "OVERDUE" | "CANCELLED";
export type InvoiceCurrency = "USD" | "EUR" | "BDT";

export type InvoiceItem = { 
  description: string; 
  quantity: number; 
  unitPrice: number; 
  amount: number; 
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  clientId: string;
  projectId: string | null;
  milestoneId: string | null;
  items: InvoiceItem[];
  subtotal: string;
  tax: string;
  total: string;
  currency: InvoiceCurrency;
  status: InvoiceStatus;
  dueDate: string | null;
  issuedAt: string | null;
  paidAt: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  client?: { id: string; companyName: string | null } | null;
  project?: { id: string; title: string } | null;
  milestone?: { id: string; title: string } | null;
  payments?: Payment[];
};

export type CreateInvoiceInput = {
  clientId: string;
  projectId?: string;
  milestoneId?: string;
  items: { description: string; quantity: number; unitPrice: number }[];
  taxRate?: number;
  currency?: InvoiceCurrency;
  dueDate?: string;
  notes?: string;
};

export type UpdateInvoiceInput = Partial<{
  items: { description: string; quantity: number; unitPrice: number }[];
  taxRate: number;
  currency: InvoiceCurrency;
  dueDate: string;
  notes: string;
}>;
 export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  amount: number;
  status: string;
}

export const InvoiceController = {
  getAll: async (): Promise<Invoice[]> => {
    return [];
  },
  getById: async (id: string): Promise<Invoice | null> => {
    return null;
  },
  create: async (data: any): Promise<Invoice> => {
    return {} as Invoice;
  },
  update: async (id: string, data: any): Promise<Invoice> => {
    return {} as Invoice;
  },
  delete: async (id: string): Promise<void> => {}
};

export {};  // ← ADD THIS

 export interface InvoiceItem {
  id: string;
  productId: string;
  productName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  discountAmount: number;
  taxPercent: number;
  taxAmount: number;
  totalPrice: number;
}

export interface InvoiceModel {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  customerGst?: string;
  invoiceDate: string;
  dueDate: string;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingCharges: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  status: 'draft' | 'sent' | 'paid' | 'partially_paid' | 'overdue' | 'cancelled';
  items: InvoiceItem[];
  notes?: string;
  termsConditions?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const InvoiceModel = {
  // Create new invoice
  create: (data: Partial<InvoiceModel>): InvoiceModel => {
    const now = new Date().toISOString();
    return {
      id: Date.now().toString(),
      invoiceNumber: `INV-${Date.now()}`,
      customerId: data.customerId || '',
      customerName: data.customerName || '',
      customerGst: data.customerGst,
      invoiceDate: data.invoiceDate || now.split('T')[0],
      dueDate: data.dueDate || '',
      subtotal: data.subtotal || 0,
      discountAmount: data.discountAmount || 0,
      taxAmount: data.taxAmount || 0,
      shippingCharges: data.shippingCharges || 0,
      totalAmount: data.totalAmount || 0,
      paidAmount: data.paidAmount || 0,
      balanceDue: data.totalAmount || 0,
      status: data.status || 'draft',
      items: data.items || [],
      notes: data.notes,
      termsConditions: data.termsConditions,
      createdBy: data.createdBy || '',
      createdAt: now,
      updatedAt: now,
    };
  },

  // Calculate invoice totals
  calculateTotals: (items: InvoiceItem[], discountAmount: number = 0, shippingCharges: number = 0) => {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const taxAmount = items.reduce((sum, item) => sum + item.taxAmount, 0);
    const totalAmount = subtotal + taxAmount + shippingCharges - discountAmount;
    
    return {
      subtotal,
      taxAmount,
      totalAmount,
      balanceDue: totalAmount,
    };
  },

  // Calculate invoice item
  calculateItem: (quantity: number, unitPrice: number, discountPercent: number = 0, taxPercent: number = 0) => {
    const total = quantity * unitPrice;
    const discountAmount = (total * discountPercent) / 100;
    const afterDiscount = total - discountAmount;
    const taxAmount = (afterDiscount * taxPercent) / 100;
    const totalPrice = afterDiscount + taxAmount;
    
    return {
      discountAmount,
      taxAmount,
      totalPrice,
    };
  },

  // Update payment
  recordPayment: (invoice: InvoiceModel, amount: number): InvoiceModel => {
    const newPaidAmount = invoice.paidAmount + amount;
    const newBalanceDue = invoice.totalAmount - newPaidAmount;
    let newStatus: InvoiceModel['status'] = invoice.status;
    
    if (newBalanceDue <= 0) {
      newStatus = 'paid';
    } else if (newPaidAmount > 0) {
      newStatus = 'partially_paid';
    }
    
    return {
      ...invoice,
      paidAmount: newPaidAmount,
      balanceDue: newBalanceDue,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
  },

  // Check if invoice is overdue
  isOverdue: (invoice: InvoiceModel): boolean => {
    if (invoice.status === 'paid' || invoice.status === 'cancelled') {
      return false;
    }
    const today = new Date();
    const dueDate = new Date(invoice.dueDate);
    return dueDate < today;
  },

  // Get invoice summary
  getSummary: (invoices: InvoiceModel[]) => {
    const totalInvoices = invoices.length;
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    const totalPaid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
    const totalDue = totalAmount - totalPaid;
    const paidCount = invoices.filter(inv => inv.status === 'paid').length;
    const pendingCount = invoices.filter(inv => inv.status === 'sent' || inv.status === 'partially_paid').length;
    const overdueCount = invoices.filter(inv => InvoiceModel.isOverdue(inv)).length;
    const draftCount = invoices.filter(inv => inv.status === 'draft').length;
    
    return {
      totalInvoices,
      totalAmount,
      totalPaid,
      totalDue,
      paidCount,
      pendingCount,
      overdueCount,
      draftCount,
    };
  },

  // Format invoice number
  formatInvoiceNumber: (number: number): string => {
    return `INV-${String(number).padStart(4, '0')}`;
  },

  // Generate PDF data (mock)
  generatePdfData: (invoice: InvoiceModel) => {
    return {
      ...invoice,
      companyName: 'BusinessOS',
      companyAddress: '123 Business Street, Tech City, India',
      companyGst: '22AAAAA0000A1Z',
      bankDetails: {
        bankName: 'HDFC Bank',
        accountNumber: 'XXXX1234',
        ifscCode: 'HDFC0001234',
      },
    };
  },
};

export default InvoiceModel;
export {};  // Required for isolatedModules

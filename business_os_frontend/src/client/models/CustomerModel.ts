// src/client/models/CustomerModel.ts

export interface CustomerModel {
  id: string;
  customerCode: string;
  name: string;  // Changed from optional to required
  email: string; // Changed from optional to required
  phone: string; // Changed from optional to required
  alternatePhone?: string;
  gstNumber?: string;
  panNumber?: string;
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  creditLimit: number;
  openingBalance: number;
  currentBalance: number;
  customerType: 'individual' | 'business' | 'government';
  status: 'active' | 'inactive' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
}

export const CustomerModel = {
  create: (data: Partial<CustomerModel>): CustomerModel => {
    return {
      id: Date.now().toString(),
      customerCode: `CUST-${Date.now()}`,
      name: data.name || '',  // Provide default
      email: data.email || '', // Provide default
      phone: data.phone || '', // Provide default
      creditLimit: data.creditLimit || 0,
      openingBalance: data.openingBalance || 0,
      currentBalance: data.currentBalance || 0,
      customerType: data.customerType || 'business',
      status: data.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data
    };
  },

  calculateBalance: (customer: CustomerModel): number => {
    return customer.openingBalance - customer.creditLimit;
  },
};
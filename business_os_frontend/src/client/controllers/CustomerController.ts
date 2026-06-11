 // Mock data - replace with actual API calls
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  gstNumber?: string;
  address?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

const mockCustomers: Customer[] = [
  { id: '1', name: 'ABC Corp', email: 'contact@abc.com', phone: '9876543210', status: 'active', createdAt: new Date() },
  { id: '2', name: 'XYZ Ltd', email: 'info@xyz.com', phone: '8765432109', status: 'active', createdAt: new Date() },
];

export const CustomerController = {
  getAll: async (): Promise<Customer[]> => {
    // Replace with: return await api.get('/customers');
    return mockCustomers;
  },

  getById: async (id: string): Promise<Customer | null> => {
    // Replace with: return await api.get(`/customers/${id}`);
    return mockCustomers.find(c => c.id === id) || null;
  },

  create: async (data: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer> => {
    // Replace with: return await api.post('/customers', data);
    const newCustomer = { ...data, id: Date.now().toString(), createdAt: new Date() };
    mockCustomers.push(newCustomer);
    return newCustomer;
  },

  update: async (id: string, data: Partial<Customer>): Promise<Customer> => {
    // Replace with: return await api.put(`/customers/${id}`, data);
    const index = mockCustomers.findIndex(c => c.id === id);
    if (index !== -1) {
      mockCustomers[index] = { ...mockCustomers[index], ...data };
      return mockCustomers[index];
    }
    throw new Error('Customer not found');
  },

  delete: async (id: string): Promise<void> => {
    // Replace with: await api.delete(`/customers/${id}`);
    const index = mockCustomers.findIndex(c => c.id === id);
    if (index !== -1) mockCustomers.splice(index, 1);
  },
};

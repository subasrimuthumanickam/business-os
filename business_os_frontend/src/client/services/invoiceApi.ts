 const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const invoiceApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/invoices`);
    return response.json();
  },
  
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/invoices/${id}`);
    return response.json();
  },
  
  create: async (data: any) => {
    const response = await fetch(`${API_URL}/invoices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  
  update: async (id: string, data: any) => {
    const response = await fetch(`${API_URL}/invoices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/invoices/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },
  
  recordPayment: async (id: string, data: any) => {
    const response = await fetch(`${API_URL}/invoices/${id}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
};

export {};  // ← ADD THIS LINE

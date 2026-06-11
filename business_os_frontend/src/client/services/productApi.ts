 const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const productApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
  },
  
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
  },
  
  getLowStock: async () => {
    const response = await fetch(`${API_URL}/products/low-stock`);
    return response.json();
  },
  
  create: async (data: any) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  
  update: async (id: string, data: any) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  
  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },
  
  updateStock: async (id: string, quantity: number, type: 'add' | 'remove') => {
    const response = await fetch(`${API_URL}/products/${id}/stock`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity, type })
    });
    return response.json();
  },
};

export {};  // ← ADD THIS LINE

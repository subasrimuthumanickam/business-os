// src/client/services/projectApi.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Project API functions
export const projectApi = {
  // Get all projects
  getAll: async (params?: any) => {
    const response = await apiClient.get('/projects', { params });
    return response.data;
  },

  // Get single project by ID
  getById: async (id: string) => {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },

  // Create new project
  create: async (data: any) => {
    const response = await apiClient.post('/projects', data);
    return response.data;
  },

  // Update project
  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/projects/${id}`, data);
    return response.data;
  },

  // Delete project
  delete: async (id: string) => {
    const response = await apiClient.delete(`/projects/${id}`);
    return response.data;
  },

  // Get projects by customer
  getByCustomer: async (customerName: string) => {
    const response = await apiClient.get(`/projects/customer/${customerName}`);
    return response.data;
  },
};

// Task API functions
export const taskApi = {
  getAll: async (params?: any) => {
    const response = await apiClient.get('/tasks', { params });
    return response.data;
  },

  getByProject: async (projectId: string) => {
    const response = await apiClient.get(`/tasks/project/${projectId}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/tasks', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },
};

// Time Entry API functions
export const timeEntryApi = {
  getAll: async (params?: any) => {
    const response = await apiClient.get('/time-entries', { params });
    return response.data;
  },

  getByProject: async (projectId: string) => {
    const response = await apiClient.get(`/time-entries/project/${projectId}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/time-entries', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/time-entries/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/time-entries/${id}`);
    return response.data;
  },
};

// Customer API functions
export const customerApi = {
  getAll: async (params?: any) => {
    const response = await apiClient.get('/customers', { params });
    return response.data;
  },

  getByName: async (name: string) => {
    const response = await apiClient.get(`/customers/${name}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/customers', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/customers/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/customers/${id}`);
    return response.data;
  },
};

// Export all APIs
export default {
  project: projectApi,
  task: taskApi,
  timeEntry: timeEntryApi,
  customer: customerApi,
};
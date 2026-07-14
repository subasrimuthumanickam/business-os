import { apiService } from '../services/api.service'; // adjust path to your existing apiService file

export interface Warehouse {
  id: number;
  company_id: number;
  warehouse_name: string;
  warehouse_code: string;
  address: string | null;
  city: string | null;
  is_default: boolean;
  is_active: boolean;
}

export interface WarehouseInput {
  warehouse_name: string;
  warehouse_code: string;
  address?: string | null;
  city?: string | null;
}

const warehouseService = {
  getAllWarehouses: () => apiService.get<Warehouse[]>('/inventory/warehouses'),

  createWarehouse: (input: WarehouseInput) =>
    apiService.post<Warehouse>('/inventory/warehouses', input),

  updateWarehouse: (id: number, updates: Partial<WarehouseInput>) =>
    apiService.put<Warehouse>(`/inventory/warehouses/${id}`, updates),

  setDefaultWarehouse: (id: number) =>
    apiService.patch<Warehouse>(`/inventory/warehouses/${id}/set-default`, {}),

  toggleActive: (id: number, isActive: boolean) =>
    apiService.patch<Warehouse>(`/inventory/warehouses/${id}/toggle-active`, { is_active: isActive }),

  deleteWarehouse: (id: number) =>
    apiService.delete<void>(`/inventory/warehouses/${id}`),
};

export default warehouseService;
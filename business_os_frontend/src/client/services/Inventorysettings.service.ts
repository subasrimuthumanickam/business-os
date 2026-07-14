import { apiService } from '../services/api.service'; // adjust path to your existing apiService file

export interface InventorySettings {
  id?: number;
  company_id: number;
  valuation_method: 'FIFO' | 'LIFO' | 'AVERAGE';
  enable_low_stock_alerts: boolean;
  default_low_stock_threshold: number;
  enable_auto_reorder: boolean;
  default_warehouse_id: number | null;
}

const inventorySettingsService = {
  getSettings: () => apiService.get<InventorySettings>('/inventory/settings'),

  updateSettings: (updates: Partial<InventorySettings>) =>
    apiService.put<InventorySettings>('/inventory/settings', updates),
};

export default inventorySettingsService;
import { apiService } from '../services/api.service'; // adjust path to your existing apiService file

export interface FinanceSettings {
  id?: number;
  company_id: number;
  base_currency: string;
  currency_symbol: string;
  currency_position: 'before' | 'after';
  decimal_places: number;
  default_tax_rate: number;
  tax_registration_number: string | null;
  tax_inclusive_pricing: boolean;
  fiscal_year_start_month: number;
}

const financeService = {
  getSettings: () => apiService.get<FinanceSettings>('/finance/settings'),

  updateSettings: (updates: Partial<FinanceSettings>) =>
    apiService.put<FinanceSettings>('/finance/settings', updates),
};

export default financeService;
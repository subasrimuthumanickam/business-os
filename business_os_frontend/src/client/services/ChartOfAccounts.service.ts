import { apiService } from '../services/api.service'; // adjust path to your existing apiService file

export interface Account {
  id: number;
  company_id: number;
  account_code: string;
  account_name: string;
  account_type: 'asset' | 'liability' | 'equity' | 'income' | 'expense';
  parent_account_id: number | null;
  description: string | null;
  is_active: boolean;
}

export interface AccountInput {
  account_code: string;
  account_name: string;
  account_type: 'asset' | 'liability' | 'equity' | 'income' | 'expense';
  parent_account_id?: number | null;
  description?: string | null;
}

const chartOfAccountsService = {
  getAllAccounts: () => apiService.get<Account[]>('/finance/accounts'),

  createAccount: (input: AccountInput) =>
    apiService.post<Account>('/finance/accounts', input),

  updateAccount: (id: number, updates: Partial<AccountInput>) =>
    apiService.put<Account>(`/finance/accounts/${id}`, updates),

  toggleActive: (id: number, isActive: boolean) =>
    apiService.patch<Account>(`/finance/accounts/${id}/toggle-active`, { is_active: isActive }),

  deleteAccount: (id: number) =>
    apiService.delete<void>(`/finance/accounts/${id}`),
};

export default chartOfAccountsService;
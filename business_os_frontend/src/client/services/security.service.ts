import { apiService } from './api.service'; // adjust path to your existing apiService file

export interface SecuritySettings {
  id?: number;
  company_id: number;
  min_password_length: number;
  require_uppercase: boolean;
  require_number: boolean;
  require_special_char: boolean;
  password_expiry_days: number;
  enforce_2fa: boolean;
  max_login_attempts: number;
  session_timeout_minutes: number;
}

export interface LoginSession {
  id: number;
  user_id: number;
  device_info: string;
  browser: string;
  ip_address: string;
  location: string;
  login_at: string;
  last_active_at: string;
  is_current: boolean;
}

export interface AuditLogItem {
  id: number;
  user_id: number | null;
  user_name: string | null;
  action: string;
  module: string;
  description: string | null;
  ip_address: string | null;
  created_at: string;
}

export interface AuditLogResponse {
  logs: AuditLogItem[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

const securityService = {
  // Password policy
  getSettings: () => apiService.get<SecuritySettings>('/security/settings'),

  updateSettings: (updates: Partial<SecuritySettings>) =>
    apiService.put<SecuritySettings>('/security/settings', updates),

  // Sessions
  getSessions: () => apiService.get<LoginSession[]>('/security/sessions'),

  revokeSession: (sessionId: number) =>
    apiService.delete<void>(`/security/sessions/${sessionId}`),

  revokeAllOtherSessions: () =>
    apiService.post<{ message: string }>('/security/sessions/revoke-all', {}),

  // Audit log - backend nests logs + pagination inside `data` so apiService's unwrap still works
  getAuditLogs: (params: { module?: string; action?: string; page?: number; pageSize?: number }) => {
    const query = new URLSearchParams();
    if (params.module) query.set('module', params.module);
    if (params.action) query.set('action', params.action);
    if (params.page) query.set('page', String(params.page));
    if (params.pageSize) query.set('pageSize', String(params.pageSize));

    const qs = query.toString();
    return apiService.get<AuditLogResponse>(`/security/audit-logs${qs ? `?${qs}` : ''}`);
  },
};

export default securityService;
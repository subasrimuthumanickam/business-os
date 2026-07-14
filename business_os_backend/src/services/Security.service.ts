import db from '../config/db.js';

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

export interface AuditLogEntry {
  user_id?: number | undefined;
  company_id: number;
  user_name?: string | undefined;
  action: string;
  module: string;
  description?: string | undefined;
  ip_address?: string | undefined;
}

const DEFAULT_SETTINGS: Omit<SecuritySettings, 'company_id'> = {
  min_password_length: 8,
  require_uppercase: true,
  require_number: true,
  require_special_char: false,
  password_expiry_days: 90,
  enforce_2fa: false,
  max_login_attempts: 5,
  session_timeout_minutes: 60,
};

export const securityService = {
  // ============= PASSWORD POLICY =============
  getSecuritySettings: async (companyId: number): Promise<SecuritySettings> => {
    // db.execute() in this project already unwraps [rows, fields] and returns rows directly
    const rows: any = await db.execute(
      'SELECT * FROM security_settings WHERE company_id = ?',
      [companyId]
    );

    if (!rows || rows.length === 0) {
      // Auto-create default row for this company on first access
      await db.execute(
        `INSERT INTO security_settings 
          (company_id, min_password_length, require_uppercase, require_number, require_special_char, password_expiry_days, enforce_2fa, max_login_attempts, session_timeout_minutes) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          companyId,
          DEFAULT_SETTINGS.min_password_length,
          DEFAULT_SETTINGS.require_uppercase,
          DEFAULT_SETTINGS.require_number,
          DEFAULT_SETTINGS.require_special_char,
          DEFAULT_SETTINGS.password_expiry_days,
          DEFAULT_SETTINGS.enforce_2fa,
          DEFAULT_SETTINGS.max_login_attempts,
          DEFAULT_SETTINGS.session_timeout_minutes,
        ]
      );

      const newRows: any = await db.execute(
        'SELECT * FROM security_settings WHERE company_id = ?',
        [companyId]
      );
      return newRows[0];
    }

    return rows[0];
  },

  updateSecuritySettings: async (
    companyId: number,
    updates: Partial<Omit<SecuritySettings, 'id' | 'company_id'>>
  ): Promise<SecuritySettings> => {
    // Ensure a row exists first
    await securityService.getSecuritySettings(companyId);

    const fields = Object.keys(updates);
    if (fields.length === 0) {
      return securityService.getSecuritySettings(companyId);
    }

    const setClause = fields.map((f) => `${f} = ?`).join(', ');
    const values = fields.map((f) => (updates as any)[f]);

    await db.execute(
      `UPDATE security_settings SET ${setClause} WHERE company_id = ?`,
      [...values, companyId]
    );

    return securityService.getSecuritySettings(companyId);
  },

  // ============= LOGIN SESSIONS =============
  createSession: async (params: {
    userId: number;
    companyId: number;
    deviceInfo?: string;
    browser?: string;
    ipAddress?: string;
    location?: string;
  }): Promise<void> => {
    await db.execute(
      `INSERT INTO login_sessions (user_id, company_id, device_info, browser, ip_address, location, is_current, is_active)
       VALUES (?, ?, ?, ?, ?, ?, TRUE, TRUE)`,
      [
        params.userId,
        params.companyId,
        params.deviceInfo || 'Unknown device',
        params.browser || 'Unknown browser',
        params.ipAddress || null,
        params.location || null,
      ]
    );
  },

  getActiveSessions: async (userId: number): Promise<LoginSession[]> => {
    const rows: any = await db.execute(
      `SELECT id, user_id, device_info, browser, ip_address, location, login_at, last_active_at, is_current
       FROM login_sessions
       WHERE user_id = ? AND is_active = TRUE
       ORDER BY last_active_at DESC`,
      [userId]
    );
    return rows || [];
  },

  revokeSession: async (sessionId: number, userId: number): Promise<boolean> => {
    const result: any = await db.execute(
      `UPDATE login_sessions SET is_active = FALSE WHERE id = ? AND user_id = ? AND is_current = FALSE`,
      [sessionId, userId]
    );
    return (result?.affectedRows || 0) > 0;
  },

  revokeAllOtherSessions: async (userId: number): Promise<number> => {
    const result: any = await db.execute(
      `UPDATE login_sessions SET is_active = FALSE WHERE user_id = ? AND is_current = FALSE`,
      [userId]
    );
    return result?.affectedRows || 0;
  },

  // ============= AUDIT LOG =============
  logAction: async (entry: AuditLogEntry): Promise<void> => {
    await db.execute(
      `INSERT INTO audit_logs (user_id, company_id, user_name, action, module, description, ip_address)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        entry.user_id || null,
        entry.company_id,
        entry.user_name || null,
        entry.action,
        entry.module,
        entry.description || null,
        entry.ip_address || null,
      ]
    );
  },

  getAuditLogs: async (
    companyId: number,
    filters: { module?: string; action?: string; limit: number; offset: number }
  ): Promise<{ logs: any[]; total: number }> => {
    const conditions: string[] = ['company_id = ?'];
    const values: any[] = [companyId];

    if (filters.module) {
      conditions.push('module = ?');
      values.push(filters.module);
    }
    if (filters.action) {
      conditions.push('action = ?');
      values.push(filters.action);
    }

    const whereClause = conditions.join(' AND ');
    const limit = filters.limit;
    const offset = filters.offset;

    const rows: any = await db.execute(
      `SELECT * FROM audit_logs WHERE ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...values, limit, offset]
    );

    const countRows: any = await db.execute(
      `SELECT COUNT(*) as total FROM audit_logs WHERE ${whereClause}`,
      values
    );

    return { logs: rows || [], total: countRows?.[0]?.total || 0 };
  },
};

export default securityService;
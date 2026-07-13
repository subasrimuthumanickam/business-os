// src/server/services/settings.service.ts
import  db from '../config/db.js'; // adjust path to your db connection

export interface GeneralSettings {
  default_language: string;
  date_format: string;
  time_format: string;
  timezone: string;
}

export interface FinancialSettings {
  base_currency: string;
  fiscal_year_start_month: number;
}

class SettingsService {
  async getGeneralSettings(companyId: number) {
    const [rows]: any = await db.execute(
      `SELECT default_language, date_format, time_format, timezone
       FROM companies WHERE id = ?`,
      [companyId]
    );
    return rows[0] || null;
  }

  async updateGeneralSettings(companyId: number, data: GeneralSettings) {
    await db.execute(
      `UPDATE companies
       SET default_language = ?, date_format = ?, time_format = ?, timezone = ?
       WHERE id = ?`,
      [data.default_language, data.date_format, data.time_format, data.timezone, companyId]
    );
    return this.getGeneralSettings(companyId);
  }

  async getFinancialSettings(companyId: number) {
    const [rows]: any = await db.execute(
      `SELECT base_currency, fiscal_year_start_month
       FROM companies WHERE id = ?`,
      [companyId]
    );
    return rows[0] || null;
  }

  async updateFinancialSettings(companyId: number, data: FinancialSettings) {
    await db.execute(
      `UPDATE companies
       SET base_currency = ?, fiscal_year_start_month = ?
       WHERE id = ?`,
      [data.base_currency, data.fiscal_year_start_month, companyId]
    );
    return this.getFinancialSettings(companyId);
  }
}

export default new SettingsService();
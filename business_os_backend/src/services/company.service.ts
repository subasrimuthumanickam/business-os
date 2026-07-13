// src/services/company.service.ts
import db from '../config/db.js';

export interface CompanyProfileData {
  company_name: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  pincode?: string | null;
  gst_number?: string | null;
  phone?: string | null;
  email?: string | null;
  logo_url?: string | null;
  currency?: string | null;
  timezone?: string | null;
  fiscal_year_start?: string | null;
  date_format?: string | null;
  default_language?: string | null;
  time_format?: string | null;
}

class CompanyService {
  async getProfile(companyId: number) {
    const rows: any = await db.execute(
      `SELECT id, company_name, subdomain, address, city, state, country, pincode,
              gst_number, phone, email, logo_url, currency, timezone,
              fiscal_year_start, date_format, default_language, time_format
       FROM companies WHERE id = ?`,
      [companyId]
    );
    return rows[0] || null;
  }

  async updateProfile(companyId: number, data: CompanyProfileData) {
    await db.execute(
      `UPDATE companies SET
        company_name = ?, address = ?, city = ?, state = ?, country = ?, pincode = ?,
        gst_number = ?, phone = ?, email = ?, currency = ?, timezone = ?,
        fiscal_year_start = ?, date_format = ?, default_language = ?, time_format = ?
       WHERE id = ?`,
      [
        data.company_name, data.address ?? null, data.city ?? null, data.state ?? null,
        data.country ?? null, data.pincode ?? null, data.gst_number ?? null,
        data.phone ?? null, data.email ?? null, data.currency ?? null,
        data.timezone ?? null, data.fiscal_year_start ?? null, data.date_format ?? null,
        data.default_language ?? null, data.time_format ?? null,
        companyId,
      ]
    );
    return this.getProfile(companyId);
  }

  async updateLogo(companyId: number, logoUrl: string) {
    await db.execute(`UPDATE companies SET logo_url = ? WHERE id = ?`, [logoUrl, companyId]);
    return logoUrl;
  }
}

export default new CompanyService();
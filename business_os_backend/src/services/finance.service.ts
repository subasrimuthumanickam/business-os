import db from '../config/db.js';

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

const DEFAULT_SETTINGS: Omit<FinanceSettings, 'company_id'> = {
  base_currency: 'INR',
  currency_symbol: '₹',
  currency_position: 'before',
  decimal_places: 2,
  default_tax_rate: 0,
  tax_registration_number: null,
  tax_inclusive_pricing: false,
  fiscal_year_start_month: 4,
};

export const financeService = {
  getFinanceSettings: async (companyId: number): Promise<FinanceSettings> => {
    // db.execute() in this project already unwraps [rows, fields] and returns rows directly
    const rows: any = await db.execute(
      'SELECT * FROM finance_settings WHERE company_id = ?',
      [companyId]
    );

    if (!rows || rows.length === 0) {
      // Auto-create default row for this company on first access
      await db.execute(
        `INSERT INTO finance_settings 
          (company_id, base_currency, currency_symbol, currency_position, decimal_places, 
           default_tax_rate, tax_registration_number, tax_inclusive_pricing, fiscal_year_start_month) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          companyId,
          DEFAULT_SETTINGS.base_currency,
          DEFAULT_SETTINGS.currency_symbol,
          DEFAULT_SETTINGS.currency_position,
          DEFAULT_SETTINGS.decimal_places,
          DEFAULT_SETTINGS.default_tax_rate,
          DEFAULT_SETTINGS.tax_registration_number,
          DEFAULT_SETTINGS.tax_inclusive_pricing,
          DEFAULT_SETTINGS.fiscal_year_start_month,
        ]
      );

      const newRows: any = await db.execute(
        'SELECT * FROM finance_settings WHERE company_id = ?',
        [companyId]
      );
      return newRows[0];
    }

    return rows[0];
  },

  updateFinanceSettings: async (
    companyId: number,
    updates: Partial<Omit<FinanceSettings, 'id' | 'company_id'>>
  ): Promise<FinanceSettings> => {
    // Ensure a row exists first
    await financeService.getFinanceSettings(companyId);

    const fields = Object.keys(updates);
    if (fields.length === 0) {
      return financeService.getFinanceSettings(companyId);
    }

    const setClause = fields.map((f) => `${f} = ?`).join(', ');
    const values = fields.map((f) => (updates as any)[f]);

    await db.execute(
      `UPDATE finance_settings SET ${setClause} WHERE company_id = ?`,
      [...values, companyId]
    );

    return financeService.getFinanceSettings(companyId);
  },
};

export default financeService;
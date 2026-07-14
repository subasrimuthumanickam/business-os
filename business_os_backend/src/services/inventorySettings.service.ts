import db from '../config/db.js';

export interface InventorySettings {
  id?: number;
  company_id: number;
  valuation_method: 'FIFO' | 'LIFO' | 'AVERAGE';
  enable_low_stock_alerts: boolean;
  default_low_stock_threshold: number;
  enable_auto_reorder: boolean;
  default_warehouse_id: number | null;
}

const DEFAULT_SETTINGS: Omit<InventorySettings, 'company_id'> = {
  valuation_method: 'FIFO',
  enable_low_stock_alerts: true,
  default_low_stock_threshold: 10,
  enable_auto_reorder: false,
  default_warehouse_id: null,
};

export const inventorySettingsService = {
  getSettings: async (companyId: number): Promise<InventorySettings> => {
    const rows: any = await db.execute(
      'SELECT * FROM inventory_settings WHERE company_id = ?',
      [companyId]
    );

    if (!rows || rows.length === 0) {
      await db.execute(
        `INSERT INTO inventory_settings 
          (company_id, valuation_method, enable_low_stock_alerts, default_low_stock_threshold, enable_auto_reorder, default_warehouse_id) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          companyId,
          DEFAULT_SETTINGS.valuation_method,
          DEFAULT_SETTINGS.enable_low_stock_alerts,
          DEFAULT_SETTINGS.default_low_stock_threshold,
          DEFAULT_SETTINGS.enable_auto_reorder,
          DEFAULT_SETTINGS.default_warehouse_id,
        ]
      );

      const newRows: any = await db.execute(
        'SELECT * FROM inventory_settings WHERE company_id = ?',
        [companyId]
      );
      return newRows[0];
    }

    return rows[0];
  },

  updateSettings: async (
    companyId: number,
    updates: Partial<Omit<InventorySettings, 'id' | 'company_id'>>
  ): Promise<InventorySettings> => {
    await inventorySettingsService.getSettings(companyId);

    const fields = Object.keys(updates);
    if (fields.length === 0) {
      return inventorySettingsService.getSettings(companyId);
    }

    const setClause = fields.map((f) => `${f} = ?`).join(', ');
    const values = fields.map((f) => (updates as any)[f]);

    await db.execute(
      `UPDATE inventory_settings SET ${setClause} WHERE company_id = ?`,
      [...values, companyId]
    );

    return inventorySettingsService.getSettings(companyId);
  },
};

export default inventorySettingsService;
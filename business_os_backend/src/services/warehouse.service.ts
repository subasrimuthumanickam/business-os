import db from '../config/db.js';

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

export const warehouseService = {
  getAllWarehouses: async (companyId: number): Promise<Warehouse[]> => {
    const rows: any = await db.execute(
      `SELECT * FROM warehouses WHERE company_id = ? ORDER BY is_default DESC, warehouse_name`,
      [companyId]
    );
    return rows || [];
  },

  getWarehouseById: async (companyId: number, warehouseId: number): Promise<Warehouse | null> => {
    const rows: any = await db.execute(
      `SELECT * FROM warehouses WHERE id = ? AND company_id = ?`,
      [warehouseId, companyId]
    );
    return rows && rows.length > 0 ? rows[0] : null;
  },

  createWarehouse: async (companyId: number, input: WarehouseInput): Promise<Warehouse> => {
    // If this is the first warehouse for the company, make it default automatically
    const existing = await warehouseService.getAllWarehouses(companyId);
    const isFirst = existing.length === 0;

    const result: any = await db.execute(
      `INSERT INTO warehouses (company_id, warehouse_name, warehouse_code, address, city, is_default)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        companyId,
        input.warehouse_name,
        input.warehouse_code,
        input.address ?? null,
        input.city ?? null,
        isFirst,
      ]
    );

    const newWarehouse = await warehouseService.getWarehouseById(companyId, result.insertId);
    return newWarehouse as Warehouse;
  },

  updateWarehouse: async (
    companyId: number,
    warehouseId: number,
    updates: Partial<WarehouseInput>
  ): Promise<Warehouse | null> => {
    const fields = Object.keys(updates);
    if (fields.length === 0) {
      return warehouseService.getWarehouseById(companyId, warehouseId);
    }

    const setClause = fields.map((f) => `${f} = ?`).join(', ');
    const values = fields.map((f) => (updates as any)[f]);

    await db.execute(
      `UPDATE warehouses SET ${setClause} WHERE id = ? AND company_id = ?`,
      [...values, warehouseId, companyId]
    );

    return warehouseService.getWarehouseById(companyId, warehouseId);
  },

  setDefaultWarehouse: async (companyId: number, warehouseId: number): Promise<Warehouse | null> => {
    // Unset all other defaults first, then set the chosen one
    await db.execute(`UPDATE warehouses SET is_default = FALSE WHERE company_id = ?`, [companyId]);
    await db.execute(
      `UPDATE warehouses SET is_default = TRUE WHERE id = ? AND company_id = ?`,
      [warehouseId, companyId]
    );
    return warehouseService.getWarehouseById(companyId, warehouseId);
  },

  toggleActive: async (companyId: number, warehouseId: number, isActive: boolean): Promise<Warehouse | null> => {
    await db.execute(
      `UPDATE warehouses SET is_active = ? WHERE id = ? AND company_id = ?`,
      [isActive, warehouseId, companyId]
    );
    return warehouseService.getWarehouseById(companyId, warehouseId);
  },

  deleteWarehouse: async (companyId: number, warehouseId: number): Promise<boolean> => {
    const warehouse = await warehouseService.getWarehouseById(companyId, warehouseId);
    if (warehouse?.is_default) {
      throw new Error('Cannot delete the default warehouse. Set another warehouse as default first.');
    }

    const result: any = await db.execute(
      `DELETE FROM warehouses WHERE id = ? AND company_id = ?`,
      [warehouseId, companyId]
    );
    return (result?.affectedRows || 0) > 0;
  },
};

export default warehouseService;
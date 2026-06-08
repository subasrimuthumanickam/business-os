import { pool } from '../config/db.js';

export interface TenantInput {
    company_name: string;
}

export interface Tenant {
    id: number;
    company_name: string;
}

export const TenantModel = {
    // 1. Core tenant registry insert
    createTenant: async (tenantData: TenantInput): Promise<number> => {
        const [result] = await pool.execute(
            'INSERT INTO tenants (company_name) VALUES (?)',
            [tenantData.company_name]
        );
        // Cast as any to read primary identity key insertId
        return (result as any).insertId;
    },

    findTenantById: async (tenantId: number): Promise<Tenant | null> => {
        const [rows] = await pool.execute(
            'SELECT id, company_name FROM tenants WHERE id = ?',
            [tenantId]
        );
        const results = rows as any[];
        return results.length > 0 ? results[0] : null;
    }
};
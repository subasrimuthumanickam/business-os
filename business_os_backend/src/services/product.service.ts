import db from '../config/db.js';

// Get all products with category name joined, optional search/filter
export const getAllProducts = async (filters: {
    search?: string;
    category_id?: number;
    status?: string;
}): Promise<any[]> => {
    let query = `
        SELECT p.*, c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE 1 = 1
    `;
    const params: any[] = [];

    if (filters.search) {
        query += ' AND (p.name LIKE ? OR p.sku LIKE ?)';
        const term = `%${filters.search}%`;
        params.push(term, term);
    }

    if (filters.category_id) {
        query += ' AND p.category_id = ?';
        params.push(filters.category_id);
    }

    if (filters.status) {
        query += ' AND p.status = ?';
        params.push(filters.status);
    }

    query += ' ORDER BY p.created_at DESC';

    const rows = await db.execute(query, params);
    return rows as any[];
};

export const getProductById = async (id: number): Promise<any> => {
    const rows = await db.execute(
        `SELECT p.*, c.name AS category_name
         FROM products p
         LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.id = ?`,
        [id]
    ) as any[];
    return rows.length > 0 ? rows[0] : null;
};

export const checkSkuExists = async (sku: string, excludeId?: number): Promise<boolean> => {
    let query = 'SELECT id FROM products WHERE sku = ?';
    const params: any[] = [sku];

    if (excludeId) {
        query += ' AND id != ?';
        params.push(excludeId);
    }

    const rows = await db.execute(query, params) as any[];
    return rows.length > 0;
};

export const createProduct = async (data: {
    name: string;
    sku: string;
    category_id: number | null;
    price: number;
    stock_quantity: number;
    unit: string;
    description: string | null;
    // New Zoho-style fields — all optional with sensible DB-level defaults,
    // so existing callers that don't pass them keep working unchanged.
    type?: 'goods' | 'service';
    tax_preference?: 'taxable' | 'non-taxable';
    sales_account?: string | null;
    purchase_account?: string | null;
}): Promise<number> => {
    const result: any = await db.execute(
        `INSERT INTO products
            (name, sku, category_id, price, stock_quantity, unit, description,
             type, tax_preference, sales_account, purchase_account)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            data.name,
            data.sku,
            data.category_id || null,
            data.price,
            data.stock_quantity || 0,
            data.unit || 'pcs',
            data.description || null,
            data.type || 'goods',
            data.tax_preference || 'taxable',
            data.sales_account || 'Sales',
            data.purchase_account || 'Cost of Goods Sold'
        ]
    );
    return result.insertId;
};

export const updateProduct = async (id: number, data: {
    name: string;
    sku: string;
    category_id: number | null;
    price: number;
    unit: string;
    description: string | null;
    status?: string;
    type?: 'goods' | 'service';
    tax_preference?: 'taxable' | 'non-taxable';
    sales_account?: string | null;
    purchase_account?: string | null;
}): Promise<number> => {
    const result: any = await db.execute(
        `UPDATE products SET
            name = ?, sku = ?, category_id = ?, price = ?, unit = ?, description = ?, status = ?,
            type = ?, tax_preference = ?, sales_account = ?, purchase_account = ?
         WHERE id = ?`,
        [
            data.name,
            data.sku,
            data.category_id || null,
            data.price,
            data.unit || 'pcs',
            data.description || null,
            data.status || 'active',
            data.type || 'goods',
            data.tax_preference || 'taxable',
            data.sales_account || 'Sales',
            data.purchase_account || 'Cost of Goods Sold',
            id
        ]
    );
    return result.affectedRows;
};

export const deleteProduct = async (id: number): Promise<number> => {
    const result: any = await db.execute('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows;
};

// Used internally by stock movement service to adjust stock_quantity
export const adjustStockQuantity = async (id: number, delta: number): Promise<number> => {
    const result: any = await db.execute(
        'UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?',
        [delta, id]
    );
    return result.affectedRows;
};
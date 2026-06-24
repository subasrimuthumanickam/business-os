import db from '../config/db.js';
import { adjustStockQuantity, getProductById } from './product.service.js';

export const getMovementsByProduct = async (productId: number): Promise<any[]> => {
    const rows = await db.execute(
        `SELECT sm.*, u.name AS created_by_name
         FROM stock_movements sm
         LEFT JOIN users u ON sm.created_by = u.id
         WHERE sm.product_id = ?
         ORDER BY sm.created_at DESC`,
        [productId]
    );
    return rows as any[];
};

export const getAllMovements = async (): Promise<any[]> => {
    const rows = await db.execute(
        `SELECT sm.*, p.name AS product_name, p.sku, u.name AS created_by_name
         FROM stock_movements sm
         LEFT JOIN products p ON sm.product_id = p.id
         LEFT JOIN users u ON sm.created_by = u.id
         ORDER BY sm.created_at DESC`,
        []
    );
    return rows as any[];
};

// Creates a stock movement entry AND updates products.stock_quantity accordingly
export const createMovement = async (data: {
    product_id: number;
    movement_type: 'IN' | 'OUT';
    quantity: number;
    reason: string | null;
    reference_note: string | null;
    created_by: number | null;
}): Promise<{ movementId: number }> => {
    const product = await getProductById(data.product_id);
    if (!product) {
        throw new Error('Product not found.');
    }

    if (data.movement_type === 'OUT' && Number(product.stock_quantity) < data.quantity) {
        throw new Error('Insufficient stock for this removal.');
    }

    const result: any = await db.execute(
        `INSERT INTO stock_movements (product_id, movement_type, quantity, reason, reference_note, created_by)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
            data.product_id,
            data.movement_type,
            data.quantity,
            data.reason || null,
            data.reference_note || null,
            data.created_by || null
        ]
    );

    const delta = data.movement_type === 'IN' ? data.quantity : -data.quantity;
    await adjustStockQuantity(data.product_id, delta);

    return { movementId: result.insertId };
};
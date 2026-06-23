import type { Request, Response } from 'express';
import {
    getMovementsByProduct,
    getAllMovements,
    createMovement
} from '../services/stockMovement.service.js';

// 1. GET ALL MOVEMENTS (history/ledger view)
export const getAllMovementsHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        const movements = await getAllMovements();
        return res.status(200).json({ success: true, data: movements });
    } catch (error: any) {
        console.error("Stock movement fetch error:", error);
        return res.status(500).json({ success: false, message: error.message, data: [] });
    }
};

// 2. GET MOVEMENTS FOR A SPECIFIC PRODUCT
export const getMovementsByProductHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        const movements = await getMovementsByProduct(Number(req.params.productId));
        return res.status(200).json({ success: true, data: movements });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message, data: [] });
    }
};

// 3. ADD STOCK (movement_type = IN)
export const addStockHandler = async (req: Request, res: Response): Promise<any> => {
    const { product_id, quantity, reason, reference_note } = req.body;
    const userId = (req as any).user?.id || null;

    if (!product_id || !quantity || Number(quantity) <= 0) {
        return res.status(400).json({ success: false, message: "Product and a valid quantity are required." });
    }

    try {
        const result = await createMovement({
            product_id: Number(product_id),
            movement_type: 'IN',
            quantity: Number(quantity),
            reason: reason || 'Stock added',
            reference_note: reference_note || null,
            created_by: userId
        });
        return res.status(201).json({ success: true, message: "Stock added successfully", data: result });
    } catch (error: any) {
        console.error("Add stock error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 4. REMOVE STOCK (movement_type = OUT)
export const removeStockHandler = async (req: Request, res: Response): Promise<any> => {
    const { product_id, quantity, reason, reference_note } = req.body;
    const userId = (req as any).user?.id || null;

    if (!product_id || !quantity || Number(quantity) <= 0) {
        return res.status(400).json({ success: false, message: "Product and a valid quantity are required." });
    }

    try {
        const result = await createMovement({
            product_id: Number(product_id),
            movement_type: 'OUT',
            quantity: Number(quantity),
            reason: reason || 'Stock removed',
            reference_note: reference_note || null,
            created_by: userId
        });
        return res.status(201).json({ success: true, message: "Stock removed successfully", data: result });
    } catch (error: any) {
        console.error("Remove stock error:", error);
        return res.status(400).json({ success: false, message: error.message });
    }
};
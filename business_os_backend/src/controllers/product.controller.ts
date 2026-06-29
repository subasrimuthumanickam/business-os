// import type { Request, Response } from 'express';
// import {
//     getAllProducts,
//     getProductById,
//     checkSkuExists,
//     createProduct,
//     updateProduct,
//     deleteProduct
// } from '../services/product.service.js';

// // 1. GET ALL PRODUCTS (supports ?search=&category_id=&status=)
// export const getAllProductsHandler = async (req: Request, res: Response): Promise<any> => {
//     try {

//         const search = req.query.search as string | undefined;
//         const category_id = req.query.category_id as string | undefined;
//         const status = req.query.status as string | undefined;

//         const filters: { search?: string; category_id?: number; status?: string } = {};
//         if (search) filters.search = String(search);
//         if (category_id) filters.category_id = Number(category_id);
//         if (status) filters.status = String(status);

//         const products = await getAllProducts(filters);

//         return res.status(200).json({ success: true, data: products });
//     } catch (error: any) {
//         console.error("Product fetch error:", error);
//         return res.status(500).json({ success: false, message: error.message, data: [] });
//     }
// };

// // 2. GET PRODUCT BY ID
// export const getProductHandler = async (req: Request, res: Response): Promise<any> => {
//     try {
//         const product = await getProductById(Number(req.params.id));
//         if (!product) {
//             return res.status(404).json({ success: false, message: "Product not found." });
//         }
//         return res.status(200).json({ success: true, data: product });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

// // 3. CREATE NEW PRODUCT
// export const createProductHandler = async (req: Request, res: Response): Promise<any> => {
//     const {
//         name, sku, category_id, price, cost, stock_quantity, unit, description,
//         type, tax_preference, sales_account, purchase_account
//     } = req.body;

//     if (!name || !sku) {
//         return res.status(400).json({ success: false, message: "Product name and SKU are required." });
//     }

//     // Guard against the exact bug we hit earlier: a stray numeric/typo value
//     // landing in `unit`. Unit should always be a short non-numeric word.
//     if (unit !== undefined && unit !== null && /^\d+$/.test(String(unit).trim())) {
//         return res.status(400).json({ success: false, message: "Unit cannot be a plain number." });
//     }

//     if (type !== undefined && !['goods', 'service'].includes(type)) {
//         return res.status(400).json({ success: false, message: "Type must be 'goods' or 'service'." });
//     }

//     if (tax_preference !== undefined && !['taxable', 'non-taxable'].includes(tax_preference)) {
//         return res.status(400).json({ success: false, message: "Tax preference must be 'taxable' or 'non-taxable'." });
//     }

//     try {
//         const skuExists = await checkSkuExists(sku);
//         if (skuExists) {
//             return res.status(400).json({ success: false, message: "A product with this SKU already exists." });
//         }

//         const insertId = await createProduct({
//             name,
//             sku,
//             category_id: category_id || null,
//             price: Number(price) || 0,
//             cost: Number(cost) || 0,
//             stock_quantity: Number(stock_quantity) || 0,
//             unit: unit || 'pcs',
//             description: description || null,
//             type: type || 'goods',
//             tax_preference: tax_preference || 'taxable',
//             sales_account: sales_account || 'Sales',
//             purchase_account: purchase_account || 'Cost of Goods Sold'
//         });

//         return res.status(201).json({ success: true, message: "Product added successfully", data: { id: insertId } });
//     } catch (error: any) {
//         console.error("Product create error:", error);
//         if (error.code === 'ER_DUP_ENTRY') {
//             return res.status(400).json({ success: false, message: "A product with this SKU already exists." });
//         }
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

// // 4. UPDATE PRODUCT
// export const updateProductHandler = async (req: Request, res: Response): Promise<any> => {
//     const { id } = req.params;
//     const {
//         name, sku, category_id, price, cost, unit, description, status,
//         type, tax_preference, sales_account, purchase_account
//     } = req.body;

//     if (!name || !sku) {
//         return res.status(400).json({ success: false, message: "Product name and SKU are required." });
//     }

//     if (unit !== undefined && unit !== null && /^\d+$/.test(String(unit).trim())) {
//         return res.status(400).json({ success: false, message: "Unit cannot be a plain number." });
//     }

//     try {
//         const skuExists = await checkSkuExists(sku, Number(id));
//         if (skuExists) {
//             return res.status(400).json({ success: false, message: "A product with this SKU already exists." });
//         }

//         await updateProduct(Number(id), {
//             name,
//             sku,
//             category_id: category_id || null,
//             price: Number(price) || 0,
//             cost: Number(cost) || 0,
//             unit: unit || 'pcs',
//             description: description || null,
//             status: status || 'active',
//             type: type || 'goods',
//             tax_preference: tax_preference || 'taxable',
//             sales_account: sales_account || 'Sales',
//             purchase_account: purchase_account || 'Cost of Goods Sold'
//         });

//         return res.status(200).json({ success: true, message: "Product updated successfully" });
//     } catch (error: any) {
//         console.error("Product update error:", error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

// // 5. DELETE PRODUCT
// export const deleteProductHandler = async (req: Request, res: Response): Promise<any> => {
//     const { id } = req.params;
//     try {
//         await deleteProduct(Number(id));
//         return res.status(200).json({ success: true, message: "Product removed successfully" });
//     } catch (error: any) {
//         console.error("Product delete error:", error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

import type { Request, Response } from 'express';
import {
    getAllProducts,
    getProductById,
    checkSkuExists,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProductsByTerm
} from '../services/product.service.js';

// 1. GET ALL PRODUCTS (supports ?search=&category_id=&status=)
export const getAllProductsHandler = async (req: Request, res: Response): Promise<any> => {
    try {

        const search = req.query.search as string | undefined;
        const category_id = req.query.category_id as string | undefined;
        const status = req.query.status as string | undefined;

        const filters: { search?: string; category_id?: number; status?: string } = {};
        if (search) filters.search = String(search);
        if (category_id) filters.category_id = Number(category_id);
        if (status) filters.status = String(status);

        const products = await getAllProducts(filters);

        return res.status(200).json({ success: true, data: products });
    } catch (error: any) {
        console.error("Product fetch error:", error);
        return res.status(500).json({ success: false, message: error.message, data: [] });
    }
};

// 2. GET PRODUCT BY ID
export const getProductHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        const product = await getProductById(Number(req.params.id));
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        return res.status(200).json({ success: true, data: product });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 3. CREATE NEW PRODUCT
export const createProductHandler = async (req: Request, res: Response): Promise<any> => {
    const {
        name, sku, category_id, price, cost, stock_quantity, unit, description,
        type, tax_preference, sales_account, purchase_account
    } = req.body;

    if (!name || !sku) {
        return res.status(400).json({ success: false, message: "Product name and SKU are required." });
    }

    // Guard against the exact bug we hit earlier: a stray numeric/typo value
    // landing in `unit`. Unit should always be a short non-numeric word.
    if (unit !== undefined && unit !== null && /^\d+$/.test(String(unit).trim())) {
        return res.status(400).json({ success: false, message: "Unit cannot be a plain number." });
    }

    if (type !== undefined && !['goods', 'service'].includes(type)) {
        return res.status(400).json({ success: false, message: "Type must be 'goods' or 'service'." });
    }

    if (tax_preference !== undefined && !['taxable', 'non-taxable'].includes(tax_preference)) {
        return res.status(400).json({ success: false, message: "Tax preference must be 'taxable' or 'non-taxable'." });
    }

    try {
        const skuExists = await checkSkuExists(sku);
        if (skuExists) {
            return res.status(400).json({ success: false, message: "A product with this SKU already exists." });
        }

        const insertId = await createProduct({
            name,
            sku,
            category_id: category_id || null,
            price: Number(price) || 0,
            cost: Number(cost) || 0,
            stock_quantity: Number(stock_quantity) || 0,
            unit: unit || 'pcs',
            description: description || null,
            type: type || 'goods',
            tax_preference: tax_preference || 'taxable',
            sales_account: sales_account || 'Sales',
            purchase_account: purchase_account || 'Cost of Goods Sold'
        });

        return res.status(201).json({ success: true, message: "Product added successfully", data: { id: insertId } });
    } catch (error: any) {
        console.error("Product create error:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: "A product with this SKU already exists." });
        }
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 4. UPDATE PRODUCT
export const updateProductHandler = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const {
        name, sku, category_id, price, cost, unit, description, status,
        type, tax_preference, sales_account, purchase_account
    } = req.body;

    if (!name || !sku) {
        return res.status(400).json({ success: false, message: "Product name and SKU are required." });
    }

    if (unit !== undefined && unit !== null && /^\d+$/.test(String(unit).trim())) {
        return res.status(400).json({ success: false, message: "Unit cannot be a plain number." });
    }

    try {
        const skuExists = await checkSkuExists(sku, Number(id));
        if (skuExists) {
            return res.status(400).json({ success: false, message: "A product with this SKU already exists." });
        }

        await updateProduct(Number(id), {
            name,
            sku,
            category_id: category_id || null,
            price: Number(price) || 0,
            cost: Number(cost) || 0,
            unit: unit || 'pcs',
            description: description || null,
            status: status || 'active',
            type: type || 'goods',
            tax_preference: tax_preference || 'taxable',
            sales_account: sales_account || 'Sales',
            purchase_account: purchase_account || 'Cost of Goods Sold'
        });

        return res.status(200).json({ success: true, message: "Product updated successfully" });
    } catch (error: any) {
        console.error("Product update error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 5. DELETE PRODUCT
export const deleteProductHandler = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    try {
        await deleteProduct(Number(id));
        return res.status(200).json({ success: true, message: "Product removed successfully" });
    } catch (error: any) {
        console.error("Product delete error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 6. SEARCH PRODUCTS — CreateInvoice / CreateEstimate / CreateSalesOrder
//    line-item autocomplete (mirrors searchCustomers' shape)
export const searchProductsHandler = async (req: Request, res: Response): Promise<any> => {
    const q = (req.query.q as string) || '';

    if (!q.trim()) {
        return res.status(200).json({ success: true, data: [] });
    }

    try {
        const products = await searchProductsByTerm(q);
        return res.status(200).json({ success: true, data: products });
    } catch (error: any) {
        console.error("Product search error:", error);
        return res.status(500).json({ success: false, message: error.message, data: [] });
    }
};
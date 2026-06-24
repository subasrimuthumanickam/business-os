import type { Request, Response } from 'express';
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from '../services/category.service.js';

// 1. GET ALL CATEGORIES
export const getAllCategoriesHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        const categories = await getAllCategories();
        return res.status(200).json({ success: true, data: categories });
    } catch (error: any) {
        console.error("Category fetch error:", error);
        return res.status(500).json({ success: false, message: error.message, data: [] });
    }
};

// 2. GET CATEGORY BY ID
export const getCategoryHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        const category = await getCategoryById(Number(req.params.id));
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found." });
        }
        return res.status(200).json({ success: true, data: category });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 3. CREATE NEW CATEGORY
export const createCategoryHandler = async (req: Request, res: Response): Promise<any> => {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({ success: false, message: "Category name is required." });
    }

    try {
        const insertId = await createCategory(name.trim(), description);
        return res.status(201).json({ success: true, message: "Category added successfully", data: { id: insertId } });
    } catch (error: any) {
        console.error("Category create error:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: "A category with this name already exists." });
        }
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 4. UPDATE CATEGORY
export const updateCategoryHandler = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({ success: false, message: "Category name is required." });
    }

    try {
        await updateCategory(Number(id), name.trim(), description);
        return res.status(200).json({ success: true, message: "Category updated successfully" });
    } catch (error: any) {
        console.error("Category update error:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: "A category with this name already exists." });
        }
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 5. DELETE CATEGORY
export const deleteCategoryHandler = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    try {
        await deleteCategory(Number(id));
        return res.status(200).json({ success: true, message: "Category removed successfully" });
    } catch (error: any) {
        console.error("Category delete error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
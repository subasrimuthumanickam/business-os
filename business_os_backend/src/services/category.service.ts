import db from '../config/db.js';

export const getAllCategories = async (): Promise<any[]> => {
    const rows = await db.execute('SELECT * FROM categories ORDER BY name ASC', []);
    return rows as any[];
};

export const getCategoryById = async (id: number): Promise<any> => {
    const rows = await db.execute('SELECT * FROM categories WHERE id = ?', [id]) as any[];
    return rows.length > 0 ? rows[0] : null;
};

export const createCategory = async (name: string, description: string | null): Promise<number> => {
    const result: any = await db.execute(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [name, description || null]
    );
    return result.insertId;
};

export const updateCategory = async (id: number, name: string, description: string | null): Promise<number> => {
    const result: any = await db.execute(
        'UPDATE categories SET name = ?, description = ? WHERE id = ?',
        [name, description || null, id]
    );
    return result.affectedRows;
};

export const deleteCategory = async (id: number): Promise<number> => {
    const result: any = await db.execute('DELETE FROM categories WHERE id = ?', [id]);
    return result.affectedRows;
};
// import { pool } from '../config/db.js';
// import type { ResultSetHeader } from 'mysql2';

// // Interface specifying strict parameters for creating a user
// export interface UserInput {
//     tenant_id: number;
//     role_id: number;
//     name: string;
//     email: string;
//     password_hash: string;
// }

// export const UserModel = {
//     // 1. Create a brand new user row linked to a tenant
//     createUser: async (userData: UserInput): Promise<number> => {
//         const [result] = await pool.execute<ResultSetHeader>(
//             'INSERT INTO users (tenant_id, role_id, name, email, password_hash) VALUES (?, ?, ?, ?, ?)',
//             [userData.tenant_id, userData.role_id, userData.name, userData.email, userData.password_hash]
//         );
//         return result.insertId;
//     },

//     // 2. Helper function to check if email already exists
//     findByEmail: async (email: string): Promise<any | null> => {
//         const [rows]: any = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
//         return rows.length > 0 ? rows[0] : null;
//     }

//     static async findById(id: number) {
//     // Ensure 'db' is imported here and the SQL column matches your DB table
//     const [rows] = await db.execute('SELECT * FROM users WHERE user_id = ?', [id]);
//     return (rows as any)[0];
// }
// };

import { pool } from '../config/db.js';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface UserInput {
    tenant_id: number;
    role_id: number;
    name: string;
    email: string;
    password_hash: string;
}

export const UserModel = {
    // 1. Create a brand new user row
    createUser: async (userData: UserInput): Promise<number> => {
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO users (tenant_id, role_id, name, email, password_hash) VALUES (?, ?, ?, ?, ?)',
            [userData.tenant_id, userData.role_id, userData.name, userData.email, userData.password_hash]
        );
        return result.insertId;
    },

    // 2. Helper function to check if email already exists
    findByEmail: async (email: string) => {
        const [rows] = await pool.execute<RowDataPacket[]>(
            'SELECT * FROM users WHERE email = ?', 
            [email]
        );
        return rows.length > 0 ? rows[0] : null;
    },

    // 3. Find user by ID (Corrected syntax)
    findById: async (id: number) => {
        const [rows] = await pool.execute<RowDataPacket[]>(
            'SELECT * FROM users WHERE user_id = ?', 
            [id]
        );
        return rows.length > 0 ? rows[0] : null;
    }
};
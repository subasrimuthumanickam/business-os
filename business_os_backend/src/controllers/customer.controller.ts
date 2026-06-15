// import type { Request, Response } from 'express';
// import db from '../config/db.js'; 

// // 1. GET ALL CUSTOMERS
// export const getAllCustomers = async (req: Request, res: Response): Promise<any> => {
//     try {
//         // Now db.all fits perfectly into your wrapper object specification loop!
//         db.all('SELECT * FROM customers WHERE company_id = 1', [], (err: any, rows: any) => {
//             if (err) {
//                 console.error("SQL Extraction Failure Matrix:", err);
//                 return res.status(500).json({ success: false, message: err.message, data: [] });
//             }
//             return res.status(200).json({ 
//                 success: true, 
//                 data: rows || [] 
//             });
//         });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: error.message, data: [] });
//     }
// };

// // 2. CREATE NEW CUSTOMER
// export const createNewCustomer = async (req: Request, res: Response): Promise<any> => {
//     const { name, email, location } = req.body;
//     try {
//         const company_id = 1; 
//         db.run(
//             'INSERT INTO customers (company_id, name, email, location, orders, amountSpent) VALUES (?, ?, ?, ?, 0, 0.00)', 
//             [company_id, name, email, location],
//             function(err: any) {
//                 if (err) {
//                     return res.status(500).json({ success: false, message: err.message });
//                 }
//                 return res.status(201).json({ success: true, message: "Customer added successfully" });
//             }
//         );
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

// // 3. UPDATE CUSTOMER DATA 
// export const updateCustomer = async (req: Request, res: Response): Promise<any> => {
//     const { id } = req.params;
//     const { name, email, location } = req.body;
//     try {
//         db.run(
//             'UPDATE customers SET name = ?, email = ?, location = ? WHERE id = ?', 
//             [name, email, location, id],
//             function(err: any) {
//                 if (err) {
//                     return res.status(500).json({ success: false, message: err.message });
//                 }
//                 return res.status(200).json({ success: true, message: "Customer data synchronized" });
//             }
//         );
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

// // 4. REMOVE CUSTOMER 
// export const removeCustomer = async (req: Request, res: Response): Promise<any> => {
//     const { id } = req.params;
//     try {
//         db.run('DELETE FROM customers WHERE id = ?', [id], function(err: any) {
//             if (err) {
//                 return res.status(500).json({ success: false, message: err.message });
//             }
//             return res.status(200).json({ success: true, message: "Record dropped from tenant zone" });
//         });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

import type { Request, Response } from 'express';
import db from '../config/db.js'; 

// 1. GET ALL CUSTOMERS
export const getAllCustomers = async (req: Request, res: Response): Promise<any> => {
    try {
        db.all('SELECT * FROM customers WHERE company_id = 1', [], (err: any, rows: any) => {
            if (err) {
                console.error("SQL Extraction Failure Matrix:", err);
                return res.status(500).json({ success: false, message: err.message, data: [] });
            }
            return res.status(200).json({ 
                success: true, 
                data: rows || [] 
            });
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message, data: [] });
    }
};

// 2. CREATE NEW CUSTOMER (UPDATED WITH ZOHO MODEL FIELDS)
export const createNewCustomer = async (req: Request, res: Response): Promise<any> => {
    const { 
        customer_type, 
        salutation, 
        first_name, 
        last_name, 
        company_name, 
        display_name, 
        email, 
        phone_work, 
        phone_mobile, 
        currency, 
        location 
    } = req.body;

    // Validation Check: Display name and Email are mandatory
    if (!display_name || !email) {
        return res.status(400).json({ success: false, message: "Display Name and Email are required." });
    }

    try {
        const company_id = 1; 
        
        const query = `
            INSERT INTO customers (
                company_id, customer_type, salutation, first_name, last_name, 
                company_name, display_name, email, phone_work, phone_mobile, 
                currency, location
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
            company_id,
            customer_type || 'Business',
            salutation || null,
            first_name || null,
            last_name || null,
            company_name || null,
            display_name,
            email,
            phone_work || null,
            phone_mobile || null,
            currency || 'INR',
            location || null
        ];

        db.run(query, params, function(err: any) {
            if (err) {
                console.error("SQLite Insertion Failure:", err);
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ success: false, message: "A customer with this email already exists." });
                }
                return res.status(500).json({ success: false, message: err.message });
            }
            return res.status(201).json({ success: true, message: "Customer profile added successfully" });
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 3. UPDATE CUSTOMER DATA (UPDATED WITH ZOHO MODEL FIELDS)
export const updateCustomer = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { 
        customer_type, 
        salutation, 
        first_name, 
        last_name, 
        company_name, 
        display_name, 
        email, 
        phone_work, 
        phone_mobile, 
        currency, 
        location 
    } = req.body;

    if (!display_name || !email) {
        return res.status(400).json({ success: false, message: "Display Name and Email are required." });
    }

    try {
        const query = `
            UPDATE customers SET 
                customer_type = ?, salutation = ?, first_name = ?, last_name = ?, 
                company_name = ?, display_name = ?, email = ?, phone_work = ?, 
                phone_mobile = ?, currency = ?, location = ? 
            WHERE id = ?
        `;

        const params = [
            customer_type || 'Business',
            salutation || null,
            first_name || null,
            last_name || null,
            company_name || null,
            display_name,
            email,
            phone_work || null,
            phone_mobile || null,
            currency || 'INR',
            location || null,
            id
        ];

        db.run(query, params, function(err: any) {
            if (err) {
                console.error("SQLite Update Failure:", err);
                return res.status(500).json({ success: false, message: err.message });
            }
            return res.status(200).json({ success: true, message: "Customer data synchronized" });
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 4. REMOVE CUSTOMER 
export const removeCustomer = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    try {
        db.run('DELETE FROM customers WHERE id = ?', [id], function(err: any) {
            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }
            return res.status(200).json({ success: true, message: "Record dropped from tenant zone" });
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
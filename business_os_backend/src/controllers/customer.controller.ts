// import type { Request, Response } from 'express';
// import db from '../config/db.js';
// import {
//     getCustomerById,
//     getCustomerInvoices,
//     getCustomerPayments
// } from '../services/customer.service.js';

// // 1. GET ALL CUSTOMERS
// export const getAllCustomers = async (req: Request, res: Response): Promise<any> => {
//     try {
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

// // 2. CREATE NEW CUSTOMER (UPDATED WITH ZOHO MODEL FIELDS)
// export const createNewCustomer = async (req: Request, res: Response): Promise<any> => {
//     const {
//         customer_type,
//         salutation,
//         first_name,
//         last_name,
//         company_name,
//         display_name,
//         email,
//         phone_work,
//         phone_mobile,
//         currency,
//         location,
//         tax_rule,          // ✅ ADDED — was missing, so it never reached the INSERT
//         billing_address,   // ✅ ADDED — was missing, so it never reached the INSERT
//         shipping_address   // ✅ ADDED — was missing, so it never reached the INSERT
//     } = req.body;

//     if (!display_name || !email) {
//         return res.status(400).json({ success: false, message: "Display Name and Email are required." });
//     }

//     try {
//         const company_id = 1;

//         const query = `
//             INSERT INTO customers (
//                 company_id, customer_type, salutation, first_name, last_name,
//                 company_name, display_name, email, phone_work, phone_mobile,
//                 currency, location, tax_preference, billing_address, shipping_address
//             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//         const params = [
//             company_id,
//             customer_type || 'Business',
//             salutation || null,
//             first_name || null,
//             last_name || null,
//             company_name || null,
//             display_name,
//             email,
//             phone_work || null,
//             phone_mobile || null,
//             currency || 'INR',
//             location || null,
//             tax_rule || null,
//             billing_address || null,
//             shipping_address || null
//         ];

//         db.run(query, params, function(err: any) {
//             if (err) {
//                 console.error("SQLite Insertion Failure:", err);
//                 if (err.message.includes('UNIQUE constraint failed')) {
//                     return res.status(400).json({ success: false, message: "A customer with this email already exists." });
//                 }
//                 return res.status(500).json({ success: false, message: err.message });
//             }
//             return res.status(201).json({ success: true, message: "Customer profile added successfully" });
//         });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

// // 3. UPDATE CUSTOMER DATA
// export const updateCustomer = async (req: Request, res: Response): Promise<any> => {
//     const { id } = req.params;
//     const {
//         customer_type,
//         salutation,
//         first_name,
//         last_name,
//         company_name,
//         display_name,
//         email,
//         phone_work,
//         phone_mobile,
//         currency,
//         location,
//         tax_rule,          // ✅ ADDED — was missing, so edits to Address tab never saved
//         billing_address,   // ✅ ADDED — was missing, so edits to Address tab never saved
//         shipping_address   // ✅ ADDED — was missing, so edits to Address tab never saved
//     } = req.body;

//     if (!display_name || !email) {
//         return res.status(400).json({ success: false, message: "Display Name and Email are required." });
//     }

//     try {
//         const query = `
//             UPDATE customers SET
//                 customer_type = ?, salutation = ?, first_name = ?, last_name = ?,
//                 company_name = ?, display_name = ?, email = ?, phone_work = ?,
//                 phone_mobile = ?, currency = ?, location = ?, tax_preference = ?,
//                 billing_address = ?, shipping_address = ?
//             WHERE id = ?
//         `;

//         const params = [
//             customer_type || 'Business',
//             salutation || null,
//             first_name || null,
//             last_name || null,
//             company_name || null,
//             display_name,
//             email,
//             phone_work || null,
//             phone_mobile || null,
//             currency || 'INR',
//             location || null,
//             tax_rule || null,
//             billing_address || null,
//             shipping_address || null,
//             id
//         ];

//         db.run(query, params, function(err: any) {
//             if (err) {
//                 console.error("SQLite Update Failure:", err);
//                 return res.status(500).json({ success: false, message: err.message });
//             }
//             return res.status(200).json({ success: true, message: "Customer data synchronized" });
//         });
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

// // ✅ 5. SEARCH CUSTOMERS — CreateInvoice autocomplete-க்கு
// export const searchCustomers = async (req: Request, res: Response): Promise<any> => {
//     const q = (req.query.q as string) || '';

//     if (!q.trim()) {
//         return res.status(200).json({ success: true, data: [] });
//     }

//     try {
//         const searchTerm = `%${q}%`;

//         db.all(
//             `SELECT id, display_name, email
//              FROM customers
//              WHERE company_id = 1
//                AND (display_name LIKE ? OR email LIKE ?)
//              LIMIT 10`,
//             [searchTerm, searchTerm],
//             (err: any, rows: any) => {
//                 if (err) {
//                     console.error("Customer search error:", err);
//                     return res.status(500).json({ success: false, message: err.message, data: [] });
//                 }
//                 return res.status(200).json({ success: true, data: rows || [] });
//             }
//         );
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: error.message, data: [] });
//     }
// };

// // 6. GET CUSTOMER DETAILS
// export const getCustomerDetails = async (req: Request, res: Response): Promise<any> => {
//     try {
//         const customer = await getCustomerById(Number(req.params.id));
//         return res.status(200).json({ success: true, data: customer });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

// // 7. GET CUSTOMER INVOICES
// export const getInvoicesByCustomer = async (req: Request, res: Response): Promise<any> => {
//     try {
//         const invoices = await getCustomerInvoices(Number(req.params.id));
//         return res.status(200).json({ success: true, data: invoices });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

// // 8. GET CUSTOMER PAYMENTS
// export const getPaymentsByCustomer = async (req: Request, res: Response): Promise<any> => {
//     try {
//         const payments = await getCustomerPayments(Number(req.params.id));
//         return res.status(200).json({ success: true, data: payments });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

import type { Request, Response } from 'express';
import db from '../config/db.js';
import {
    getCustomerById,
    getCustomerInvoices,
    getCustomerPayments
} from '../services/customer.service.js';

// 1. GET ALL CUSTOMERS
export const getAllCustomers = async (req: Request, res: Response): Promise<any> => {
    try {
        // amountSpent here = live "Receivables" total: sum of that customer's
        // invoices which are still Draft/Pending, computed on the fly since
        // customers has no such stored column. Paid invoices are excluded —
        // they're no longer receivable.
        const query = `
            SELECT
                customers.*,
                COALESCE((
                    SELECT SUM(invoices.total)
                    FROM invoices
                    WHERE invoices.customer_id = customers.id
                      AND invoices.status IN ('Draft', 'Pending')
                ), 0) AS amountSpent
            FROM customers
            WHERE customers.company_id = 1
        `;

        db.all(query, [], (err: any, rows: any) => {
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
        location,
        tax_rule,          // ✅ ADDED — was missing, so it never reached the INSERT
        billing_address,   // ✅ ADDED — was missing, so it never reached the INSERT
        shipping_address   // ✅ ADDED — was missing, so it never reached the INSERT
    } = req.body;

    if (!display_name || !email) {
        return res.status(400).json({ success: false, message: "Display Name and Email are required." });
    }

    try {
        const company_id = 1;

        const query = `
            INSERT INTO customers (
                company_id, customer_type, salutation, first_name, last_name,
                company_name, display_name, email, phone_work, phone_mobile,
                currency, location, tax_preference, billing_address, shipping_address
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            location || null,
            tax_rule || null,
            billing_address || null,
            shipping_address || null
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

// 3. UPDATE CUSTOMER DATA
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
        location,
        tax_rule,          // ✅ ADDED — was missing, so edits to Address tab never saved
        billing_address,   // ✅ ADDED — was missing, so edits to Address tab never saved
        shipping_address   // ✅ ADDED — was missing, so edits to Address tab never saved
    } = req.body;

    if (!display_name || !email) {
        return res.status(400).json({ success: false, message: "Display Name and Email are required." });
    }

    try {
        const query = `
            UPDATE customers SET
                customer_type = ?, salutation = ?, first_name = ?, last_name = ?,
                company_name = ?, display_name = ?, email = ?, phone_work = ?,
                phone_mobile = ?, currency = ?, location = ?, tax_preference = ?,
                billing_address = ?, shipping_address = ?
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
            tax_rule || null,
            billing_address || null,
            shipping_address || null,
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

// ✅ 5. SEARCH CUSTOMERS — CreateInvoice autocomplete-க்கு
export const searchCustomers = async (req: Request, res: Response): Promise<any> => {
    const q = (req.query.q as string) || '';

    if (!q.trim()) {
        return res.status(200).json({ success: true, data: [] });
    }

    try {
        const searchTerm = `%${q}%`;

        db.all(
            `SELECT id, display_name, email
             FROM customers
             WHERE company_id = 1
               AND (display_name LIKE ? OR email LIKE ?)
             LIMIT 10`,
            [searchTerm, searchTerm],
            (err: any, rows: any) => {
                if (err) {
                    console.error("Customer search error:", err);
                    return res.status(500).json({ success: false, message: err.message, data: [] });
                }
                return res.status(200).json({ success: true, data: rows || [] });
            }
        );
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message, data: [] });
    }
};

// 6. GET CUSTOMER DETAILS
export const getCustomerDetails = async (req: Request, res: Response): Promise<any> => {
    try {
        const customer = await getCustomerById(Number(req.params.id));
        return res.status(200).json({ success: true, data: customer });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 7. GET CUSTOMER INVOICES
export const getInvoicesByCustomer = async (req: Request, res: Response): Promise<any> => {
    try {
        const invoices = await getCustomerInvoices(Number(req.params.id));
        return res.status(200).json({ success: true, data: invoices });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 8. GET CUSTOMER PAYMENTS
export const getPaymentsByCustomer = async (req: Request, res: Response): Promise<any> => {
    try {
        const payments = await getCustomerPayments(Number(req.params.id));
        return res.status(200).json({ success: true, data: payments });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
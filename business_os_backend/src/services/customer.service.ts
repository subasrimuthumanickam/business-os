import db from '../config/db.js';
import type { Customer } from '../models/customer.model.js';

/**
 * GET ALL CUSTOMERS BY COMPANY
 */
export const getCustomersByCompany = async (
    companyId: number
): Promise<Customer[]> => {

    return new Promise<Customer[]>((resolve, reject) => {

        (db as any).all(
            'SELECT * FROM customers WHERE company_id = ?',
            [companyId],
            (err: Error | null, rows: Customer[]) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }

            }
        );

    });

};

/**
 * GET SINGLE CUSTOMER
 */
export const getCustomerById = async (
    id: number
): Promise<any> => {

    return new Promise((resolve, reject) => {

        (db as any).get(
            'SELECT * FROM customers WHERE id = ?',
            [id],
            (err: Error | null, row: any) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }

            }
        );

    });

};

/**
 * GET CUSTOMER INVOICES
 */
export const getCustomerInvoices = async (
    customerId: number
): Promise<any[]> => {

    return new Promise((resolve, reject) => {

        (db as any).all(
            `
            SELECT *
            FROM invoices
            WHERE customer_id = ?
            ORDER BY created_at DESC
            `,
            [customerId],
            (err: Error | null, rows: any[]) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }

            }
        );

    });

};

/**
 * GET CUSTOMER PAYMENTS
 */
export const getCustomerPayments = async (
    customerId: number
): Promise<any[]> => {

    return new Promise((resolve, reject) => {

        (db as any).all(
            `
            SELECT *
            FROM payments
            WHERE customer_id = ?
            ORDER BY created_at DESC
            `,
            [customerId],
            (err: Error | null, rows: any[]) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }

            }
        );

    });

};
import db from '../config/db.js'; 
import type { Customer } from '../models/customer.model.js';

export const getCustomersByCompany = async (companyId: number): Promise<Customer[]> => {
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
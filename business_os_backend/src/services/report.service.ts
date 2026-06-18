import db from "../config/db.js"; 

export const getSalesSummary = async (startDate: string, endDate: string) => {
    const query = `
        SELECT 
            DATE(invoice_date) as date, 
            SUM(total) as revenue 
        FROM invoices 
        WHERE invoice_date BETWEEN ? AND ? 
        GROUP BY DATE(invoice_date)`;
    
    return await db.execute(query, [startDate, endDate]);
};
export const getInventorySummary = async () => {
    const query = `
        SELECT 
            invoice_number, 
            total 
        FROM invoices 
        ORDER BY total DESC 
        LIMIT 10`; 
    
    return await db.execute(query, []);
};
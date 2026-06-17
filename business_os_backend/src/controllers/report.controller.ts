import type { Request, Response } from 'express';
import { getSalesSummary, getInventorySummary } from '../services/report.service.js';

export const getSalesReport = async (req: Request, res: Response) => {
    try {
        // Frontend-la irundhu date params varum
        const { startDate, endDate } = req.query;
        const data = await getSalesSummary(startDate as string, endDate as string);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales report', error });
    }
};

export const getInventoryReport = async (req: Request, res: Response) => {
    try {
        const data = await getInventorySummary();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inventory report', error });
    }
};
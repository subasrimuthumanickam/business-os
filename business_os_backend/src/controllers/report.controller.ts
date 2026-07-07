import type { Request, Response } from 'express';
import { getSalesSummary, getInventorySummary, getProfitAndLoss, getBalanceSheet, getCashFlow } from '../services/report.service.js';

export const getSalesReport = async (req: Request, res: Response) => {
    try {
        
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

export const getProfitAndLossReport = async (req: Request, res: Response): Promise<any> => {
  try {
    const { from, to } = req.query;
    const data = await getProfitAndLoss(from as string, to as string);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBalanceSheetReport = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await getBalanceSheet();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCashFlowReport = async (req: Request, res: Response): Promise<any> => {
  try {
    const { from, to } = req.query;
    const data = await getCashFlow(from as string, to as string);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
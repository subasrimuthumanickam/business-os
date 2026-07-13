import type { Request, Response } from 'express';
import { getSalesSummary, getInventorySummary, getProfitAndLoss, getBalanceSheet, getCashFlow, 
  getSalesByCustomer, getSalesByItem, getSalesBySalesPerson, getInventorySummaryReport, getInventoryValuationSummary, 
  getProductSalesReport,
  getLandedCostSummary,
  getFifoCostLotTracking,
  getCustomerSummary,
  getCustomerAgingReport,
  getLeadSummary,
  getCustomerTransactions} from '../services/report.service.js';

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

export const getSalesByCustomerReport = async (req: Request, res: Response): Promise<any> => {
  try {
    const { from, to } = req.query;
    const data = await getSalesByCustomer(from as string, to as string);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSalesByItemReport = async (req: Request, res: Response): Promise<any> => {
  try {
    const { from, to } = req.query;
    const data = await getSalesByItem(from as string, to as string);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getSalesBySalesPersonReport = async (req: Request, res: Response): Promise<any> => {
  try {
    const { from, to } = req.query;
    const data = await getSalesBySalesPerson(from as string, to as string);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getInventorySummaryController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await getInventorySummaryReport();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getInventoryValuationSummaryController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await getInventoryValuationSummary();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductSalesReportController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await getProductSalesReport();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLandedCostSummaryController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await getLandedCostSummary();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFifoCostLotTrackingController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await getFifoCostLotTracking();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCustomerSummaryController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await getCustomerSummary();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getCustomerAgingReportController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await getCustomerAgingReport();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLeadSummaryController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await getLeadSummary();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add to report.controller.ts

// 1. Add getCustomerTransactions to the import from '../services/report.service.js'

// 2. Add this controller function:
export const getCustomerTransactionsController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await getCustomerTransactions();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
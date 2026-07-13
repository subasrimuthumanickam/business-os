import type { Request, Response } from 'express';
import { getDashboardData } from '../services/dashboardService.js';

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const data = await getDashboardData();
    res.status(200).json(data);
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    res.status(500).json({ message: 'Failed to load dashboard data' });
  }
};
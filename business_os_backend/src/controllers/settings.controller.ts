
import type { Request, Response } from 'express';
import settingsService from '../services/settings.service.js';

export const getGeneralSettings = async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).user.companyId;
    const data = await settingsService.getGeneralSettings(companyId);
    res.json({ success: true, data });
  } catch (error) {
    console.error('getGeneralSettings error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch general settings' });
  }
};

export const updateGeneralSettings = async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).user.companyId;
    const data = await settingsService.updateGeneralSettings(companyId, req.body);
    res.json({ success: true, data });
  } catch (error) {
    console.error('updateGeneralSettings error:', error);
    res.status(500).json({ success: false, message: 'Failed to update general settings' });
  }
};

export const getFinancialSettings = async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).user.companyId;
    const data = await settingsService.getFinancialSettings(companyId);
    res.json({ success: true, data });
  } catch (error) {
    console.error('getFinancialSettings error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch financial settings' });
  }
};

export const updateFinancialSettings = async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).user.companyId;
    const data = await settingsService.updateFinancialSettings(companyId, req.body);
    res.json({ success: true, data });
  } catch (error) {
    console.error('updateFinancialSettings error:', error);
    res.status(500).json({ success: false, message: 'Failed to update financial settings' });
  }
};
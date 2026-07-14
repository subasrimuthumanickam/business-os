import type { Request, Response } from 'express';
import inventorySettingsService from '../services/inventorySettings.service.js';

export const inventorySettingsController = {
  getSettings: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const settings = await inventorySettingsService.getSettings(companyId);
      res.status(200).json({ success: true, data: settings });
    } catch (error: any) {
      console.error('Error fetching inventory settings:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateSettings: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const updated = await inventorySettingsService.updateSettings(companyId, req.body);
      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      console.error('Error updating inventory settings:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default inventorySettingsController;
import type { Request, Response } from 'express';
import chartOfAccountsService from '../services/chartOfAccounts.service.js';

export const chartOfAccountsController = {
  getAllAccounts: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const accounts = await chartOfAccountsService.getAllAccounts(companyId);
      res.status(200).json({ success: true, data: accounts });
    } catch (error: any) {
      console.error('Error fetching accounts:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getAccountById: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      const accountId = Number(req.params.id);
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const account = await chartOfAccountsService.getAccountById(companyId, accountId);
      if (!account) {
        res.status(404).json({ success: false, message: 'Account not found' });
        return;
      }

      res.status(200).json({ success: true, data: account });
    } catch (error: any) {
      console.error('Error fetching account:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  createAccount: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const { account_code, account_name, account_type } = req.body;
      if (!account_code || !account_name || !account_type) {
        res.status(400).json({ success: false, message: 'account_code, account_name and account_type are required' });
        return;
      }

      const account = await chartOfAccountsService.createAccount(companyId, req.body);
      res.status(201).json({ success: true, data: account });
    } catch (error: any) {
      console.error('Error creating account:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateAccount: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      const accountId = Number(req.params.id);
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const updated = await chartOfAccountsService.updateAccount(companyId, accountId, req.body);
      if (!updated) {
        res.status(404).json({ success: false, message: 'Account not found' });
        return;
      }

      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      console.error('Error updating account:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  deleteAccount: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      const accountId = Number(req.params.id);
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const deleted = await chartOfAccountsService.deleteAccount(companyId, accountId);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Account not found' });
        return;
      }

      res.status(200).json({ success: true, message: 'Account deleted' });
    } catch (error: any) {
      console.error('Error deleting account:', error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  toggleActive: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      const accountId = Number(req.params.id);
      const { is_active } = req.body;
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const updated = await chartOfAccountsService.toggleActive(companyId, accountId, !!is_active);
      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      console.error('Error toggling account status:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default chartOfAccountsController;
// src/controllers/company.controller.ts
import type { Request, Response } from 'express';
import companyService from '../services/company.service.js';

export const getCompanyProfile = async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).user.companyId;
    const data = await companyService.getProfile(companyId);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    res.json({ success: true, data });
  } catch (error) {
    console.error('getCompanyProfile error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch company profile' });
  }
};

export const updateCompanyProfile = async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).user.companyId;
    const data = await companyService.updateProfile(companyId, req.body);
    res.json({ success: true, data });
  } catch (error) {
    console.error('updateCompanyProfile error:', error);
    res.status(500).json({ success: false, message: 'Failed to update company profile' });
  }
};
import type { Request, Response } from 'express';
import warehouseService from '../services/warehouse.service.js';

export const warehouseController = {
  getAllWarehouses: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const warehouses = await warehouseService.getAllWarehouses(companyId);
      res.status(200).json({ success: true, data: warehouses });
    } catch (error: any) {
      console.error('Error fetching warehouses:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  createWarehouse: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const { warehouse_name, warehouse_code } = req.body;
      if (!warehouse_name || !warehouse_code) {
        res.status(400).json({ success: false, message: 'warehouse_name and warehouse_code are required' });
        return;
      }

      const warehouse = await warehouseService.createWarehouse(companyId, req.body);
      res.status(201).json({ success: true, data: warehouse });
    } catch (error: any) {
      console.error('Error creating warehouse:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateWarehouse: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      const warehouseId = Number(req.params.id);
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const updated = await warehouseService.updateWarehouse(companyId, warehouseId, req.body);
      if (!updated) {
        res.status(404).json({ success: false, message: 'Warehouse not found' });
        return;
      }

      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      console.error('Error updating warehouse:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  setDefaultWarehouse: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      const warehouseId = Number(req.params.id);
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const updated = await warehouseService.setDefaultWarehouse(companyId, warehouseId);
      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      console.error('Error setting default warehouse:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  toggleActive: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      const warehouseId = Number(req.params.id);
      const { is_active } = req.body;
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const updated = await warehouseService.toggleActive(companyId, warehouseId, !!is_active);
      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      console.error('Error toggling warehouse status:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  deleteWarehouse: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      const warehouseId = Number(req.params.id);
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const deleted = await warehouseService.deleteWarehouse(companyId, warehouseId);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Warehouse not found' });
        return;
      }

      res.status(200).json({ success: true, message: 'Warehouse deleted' });
    } catch (error: any) {
      console.error('Error deleting warehouse:', error);
      res.status(400).json({ success: false, message: error.message });
    }
  },
};

export default warehouseController;
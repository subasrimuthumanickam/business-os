import type { Request, Response } from 'express';
import approvalWorkflowService from '../services/approvalWorkflow.service.js';

export const approvalWorkflowController = {
  getAllWorkflows: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const { module } = req.query;
      const workflows =
        typeof module === 'string'
          ? await approvalWorkflowService.getWorkflowsByModule(companyId, module)
          : await approvalWorkflowService.getAllWorkflows(companyId);

      res.status(200).json({ success: true, data: workflows });
    } catch (error: any) {
      console.error('Error fetching approval workflows:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  createWorkflow: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const { module, min_amount, approver_role_id } = req.body;
      if (!module || min_amount === undefined || !approver_role_id) {
        res.status(400).json({
          success: false,
          message: 'module, min_amount and approver_role_id are required',
        });
        return;
      }

      const workflow = await approvalWorkflowService.createWorkflow(companyId, req.body);
      res.status(201).json({ success: true, data: workflow });
    } catch (error: any) {
      console.error('Error creating approval workflow:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateWorkflow: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      const workflowId = Number(req.params.id);
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const updated = await approvalWorkflowService.updateWorkflow(companyId, workflowId, req.body);
      if (!updated) {
        res.status(404).json({ success: false, message: 'Workflow not found' });
        return;
      }

      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      console.error('Error updating approval workflow:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  deleteWorkflow: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      const workflowId = Number(req.params.id);
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const deleted = await approvalWorkflowService.deleteWorkflow(companyId, workflowId);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Workflow not found' });
        return;
      }

      res.status(200).json({ success: true, message: 'Workflow deleted' });
    } catch (error: any) {
      console.error('Error deleting approval workflow:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  toggleActive: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      const workflowId = Number(req.params.id);
      const { is_active } = req.body;
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const updated = await approvalWorkflowService.toggleActive(companyId, workflowId, !!is_active);
      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      console.error('Error toggling workflow status:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default approvalWorkflowController;
import type { Request, Response } from 'express';
import securityService from '../services/Security.service.js';

export const securityController = {
  // ============= PASSWORD POLICY =============
  getSettings: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const settings = await securityService.getSecuritySettings(companyId);
      res.status(200).json({ success: true, data: settings });
    } catch (error: any) {
      console.error('Error fetching security settings:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateSettings: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      const userId = (req as any).user?.userId;
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const updated = await securityService.updateSecuritySettings(companyId, req.body);

      await securityService.logAction({
        user_id: userId,
        company_id: companyId,
        action: 'update',
        module: 'security_settings',
        description: 'Password policy / security settings updated',
        ip_address: req.ip,
      });

      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      console.error('Error updating security settings:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ============= LOGIN SESSIONS =============
  getSessions: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const sessions = await securityService.getActiveSessions(userId);
      res.status(200).json({ success: true, data: sessions });
    } catch (error: any) {
      console.error('Error fetching sessions:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  revokeSession: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.userId;
      const companyId = (req as any).user?.companyId;
      const sessionId = Number(req.params.id);

      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const revoked = await securityService.revokeSession(sessionId, userId);
      if (!revoked) {
        res.status(404).json({ success: false, message: 'Session not found or cannot be revoked' });
        return;
      }

      await securityService.logAction({
        user_id: userId,
        company_id: companyId,
        action: 'revoke_session',
        module: 'security_sessions',
        description: `Session ${sessionId} revoked`,
        ip_address: req.ip,
      });

      res.status(200).json({ success: true, message: 'Session revoked' });
    } catch (error: any) {
      console.error('Error revoking session:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  revokeAllOtherSessions: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.userId;
      const companyId = (req as any).user?.companyId;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const count = await securityService.revokeAllOtherSessions(userId);

      await securityService.logAction({
        user_id: userId,
        company_id: companyId,
        action: 'revoke_all_sessions',
        module: 'security_sessions',
        description: `${count} other session(s) revoked`,
        ip_address: req.ip,
      });

      res.status(200).json({ success: true, message: `${count} session(s) revoked` });
    } catch (error: any) {
      console.error('Error revoking sessions:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ============= AUDIT LOG =============
  getAuditLogs: async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req as any).user?.companyId;
      if (!companyId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const { module, action, page, pageSize } = req.query;
      const limit = pageSize ? Number(pageSize) : 25;
      const currentPage = page ? Number(page) : 1;
      const offset = (currentPage - 1) * limit;

      // Build filters conditionally so we never assign `undefined` explicitly
      // (required when tsconfig has exactOptionalPropertyTypes: true)
      const filters: { module?: string; action?: string; limit: number; offset: number } = {
        limit,
        offset,
      };
      if (typeof module === 'string') filters.module = module;
      if (typeof action === 'string') filters.action = action;

      const result = await securityService.getAuditLogs(companyId, filters);

      res.status(200).json({
        success: true,
        data: result.logs,
        pagination: {
          total: result.total,
          page: currentPage,
          pageSize: limit,
          totalPages: Math.ceil(result.total / limit),
        },
      });
    } catch (error: any) {
      console.error('Error fetching audit logs:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default securityController;
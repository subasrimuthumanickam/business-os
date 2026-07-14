import { Router } from 'express';
import securityController from '../controllers/Security.controller.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

// All routes require login (from /api/login-2fa JWT flow)
router.use(authenticateToken);

// Password policy / security settings
router.get('/settings', securityController.getSettings);
router.put('/settings', securityController.updateSettings);

// Login sessions
router.get('/sessions', securityController.getSessions);
router.delete('/sessions/:id', securityController.revokeSession);
router.post('/sessions/revoke-all', securityController.revokeAllOtherSessions);

// Audit log
router.get('/audit-logs', securityController.getAuditLogs);

export default router;
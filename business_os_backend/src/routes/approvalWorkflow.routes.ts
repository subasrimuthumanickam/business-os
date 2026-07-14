import { Router } from 'express';
import approvalWorkflowController from '../controllers/approvalWorkflow.controller.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', approvalWorkflowController.getAllWorkflows);
router.post('/', approvalWorkflowController.createWorkflow);
router.put('/:id', approvalWorkflowController.updateWorkflow);
router.patch('/:id/toggle-active', approvalWorkflowController.toggleActive);
router.delete('/:id', approvalWorkflowController.deleteWorkflow);

export default router;
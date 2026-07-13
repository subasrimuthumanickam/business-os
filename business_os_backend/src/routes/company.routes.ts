// src/routes/company.routes.ts
import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js'; // adjust to your actual middleware name
import { getCompanyProfile, updateCompanyProfile } from '../controllers/company.controller.js';

const router = express.Router();

router.get('/profile', authenticateToken, getCompanyProfile);
router.put('/profile', authenticateToken, updateCompanyProfile);

export default router;
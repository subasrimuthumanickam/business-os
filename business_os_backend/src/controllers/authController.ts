import type { Request, Response } from 'express';
import { authService } from '../services/authService.js';
import { TenantModel } from '../models/tenantModel.js';

const formatCompany = (companyName: string, id: number) => ({
    id,
    name: companyName,
    subdomain: companyName.trim().toLowerCase().replace(/\s+/g, '-')
});


export const authController = {
    registerCompany: async (req: Request, res: Response): Promise<void> => {
        try {
            const { company_name, admin_name, email, password } = req.body;

            if (!company_name || !admin_name || !email || !password) {
                res.status(400).json({ success: false, message: 'All fields are required.' });
                return;
            }

            const registrationResult = await authService.registerCompany({
                company_name,
                admin_name,
                email,
                password
            });

            res.status(201).json({
                success: true,
                token: registrationResult.token,
                company: formatCompany(company_name, registrationResult.tenantId)
            });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    },
// Add this inside your authController object
getProfile: async (req: Request, res: Response): Promise<void> => {
    try {
        // Assuming your auth middleware attaches the 'user' object to the request
        const userId = (req as any).user?.id; 

        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }

        // Fetch full data from your service
        // You may need to create this method in your authService
        const userProfile = await authService.getUserProfile(userId);

        res.status(200).json({
            success: true,
            data: userProfile
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
},
    login: async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ success: false, message: 'Email and password are required.' });
                return;
            }

            const loginResult = await authService.login(email, password);
            const tenant = await TenantModel.findTenantById(loginResult.user.tenant_id);
            const company = tenant
                ? formatCompany(tenant.company_name, tenant.id)
                : null;

            res.status(200).json({
                success: true,
                token: loginResult.token,
                company
            });
        } catch (error: any) {
            res.status(401).json({ success: false, error: error.message });
        }
    },

    forgotPassword: async (req: Request, res: Response): Promise<void> => {
        res.status(501).json({ success: false, error: 'Forgot password is not implemented yet.' });
    },

    resetPassword: async (req: Request, res: Response): Promise<void> => {
        res.status(501).json({ success: false, error: 'Reset password is not implemented yet.' });
    },

    check2FAStatus: async (req: Request, res: Response): Promise<void> => {
        res.status(200).json({ enabled: false, message: '2FA is not implemented yet.' });
    },

    enable2FA: async (req: Request, res: Response): Promise<void> => {
        res.status(501).json({ success: false, error: '2FA enable is not implemented yet.' });
    },

    verify2FA: async (req: Request, res: Response): Promise<void> => {
        res.status(501).json({ success: false, error: '2FA verify is not implemented yet.' });
    },

    disable2FA: async (req: Request, res: Response): Promise<void> => {
        res.status(501).json({ success: false, error: '2FA disable is not implemented yet.' });
    }

    
};


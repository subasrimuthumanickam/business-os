import { apiService } from '../services/api.service'; // adjust path to your existing apiService file

export interface ApprovalWorkflow {
  id: number;
  company_id: number;
  module: string;
  min_amount: number;
  approver_role_id: number;
  approval_level: number;
  is_active: boolean;
  role_name?: string;
}

export interface ApprovalWorkflowInput {
  module: string;
  min_amount: number;
  approver_role_id: number;
  approval_level?: number;
}

const approvalWorkflowService = {
  getAllWorkflows: (moduleFilter?: string) =>
    apiService.get<ApprovalWorkflow[]>(
      moduleFilter ? `/finance/approval-workflows?module=${moduleFilter}` : '/finance/approval-workflows'
    ),

  createWorkflow: (input: ApprovalWorkflowInput) =>
    apiService.post<ApprovalWorkflow>('/finance/approval-workflows', input),

  updateWorkflow: (id: number, updates: Partial<ApprovalWorkflowInput>) =>
    apiService.put<ApprovalWorkflow>(`/finance/approval-workflows/${id}`, updates),

  toggleActive: (id: number, isActive: boolean) =>
    apiService.patch<ApprovalWorkflow>(`/finance/approval-workflows/${id}/toggle-active`, {
      is_active: isActive,
    }),

  deleteWorkflow: (id: number) =>
    apiService.delete<void>(`/finance/approval-workflows/${id}`),
};

export default approvalWorkflowService;
import db from '../config/db.js';

export interface ApprovalWorkflow {
  id: number;
  company_id: number;
  module: string;
  min_amount: number;
  approver_role_id: number;
  approval_level: number;
  is_active: boolean;
  // joined field
  role_name?: string;
}

export interface ApprovalWorkflowInput {
  module: string;
  min_amount: number;
  approver_role_id: number;
  approval_level?: number;
}

export const approvalWorkflowService = {
  getAllWorkflows: async (companyId: number): Promise<ApprovalWorkflow[]> => {
    const rows: any = await db.execute(
      `SELECT aw.*, r.role_name 
       FROM approval_workflows aw
       LEFT JOIN roles r ON aw.approver_role_id = r.role_id
       WHERE aw.company_id = ?
       ORDER BY aw.module, aw.approval_level, aw.min_amount`,
      [companyId]
    );
    return rows || [];
  },

  getWorkflowsByModule: async (companyId: number, moduleName: string): Promise<ApprovalWorkflow[]> => {
    const rows: any = await db.execute(
      `SELECT aw.*, r.role_name 
       FROM approval_workflows aw
       LEFT JOIN roles r ON aw.approver_role_id = r.role_id
       WHERE aw.company_id = ? AND aw.module = ? AND aw.is_active = TRUE
       ORDER BY aw.approval_level, aw.min_amount`,
      [companyId, moduleName]
    );
    return rows || [];
  },

  getWorkflowById: async (companyId: number, workflowId: number): Promise<ApprovalWorkflow | null> => {
    const rows: any = await db.execute(
      `SELECT aw.*, r.role_name 
       FROM approval_workflows aw
       LEFT JOIN roles r ON aw.approver_role_id = r.role_id
       WHERE aw.id = ? AND aw.company_id = ?`,
      [workflowId, companyId]
    );
    return rows && rows.length > 0 ? rows[0] : null;
  },

  createWorkflow: async (companyId: number, input: ApprovalWorkflowInput): Promise<ApprovalWorkflow> => {
    const result: any = await db.execute(
      `INSERT INTO approval_workflows (company_id, module, min_amount, approver_role_id, approval_level)
       VALUES (?, ?, ?, ?, ?)`,
      [
        companyId,
        input.module,
        input.min_amount,
        input.approver_role_id,
        input.approval_level ?? 1,
      ]
    );

    const newWorkflow = await approvalWorkflowService.getWorkflowById(companyId, result.insertId);
    return newWorkflow as ApprovalWorkflow;
  },

  updateWorkflow: async (
    companyId: number,
    workflowId: number,
    updates: Partial<ApprovalWorkflowInput>
  ): Promise<ApprovalWorkflow | null> => {
    const fields = Object.keys(updates);
    if (fields.length === 0) {
      return approvalWorkflowService.getWorkflowById(companyId, workflowId);
    }

    const setClause = fields.map((f) => `${f} = ?`).join(', ');
    const values = fields.map((f) => (updates as any)[f]);

    await db.execute(
      `UPDATE approval_workflows SET ${setClause} WHERE id = ? AND company_id = ?`,
      [...values, workflowId, companyId]
    );

    return approvalWorkflowService.getWorkflowById(companyId, workflowId);
  },

  deleteWorkflow: async (companyId: number, workflowId: number): Promise<boolean> => {
    const result: any = await db.execute(
      `DELETE FROM approval_workflows WHERE id = ? AND company_id = ?`,
      [workflowId, companyId]
    );
    return (result?.affectedRows || 0) > 0;
  },

  toggleActive: async (companyId: number, workflowId: number, isActive: boolean): Promise<ApprovalWorkflow | null> => {
    await db.execute(
      `UPDATE approval_workflows SET is_active = ? WHERE id = ? AND company_id = ?`,
      [isActive, workflowId, companyId]
    );
    return approvalWorkflowService.getWorkflowById(companyId, workflowId);
  },

  // Helper: find which role must approve a given amount for a given module
  findRequiredApprover: async (
    companyId: number,
    moduleName: string,
    amount: number
  ): Promise<ApprovalWorkflow | null> => {
    const rows: any = await db.execute(
      `SELECT aw.*, r.role_name 
       FROM approval_workflows aw
       LEFT JOIN roles r ON aw.approver_role_id = r.role_id
       WHERE aw.company_id = ? AND aw.module = ? AND aw.is_active = TRUE AND aw.min_amount <= ?
       ORDER BY aw.min_amount DESC, aw.approval_level ASC
       LIMIT 1`,
      [companyId, moduleName, amount]
    );
    return rows && rows.length > 0 ? rows[0] : null;
  },
};

export default approvalWorkflowService;
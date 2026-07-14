import db from '../config/db.js';

export interface Account {
  id: number;
  company_id: number;
  account_code: string;
  account_name: string;
  account_type: 'asset' | 'liability' | 'equity' | 'income' | 'expense';
  parent_account_id: number | null;
  description: string | null;
  is_active: boolean;
}

export interface AccountInput {
  account_code: string;
  account_name: string;
  account_type: 'asset' | 'liability' | 'equity' | 'income' | 'expense';
  parent_account_id?: number | null;
  description?: string | null;
}

export const chartOfAccountsService = {
  getAllAccounts: async (companyId: number): Promise<Account[]> => {
    const rows: any = await db.execute(
      `SELECT * FROM chart_of_accounts WHERE company_id = ? ORDER BY account_type, account_code`,
      [companyId]
    );
    return rows || [];
  },

  getAccountById: async (companyId: number, accountId: number): Promise<Account | null> => {
    const rows: any = await db.execute(
      `SELECT * FROM chart_of_accounts WHERE id = ? AND company_id = ?`,
      [accountId, companyId]
    );
    return rows && rows.length > 0 ? rows[0] : null;
  },

  createAccount: async (companyId: number, input: AccountInput): Promise<Account> => {
    const result: any = await db.execute(
      `INSERT INTO chart_of_accounts (company_id, account_code, account_name, account_type, parent_account_id, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        companyId,
        input.account_code,
        input.account_name,
        input.account_type,
        input.parent_account_id ?? null,
        input.description ?? null,
      ]
    );

    const newAccount = await chartOfAccountsService.getAccountById(companyId, result.insertId);
    return newAccount as Account;
  },

  updateAccount: async (
    companyId: number,
    accountId: number,
    updates: Partial<AccountInput>
  ): Promise<Account | null> => {
    const fields = Object.keys(updates);
    if (fields.length === 0) {
      return chartOfAccountsService.getAccountById(companyId, accountId);
    }

    const setClause = fields.map((f) => `${f} = ?`).join(', ');
    const values = fields.map((f) => (updates as any)[f]);

    await db.execute(
      `UPDATE chart_of_accounts SET ${setClause} WHERE id = ? AND company_id = ?`,
      [...values, accountId, companyId]
    );

    return chartOfAccountsService.getAccountById(companyId, accountId);
  },

  deleteAccount: async (companyId: number, accountId: number): Promise<boolean> => {
    // Prevent deletion if this account has child accounts
    const children: any = await db.execute(
      `SELECT id FROM chart_of_accounts WHERE parent_account_id = ? AND company_id = ?`,
      [accountId, companyId]
    );
    if (children && children.length > 0) {
      throw new Error('Cannot delete an account that has sub-accounts. Remove or reassign sub-accounts first.');
    }

    const result: any = await db.execute(
      `DELETE FROM chart_of_accounts WHERE id = ? AND company_id = ?`,
      [accountId, companyId]
    );
    return (result?.affectedRows || 0) > 0;
  },

  toggleActive: async (companyId: number, accountId: number, isActive: boolean): Promise<Account | null> => {
    await db.execute(
      `UPDATE chart_of_accounts SET is_active = ? WHERE id = ? AND company_id = ?`,
      [isActive, accountId, companyId]
    );
    return chartOfAccountsService.getAccountById(companyId, accountId);
  },
};

export default chartOfAccountsService;
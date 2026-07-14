import { useState, useEffect } from 'react';
import chartOfAccountsService, { Account, AccountInput } from '../../services/ChartOfAccounts.service';
import approvalWorkflowService, {
  ApprovalWorkflow,
  ApprovalWorkflowInput,
} from '../../services/ApprovalWorkflow.service';
import roleService, { Role } from '../../services/Role.service';

type TabId = 'accounts' | 'approvals';

const TABS: { id: TabId; label: string }[] = [
  { id: 'accounts', label: 'Chart of Accounts' },
  { id: 'approvals', label: 'Approval Workflows' },
];

const ACCOUNT_TYPES = ['asset', 'liability', 'equity', 'income', 'expense'] as const;

const ACCOUNT_TYPE_COLORS: Record<string, string> = {
  asset: 'bg-blue-100 text-blue-700',
  liability: 'bg-rose-100 text-rose-700',
  equity: 'bg-violet-100 text-violet-700',
  income: 'bg-emerald-100 text-emerald-700',
  expense: 'bg-amber-100 text-amber-700',
};

const WORKFLOW_MODULES = ['invoices', 'expenses', 'purchase_orders', 'estimates'] as const;

const emptyAccountForm: AccountInput = {
  account_code: '',
  account_name: '',
  account_type: 'asset',
  parent_account_id: null,
  description: '',
};

const emptyWorkflowForm: ApprovalWorkflowInput = {
  module: 'invoices',
  min_amount: 0,
  approver_role_id: 0,
  approval_level: 1,
};

const FinanceModulePreferences = () => {
  const [activeTab, setActiveTab] = useState<TabId>('accounts');

  // ---------- Chart of Accounts state ----------
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [editingAccountId, setEditingAccountId] = useState<number | null>(null);
  const [accountForm, setAccountForm] = useState<AccountInput>(emptyAccountForm);
  const [accountTypeFilter, setAccountTypeFilter] = useState<string>('all');

  // ---------- Approval Workflows state ----------
  const [workflows, setWorkflows] = useState<ApprovalWorkflow[]>([]);
  const [workflowsLoading, setWorkflowsLoading] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);
  const [showWorkflowForm, setShowWorkflowForm] = useState(false);
  const [workflowForm, setWorkflowForm] = useState<ApprovalWorkflowInput>(emptyWorkflowForm);

  const [savedToast, setSavedToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setSavedToast(msg);
    setTimeout(() => setSavedToast(null), 2500);
  };

  useEffect(() => {
    loadAccounts();
    loadWorkflows();
    roleService.getAllRoles().then(setRoles).catch(console.error);
  }, []);

  const loadAccounts = async () => {
    try {
      setAccountsLoading(true);
      const data = await chartOfAccountsService.getAllAccounts();
      setAccounts(data);
    } catch (err) {
      console.error('Failed to load accounts:', err);
    } finally {
      setAccountsLoading(false);
    }
  };

  const loadWorkflows = async () => {
    try {
      setWorkflowsLoading(true);
      const data = await approvalWorkflowService.getAllWorkflows();
      setWorkflows(data);
    } catch (err) {
      console.error('Failed to load workflows:', err);
    } finally {
      setWorkflowsLoading(false);
    }
  };

  // ============= ACCOUNT HANDLERS =============
  const openNewAccountForm = () => {
    setEditingAccountId(null);
    setAccountForm(emptyAccountForm);
    setShowAccountForm(true);
  };

  const openEditAccountForm = (account: Account) => {
    setEditingAccountId(account.id);
    setAccountForm({
      account_code: account.account_code,
      account_name: account.account_name,
      account_type: account.account_type,
      parent_account_id: account.parent_account_id,
      description: account.description,
    });
    setShowAccountForm(true);
  };

  const handleSaveAccount = async () => {
    if (!accountForm.account_code.trim() || !accountForm.account_name.trim()) {
      alert('Account code and name are required.');
      return;
    }
    try {
      if (editingAccountId) {
        await chartOfAccountsService.updateAccount(editingAccountId, accountForm);
        showToast('Account updated');
      } else {
        await chartOfAccountsService.createAccount(accountForm);
        showToast('Account created');
      }
      setShowAccountForm(false);
      loadAccounts();
    } catch (err: any) {
      console.error('Failed to save account:', err);
      alert(err?.message || 'Failed to save account.');
    }
  };

  const handleToggleAccountActive = async (account: Account) => {
    try {
      await chartOfAccountsService.toggleActive(account.id, !account.is_active);
      loadAccounts();
    } catch (err) {
      console.error('Failed to toggle account:', err);
    }
  };

  const handleDeleteAccount = async (account: Account) => {
    if (!window.confirm(`Delete account "${account.account_name}"? This cannot be undone.`)) return;
    try {
      await chartOfAccountsService.deleteAccount(account.id);
      showToast('Account deleted');
      loadAccounts();
    } catch (err: any) {
      console.error('Failed to delete account:', err);
      alert(err?.message || 'Failed to delete account. It may have sub-accounts.');
    }
  };

  const filteredAccounts =
    accountTypeFilter === 'all'
      ? accounts
      : accounts.filter((a) => a.account_type === accountTypeFilter);

  // ============= WORKFLOW HANDLERS =============
  const openNewWorkflowForm = () => {
    setWorkflowForm({
      ...emptyWorkflowForm,
      approver_role_id: roles[0]?.role_id || 0,
    });
    setShowWorkflowForm(true);
  };

  const handleSaveWorkflow = async () => {
    if (!workflowForm.approver_role_id) {
      alert('Please select an approver role.');
      return;
    }
    try {
      await approvalWorkflowService.createWorkflow(workflowForm);
      showToast('Approval rule created');
      setShowWorkflowForm(false);
      loadWorkflows();
    } catch (err: any) {
      console.error('Failed to save workflow:', err);
      alert(err?.message || 'Failed to save approval rule.');
    }
  };

  const handleToggleWorkflowActive = async (workflow: ApprovalWorkflow) => {
    try {
      await approvalWorkflowService.toggleActive(workflow.id, !workflow.is_active);
      loadWorkflows();
    } catch (err) {
      console.error('Failed to toggle workflow:', err);
    }
  };

  const handleDeleteWorkflow = async (workflow: ApprovalWorkflow) => {
    if (!window.confirm('Delete this approval rule?')) return;
    try {
      await approvalWorkflowService.deleteWorkflow(workflow.id);
      showToast('Approval rule deleted');
      loadWorkflows();
    } catch (err) {
      console.error('Failed to delete workflow:', err);
    }
  };

  return (
    <div className="relative border border-gray-200 rounded-xl bg-white shadow-sm w-full">
      {savedToast && (
        <div className="absolute -top-3 right-4 z-10 flex items-center gap-2 bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          {savedToast}
        </div>
      )}

      {/* Top bar - tabs */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-200 flex items-center gap-2 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-6 py-6">
        {/* ============= CHART OF ACCOUNTS TAB ============= */}
        {activeTab === 'accounts' && (
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Chart of Accounts</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Structure your ledger accounts by type
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={accountTypeFilter}
                  onChange={(e) => setAccountTypeFilter(e.target.value)}
                  className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All types</option>
                  {ACCOUNT_TYPES.map((t) => (
                    <option key={t} value={t} className="capitalize">
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
                <button
                  onClick={openNewAccountForm}
                  className="text-xs font-medium text-white bg-gray-900 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
                >
                  + Add Account
                </button>
              </div>
            </div>

            {/* Inline add/edit form */}
            {showAccountForm && (
              <div className="mb-6 border border-blue-200 bg-blue-50/40 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-800 mb-3">
                  {editingAccountId ? 'Edit account' : 'New account'}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">Account code</label>
                    <input
                      type="text"
                      value={accountForm.account_code}
                      onChange={(e) => setAccountForm({ ...accountForm, account_code: e.target.value })}
                      placeholder="e.g. 1001"
                      className="w-full mt-1 text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Account name</label>
                    <input
                      type="text"
                      value={accountForm.account_name}
                      onChange={(e) => setAccountForm({ ...accountForm, account_name: e.target.value })}
                      placeholder="e.g. Cash in Hand"
                      className="w-full mt-1 text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Account type</label>
                    <select
                      value={accountForm.account_type}
                      onChange={(e) =>
                        setAccountForm({ ...accountForm, account_type: e.target.value as any })
                      }
                      className="w-full mt-1 text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {ACCOUNT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Parent account (optional)</label>
                    <select
                      value={accountForm.parent_account_id ?? ''}
                      onChange={(e) =>
                        setAccountForm({
                          ...accountForm,
                          parent_account_id: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                      className="w-full mt-1 text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">None (top-level)</option>
                      {accounts
                        .filter((a) => a.id !== editingAccountId)
                        .map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.account_code} - {a.account_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-gray-500">Description (optional)</label>
                    <input
                      type="text"
                      value={accountForm.description ?? ''}
                      onChange={(e) => setAccountForm({ ...accountForm, description: e.target.value })}
                      className="w-full mt-1 text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSaveAccount}
                    className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    {editingAccountId ? 'Save changes' : 'Create account'}
                  </button>
                  <button
                    onClick={() => setShowAccountForm(false)}
                    className="text-xs text-gray-600 px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {accountsLoading ? (
              <div className="text-sm text-gray-400 py-8 text-center">Loading accounts...</div>
            ) : filteredAccounts.length === 0 ? (
              <div className="text-sm text-gray-400 py-8 text-center">
                No accounts found. Click "+ Add Account" to create one.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th className="text-left py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Code</th>
                      <th className="text-left py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Name</th>
                      <th className="text-left py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Type</th>
                      <th className="text-left py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Parent</th>
                      <th className="text-center py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Active</th>
                      <th className="text-right py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAccounts.map((account) => {
                      const parent = accounts.find((a) => a.id === account.parent_account_id);
                      return (
                        <tr key={account.id} className="hover:bg-gray-50/70">
                          <td className="py-2.5 px-3 border-b border-gray-100 text-gray-600 font-mono text-xs">
                            {account.account_code}
                          </td>
                          <td className="py-2.5 px-3 border-b border-gray-100 text-gray-800 font-medium">
                            {account.account_name}
                          </td>
                          <td className="py-2.5 px-3 border-b border-gray-100">
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                                ACCOUNT_TYPE_COLORS[account.account_type]
                              }`}
                            >
                              {account.account_type}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 border-b border-gray-100 text-gray-500 text-xs">
                            {parent ? parent.account_name : '—'}
                          </td>
                          <td className="py-2.5 px-3 border-b border-gray-100 text-center">
                            <input
                              type="checkbox"
                              checked={account.is_active}
                              onChange={() => handleToggleAccountActive(account)}
                              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                            />
                          </td>
                          <td className="py-2.5 px-3 border-b border-gray-100 text-right">
                            <button
                              onClick={() => openEditAccountForm(account)}
                              className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAccount(account)}
                              className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ============= APPROVAL WORKFLOWS TAB ============= */}
        {activeTab === 'approvals' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Approval workflows</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Require role-based approval above certain amounts
                </p>
              </div>
              <button
                onClick={openNewWorkflowForm}
                className="text-xs font-medium text-white bg-gray-900 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
              >
                + Add Rule
              </button>
            </div>

            {showWorkflowForm && (
              <div className="mb-6 border border-blue-200 bg-blue-50/40 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-800 mb-3">New approval rule</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">Module</label>
                    <select
                      value={workflowForm.module}
                      onChange={(e) => setWorkflowForm({ ...workflowForm, module: e.target.value })}
                      className="w-full mt-1 text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {WORKFLOW_MODULES.map((m) => (
                        <option key={m} value={m} className="capitalize">
                          {m.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Minimum amount</label>
                    <input
                      type="number"
                      min={0}
                      value={workflowForm.min_amount}
                      onChange={(e) =>
                        setWorkflowForm({ ...workflowForm, min_amount: Number(e.target.value) })
                      }
                      className="w-full mt-1 text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Approver role</label>
                    <select
                      value={workflowForm.approver_role_id}
                      onChange={(e) =>
                        setWorkflowForm({ ...workflowForm, approver_role_id: Number(e.target.value) })
                      }
                      className="w-full mt-1 text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {roles.map((r) => (
                        <option key={r.role_id} value={r.role_id}>
                          {r.role_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Approval level</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={workflowForm.approval_level}
                      onChange={(e) =>
                        setWorkflowForm({ ...workflowForm, approval_level: Number(e.target.value) })
                      }
                      className="w-full mt-1 text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSaveWorkflow}
                    className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Create rule
                  </button>
                  <button
                    onClick={() => setShowWorkflowForm(false)}
                    className="text-xs text-gray-600 px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {workflowsLoading ? (
              <div className="text-sm text-gray-400 py-8 text-center">Loading approval rules...</div>
            ) : workflows.length === 0 ? (
              <div className="text-sm text-gray-400 py-8 text-center">
                No approval rules configured yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th className="text-left py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Module</th>
                      <th className="text-left py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Min Amount</th>
                      <th className="text-left py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Approver Role</th>
                      <th className="text-left py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Level</th>
                      <th className="text-center py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Active</th>
                      <th className="text-right py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workflows.map((wf) => (
                      <tr key={wf.id} className="hover:bg-gray-50/70">
                        <td className="py-2.5 px-3 border-b border-gray-100 text-gray-700 capitalize">
                          {wf.module.replace(/_/g, ' ')}
                        </td>
                        <td className="py-2.5 px-3 border-b border-gray-100 text-gray-700">
                          ₹{Number(wf.min_amount).toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 border-b border-gray-100 text-gray-700">
                          {wf.role_name || '—'}
                        </td>
                        <td className="py-2.5 px-3 border-b border-gray-100 text-gray-500">
                          Level {wf.approval_level}
                        </td>
                        <td className="py-2.5 px-3 border-b border-gray-100 text-center">
                          <input
                            type="checkbox"
                            checked={wf.is_active}
                            onChange={() => handleToggleWorkflowActive(wf)}
                            className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                          />
                        </td>
                        <td className="py-2.5 px-3 border-b border-gray-100 text-right">
                          <button
                            onClick={() => handleDeleteWorkflow(wf)}
                            className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceModulePreferences;
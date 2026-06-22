// src/client/components/projects/CreateProjectModal.tsx
import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Users, 
  Clock, 
  DollarSign, 
  FileText,
  Plus,
  Trash2,
  ChevronDown
} from 'lucide-react';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: any) => void;
  editData?: any;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editData 
}) => {
  const [formData, setFormData] = useState({
    projectName: editData?.projectName || '',
    description: editData?.description || '',
    customerName: editData?.customerName || '',
    billingMethod: editData?.billingMethod || 'Based on Task Hours',
    ratePerHour: editData?.ratePerHour || '',
    costBudget: editData?.costBudget || '',
    revenueBudget: editData?.revenueBudget || '',
    budgetHours: editData?.budgetHours || '',
    startDate: editData?.startDate || '',
    endDate: editData?.endDate || '',
    enableClientApproval: editData?.enableClientApproval || false,
    addBudget: editData?.addBudget || false,
    budgetType: editData?.budgetType || 'Total Project Hours (HH:MM)',
    totalBudgetHours: editData?.totalBudgetHours || ''
  });

  const [selectedUsers, setSelectedUsers] = useState<{name: string, email: string, rate: string}[]>([
    { name: 'Patricia Boyle', email: 'patricia.b@zohocorp.com', rate: '45.00' }
  ]);
  
  const [tasks, setTasks] = useState<{name: string, description: string, rate: string}[]>([
    { name: 'Designing', description: 'Main design work', rate: '45.00' },
    { name: 'Content', description: 'Content creation', rate: '35.00' }
  ]);

  const [activeTab, setActiveTab] = useState<'basic' | 'billing' | 'users' | 'tasks'>('basic');

  const billingMethods = [
    'Based on Task Hours',
    'Based on Project Hours',
    'Fixed Cost for Project',
    'Based on Staff Hours'
  ];

  const customers = [
    'Bruce Wayne',
    'Aaron Brown',
    'Dinesh Ramamurthy',
    'Arthur K',
    'Brandon'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      users: selectedUsers,
      tasks: tasks
    });
    onClose();
  };

  const addUser = () => {
    setSelectedUsers([...selectedUsers, { name: '', email: '', rate: '' }]);
  };

  const removeUser = (index: number) => {
    setSelectedUsers(selectedUsers.filter((_, i) => i !== index));
  };

  const updateUser = (index: number, field: string, value: string) => {
    const updated = [...selectedUsers];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedUsers(updated);
  };

  const addTask = () => {
    setTasks([...tasks, { name: '', description: '', rate: '' }]);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index: number, field: string, value: string) => {
    const updated = [...tasks];
    updated[index] = { ...updated[index], [field]: value };
    setTasks(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {editData ? 'Edit Project' : 'New Project'}
              </h2>
              <p className="text-sm text-gray-500">Fill in the details to {editData ? 'update' : 'create'} a project</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 px-6">
            <div className="flex space-x-4">
              {['basic', 'billing', 'users', 'tasks'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-3 px-2 text-sm font-medium border-b-2 transition ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === 'users' && ` (${selectedUsers.length})`}
                  {tab === 'tasks' && ` (${tasks.length})`}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Basic Information Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter project name"
                      value={formData.projectName}
                      onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                      required
                    >
                      <option value="">Select Customer</option>
                      {customers.map(customer => (
                        <option key={customer} value={customer}>{customer}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Max 2000 characters"
                    maxLength={2000}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                  <div className="text-xs text-gray-500 text-right mt-1">
                    {formData.description.length}/2000
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Billing Information Tab */}
            {activeTab === 'billing' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Billing Method <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.billingMethod}
                      onChange={(e) => setFormData({...formData, billingMethod: e.target.value})}
                      required
                    >
                      {billingMethods.map(method => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.billingMethod === 'Based on Task Hours' && 'Billing will be based on hourly rate of tasks'}
                      {formData.billingMethod === 'Based on Project Hours' && 'Billing will be based on total project hours'}
                      {formData.billingMethod === 'Fixed Cost for Project' && 'Fixed rate for the entire project'}
                      {formData.billingMethod === 'Based on Staff Hours' && 'Billing based on staff hourly rates'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rate Per Hour
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                        value={formData.ratePerHour}
                        onChange={(e) => setFormData({...formData, ratePerHour: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cost Budget
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                        value={formData.costBudget}
                        onChange={(e) => setFormData({...formData, costBudget: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Revenue Budget
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                        value={formData.revenueBudget}
                        onChange={(e) => setFormData({...formData, revenueBudget: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {formData.billingMethod === 'Based on Staff Hours' && (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget Type
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.budgetType}
                        onChange={(e) => setFormData({...formData, budgetType: e.target.value})}
                      >
                        <option value="Total Project Hours (HH:MM)">Total Project Hours (HH:MM)</option>
                        <option value="Total Project Cost">Total Project Cost</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total Budget Hours
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="HH:MM"
                        value={formData.totalBudgetHours}
                        onChange={(e) => setFormData({...formData, totalBudgetHours: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-4 pt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={formData.enableClientApproval}
                      onChange={(e) => setFormData({...formData, enableClientApproval: e.target.checked})}
                    />
                    <span className="text-sm text-gray-700">Enable Client Approval for time entries</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={formData.addBudget}
                      onChange={(e) => setFormData({...formData, addBudget: e.target.checked})}
                    />
                    <span className="text-sm text-gray-700">Add budget for this project</span>
                  </label>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-4 gap-3 text-sm font-medium text-gray-700 mb-2">
                    <div>User</div>
                    <div>Email</div>
                    <div>Rate Per Hour</div>
                    <div className="text-right">Actions</div>
                  </div>
                  {selectedUsers.map((user, index) => (
                    <div key={index} className="grid grid-cols-4 gap-3 items-center py-2 border-b border-gray-200 last:border-0">
                      <input
                        type="text"
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="User name"
                        value={user.name}
                        onChange={(e) => updateUser(index, 'name', e.target.value)}
                      />
                      <input
                        type="email"
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => updateUser(index, 'email', e.target.value)}
                      />
                      <input
                        type="text"
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Rate"
                        value={user.rate}
                        onChange={(e) => updateUser(index, 'rate', e.target.value)}
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeUser(index)}
                          className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addUser}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add User
                  </button>
                </div>
              </div>
            )}

            {/* Tasks Tab */}
            {activeTab === 'tasks' && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-4 gap-3 text-sm font-medium text-gray-700 mb-2">
                    <div>Task Name</div>
                    <div>Description</div>
                    <div>Rate Per Hour</div>
                    <div className="text-right">Actions</div>
                  </div>
                  {tasks.map((task, index) => (
                    <div key={index} className="grid grid-cols-4 gap-3 items-center py-2 border-b border-gray-200 last:border-0">
                      <input
                        type="text"
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Task name"
                        value={task.name}
                        onChange={(e) => updateTask(index, 'name', e.target.value)}
                      />
                      <input
                        type="text"
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Description"
                        value={task.description}
                        onChange={(e) => updateTask(index, 'description', e.target.value)}
                      />
                      <input
                        type="text"
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Rate"
                        value={task.rate}
                        onChange={(e) => updateTask(index, 'rate', e.target.value)}
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeTask(index)}
                          className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTask}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Task
                  </button>
                  <div className="mt-2">
                    <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                      Import tasks from existing projects
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
              >
                <Check className="w-4 h-4 mr-2" />
                {editData ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
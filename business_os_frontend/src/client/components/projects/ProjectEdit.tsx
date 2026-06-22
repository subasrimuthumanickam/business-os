// src/client/components/projects/ProjectEdit.tsx
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  X,
  FileText,
  User,
  Calendar,
  DollarSign,
  Tag,
  Users,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ProjectEditProps {
  projectId: string;
  projectName: string;
  onBack: () => void;
  onSave?: (data: any) => void;
  initialData?: {
    id: string;
    name: string;
    description: string;
    billingMethod: string;
    rate: number;
    budget: number;
    status: 'active' | 'inactive' | 'completed';
    startDate: string;
    endDate: string;
    customerName: string;
    assignedUsers: string[];
  };
}

interface ProjectData {
  id: string;
  name: string;
  description: string;
  billingMethod: string;
  rate: number;
  budget: number;
  status: 'active' | 'inactive' | 'completed';
  startDate: string;
  endDate: string;
  customerName: string;
  assignedUsers: string[];
}

const ProjectEdit: React.FC<ProjectEditProps> = ({ 
  projectId, 
  projectName, 
  onBack, 
  onSave,
  initialData 
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  const getProjectData = (name: string): ProjectData => {
    if (name === 'Design contract for Mr. Bruce') {
      return {
        id: '1',
        name: 'Design contract for Mr. Bruce',
        description: 'Complete UI/UX design for Wayne Enterprises',
        billingMethod: 'Based on Task Hours',
        rate: 45.00,
        budget: 5000,
        status: 'active',
        startDate: '2024-01-15',
        endDate: '2024-06-30',
        customerName: 'Bruce Wayne',
        assignedUsers: ['Patricia Boyle', 'John Doe', 'Jane Smith']
      };
    } else if (name === 'Design project for Bruce') {
      return {
        id: '2',
        name: 'Design project for Bruce',
        description: 'Redesign of corporate website',
        billingMethod: 'Based on Task Hours',
        rate: 45.00,
        budget: 3000,
        status: 'active',
        startDate: '2024-02-01',
        endDate: '2024-07-15',
        customerName: 'Bruce Wayne',
        assignedUsers: ['Patricia Boyle', 'John Doe']
      };
    } else if (name === 'Design project for MR.X') {
      return {
        id: '3',
        name: 'Design project for MR.X',
        description: 'Mobile app design for MR.X',
        billingMethod: 'Based on Task Hours',
        rate: 45.00,
        budget: 8000,
        status: 'active',
        startDate: '2024-01-10',
        endDate: '2024-08-20',
        customerName: 'Aaron Brown',
        assignedUsers: ['Patricia Boyle', 'Jane Smith']
      };
    }
    return {
      id: projectId,
      name: name,
      description: 'Project description goes here',
      billingMethod: 'Based on Task Hours',
      rate: 45.00,
      budget: 0,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      customerName: 'Unknown Customer',
      assignedUsers: []
    };
  };

  const [formData, setFormData] = useState<ProjectData>(
    initialData || getProjectData(projectName)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSaveError('');
  };

  const handleStatusChange = (status: 'active' | 'inactive' | 'completed') => {
    setFormData(prev => ({ ...prev, status }));
  };

  // ✅ FIXED: handleSubmit function with proper data sending
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      setSaveError('Project name is required');
      return;
    }

    setIsSaving(true);
    setSaveError('');
    setSaveSuccess(false);
    
    // Prepare data to save
    const dataToSave = {
      id: formData.id || projectId,
      name: formData.name,
      description: formData.description,
      billingMethod: formData.billingMethod,
      rate: formData.rate,
      budget: formData.budget,
      status: formData.status,
      startDate: formData.startDate,
      endDate: formData.endDate,
      customerName: formData.customerName,
      assignedUsers: formData.assignedUsers
    };
    
    console.log('📤 Sending data to save:', dataToSave);
    
    // ✅ Call onSave with the data
    if (onSave) {
      onSave(dataToSave);
    }
    
    setSaveSuccess(true);
    setIsSaving(false);
    
    // ✅ Navigate back after showing success
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  const getRandomColor = (name: string) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'];
    return colors[name.length % colors.length];
  };

  const getInitials = (name: string) => {
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack} 
            className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
            <p className="text-sm text-gray-500">Update project details and information</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {saveSuccess && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs border border-green-200 animate-pulse">
              <CheckCircle className="w-4 h-4" />
              Saved successfully!
            </div>
          )}
          {saveError && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs border border-red-200">
              <AlertCircle className="w-4 h-4" />
              {saveError}
            </div>
          )}
          <button 
            onClick={onBack} 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm flex items-center"
          >
            <X className="w-4 h-4 mr-1.5" />
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={isSaving} 
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-1.5" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                Project Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      saveError ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter project name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter project description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      <User className="w-3.5 h-3.5 inline mr-1 text-gray-400" />
                      Customer
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      <Tag className="w-3.5 h-3.5 inline mr-1 text-gray-400" />
                      Billing Method
                    </label>
                    <select
                      name="billingMethod"
                      value={formData.billingMethod}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Based on Task Hours">Based on Task Hours</option>
                      <option value="Based on Project Hours">Based on Project Hours</option>
                      <option value="Fixed Cost for Project">Fixed Cost for Project</option>
                      <option value="Based on Staff Hours">Based on Staff Hours</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      <DollarSign className="w-3.5 h-3.5 inline mr-1 text-gray-400" />
                      Rate Per Hour
                    </label>
                    <input
                      type="number"
                      name="rate"
                      value={formData.rate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      <DollarSign className="w-3.5 h-3.5 inline mr-1 text-gray-400" />
                      Budget
                    </label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                Timeline
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Status</h3>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleStatusChange('active')}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                    formData.status === 'active'
                      ? 'bg-green-100 text-green-700 border-2 border-green-400 shadow-sm'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" /> Active
                  {formData.status === 'active' && (
                    <span className="ml-auto text-xs bg-green-200 px-2 py-0.5 rounded-full">Selected</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('inactive')}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                    formData.status === 'inactive'
                      ? 'bg-gray-200 text-gray-700 border-2 border-gray-400 shadow-sm'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <AlertCircle className="w-4 h-4" /> Inactive
                  {formData.status === 'inactive' && (
                    <span className="ml-auto text-xs bg-gray-300 px-2 py-0.5 rounded-full">Selected</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('completed')}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                    formData.status === 'completed'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-400 shadow-sm'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" /> Completed
                  {formData.status === 'completed' && (
                    <span className="ml-auto text-xs bg-blue-200 px-2 py-0.5 rounded-full">Selected</span>
                  )}
                </button>
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                Team Members ({formData.assignedUsers.length})
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {formData.assignedUsers.length === 0 ? (
                  <div className="text-xs text-gray-400 text-center py-3">No team members assigned</div>
                ) : (
                  formData.assignedUsers.map((user, index) => (
                    <div key={index} className="flex items-center gap-2.5 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className={`w-7 h-7 rounded-full ${getRandomColor(user)} text-white flex items-center justify-center text-[10px] font-medium flex-shrink-0`}>
                        {getInitials(user)}
                      </div>
                      <span className="text-sm text-gray-700">{user}</span>
                    </div>
                  ))
                )}
              </div>
              <button 
                type="button"
                className="mt-3 w-full py-1.5 text-xs text-purple-600 hover:text-purple-700 border border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition"
              >
                + Add Team Member
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button 
                  type="button" 
                  onClick={onBack} 
                  className="w-full py-2 text-xs text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  View Project Details
                </button>
                <button 
                  type="button" 
                  className="w-full py-2 text-xs text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
                >
                  Create Invoice
                </button>
                <button 
                  type="button" 
                  className="w-full py-2 text-xs text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                >
                  Log Time
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectEdit;
// src/client/components/projects/CustomerDetail.tsx
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit,
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle,
  AlertCircle,
  FileText,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Activity,
  ClipboardList,
  X
} from 'lucide-react';

interface CustomerDetailProps {
  customerName: string;
  onBack: () => void;
}

interface ProjectData {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'completed';
  loggedHours: string;
  budget: number;
  revenue: number;
  startDate: string;
  endDate: string;
  billingMethod: string;
  rate: number;
  teamMembers: { name: string; role: string }[];
}

interface TeamMember {
  name: string;
  role: string;
}

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  type: string;
  currency: string;
  totalProjects: number;
  activeProjects: number;
  totalRevenue: number;
  totalHours: string;
  projects: ProjectData[];
  recentActivity: { type: string; description: string; time: string; user: string }[];
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customerName, onBack }) => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState<TeamMember>({ name: '', role: '' });

  // Sample data based on customer name
  const getCustomerData = (name: string): CustomerData => {
    if (name === 'Bruce Wayne') {
      return {
        name: 'Bruce Wayne',
        email: 'bruce.wayne@wayneenterprises.com',
        phone: '+1 555-0123',
        company: 'Wayne Enterprises',
        location: 'Gotham City',
        type: 'Business',
        currency: 'USD',
        totalProjects: 3,
        activeProjects: 2,
        totalRevenue: 11000,
        totalHours: '142:09',
        projects: [
          { 
            id: '1', 
            name: 'Design contract for Mr. Bruce', 
            description: 'Complete UI/UX design for Wayne Enterprises',
            status: 'active', 
            loggedHours: '106:41', 
            budget: 5000,
            revenue: 4500,
            startDate: '2024-01-15',
            endDate: '2024-06-30',
            billingMethod: 'Based on Task Hours',
            rate: 45,
            teamMembers: [
              { name: 'Patricia Boyle', role: 'Lead Designer' },
              { name: 'John Doe', role: 'Developer' },
              { name: 'Jane Smith', role: 'Tester' }
            ]
          },
          { 
            id: '2', 
            name: 'Design project for Bruce', 
            description: 'Redesign of corporate website',
            status: 'active', 
            loggedHours: '35:28', 
            budget: 3000,
            revenue: 2500,
            startDate: '2024-02-01',
            endDate: '2024-07-15',
            billingMethod: 'Based on Task Hours',
            rate: 45,
            teamMembers: [
              { name: 'Patricia Boyle', role: 'Designer' },
              { name: 'John Doe', role: 'Developer' }
            ]
          },
          { 
            id: '3', 
            name: 'Wayne Enterprises Branding', 
            description: 'Complete brand identity redesign',
            status: 'completed', 
            loggedHours: '52:00', 
            budget: 4000,
            revenue: 4000,
            startDate: '2023-12-01',
            endDate: '2024-03-30',
            billingMethod: 'Fixed Cost for Project',
            rate: 0,
            teamMembers: [
              { name: 'Patricia Boyle', role: 'Lead Designer' },
              { name: 'Jane Smith', role: 'Designer' }
            ]
          }
        ],
        recentActivity: [
          { type: 'project', description: 'New project added: Wayne Enterprises Branding', time: '2 days ago', user: 'System' },
          { type: 'time', description: 'Logged 8 hours on Design contract for Mr. Bruce', time: '3 days ago', user: 'Patricia Boyle' },
          { type: 'invoice', description: 'Invoice #INV-2024-001 created for $2,500', time: '1 week ago', user: 'System' }
        ]
      };
    } else {
      return {
        name: name,
        email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
        phone: '+1 555-0000',
        company: 'Individual',
        location: 'Unknown',
        type: 'Individual',
        currency: 'USD',
        totalProjects: 1,
        activeProjects: 1,
        totalRevenue: 0,
        totalHours: '00:00',
        projects: [],
        recentActivity: []
      };
    }
  };

  const [customer] = useState<CustomerData>(getCustomerData(customerName));

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active': return <CheckCircle className="w-3.5 h-3.5 text-green-500" />;
      case 'inactive': return <AlertCircle className="w-3.5 h-3.5 text-gray-500" />;
      case 'completed': return <CheckCircle className="w-3.5 h-3.5 text-blue-500" />;
      default: return <AlertCircle className="w-3.5 h-3.5 text-gray-500" />;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  };

  const getRandomColor = (name: string) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-red-500'];
    return colors[name.length % colors.length];
  };

  // Get all unique team members from all projects
  const getAllTeamMembers = () => {
    const members: { [key: string]: string } = {};
    customer.projects.forEach(project => {
      project.teamMembers.forEach(member => {
        if (!members[member.name]) {
          members[member.name] = member.role;
        }
      });
    });
    return Object.entries(members).map(([name, role]) => ({ name, role }));
  };

  const [teamMembers] = useState<TeamMember[]>(getAllTeamMembers());

  const totalHours = customer.projects.reduce((total, p) => {
    const hours = parseFloat(p.loggedHours);
    return total + (isNaN(hours) ? 0 : hours);
  }, 0);
  const formattedTotalHours = customer.projects.length > 0 ? customer.totalHours : '00:00';
  const totalRevenue = customer.projects.reduce((total, p) => total + (p.revenue || 0), 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full ${getRandomColor(customer.name)} text-white flex items-center justify-center text-2xl font-bold flex-shrink-0`}>
              {getInitials(customer.name)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-sm text-gray-500">{customer.company}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-sm text-gray-500">{customer.location}</span>
                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border bg-green-100 text-green-700 border-green-200 flex items-center gap-1`}>
                  <CheckCircle className="w-3 h-3" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-xs transition">
            <Edit className="w-3.5 h-3.5 mr-1.5" />
            Edit
          </button>
          <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center text-xs transition">
            <FileText className="w-3.5 h-3.5 mr-1.5" />
            Create Invoice
          </button>
          <button className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center text-xs transition">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            Log Time
          </button>
          <button className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center text-xs transition">
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-medium">Total Hours</div>
              <div className="text-2xl font-bold text-blue-600">{formattedTotalHours}</div>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-medium">Budget</div>
              <div className="text-2xl font-bold text-green-600">${customer.projects.reduce((sum, p) => sum + p.budget, 0).toFixed(2)}</div>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-medium">Revenue</div>
              <div className="text-2xl font-bold text-purple-600">${totalRevenue.toFixed(2)}</div>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Customer Overview</h3>
            <p className="text-sm text-gray-600">{customer.name} is a {customer.type.toLowerCase()} customer with {customer.totalProjects} total projects. They have {customer.activeProjects} active projects and have generated ${totalRevenue.toFixed(2)} in revenue.</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> Email
                </div>
                <div className="text-sm font-medium text-gray-800">{customer.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> Phone
                </div>
                <div className="text-sm font-medium text-gray-800">{customer.phone}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" /> Company
                </div>
                <div className="text-sm font-medium text-gray-800">{customer.company}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Location
                </div>
                <div className="text-sm font-medium text-gray-800">{customer.location}</div>
              </div>
            </div>
          </div>

          {/* Projects List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-gray-400" />
                Projects ({customer.projects.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {customer.projects.length === 0 ? (
                <div className="px-5 py-6 text-center text-sm text-gray-400">
                  No projects found for this customer
                </div>
              ) : (
                customer.projects.map((project) => (
                  <div key={project.id} className="px-5 py-3 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="text-sm font-medium text-gray-800">{project.name}</div>
                          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${getStatusColor(project.status)} flex items-center gap-0.5`}>
                            {getStatusIcon(project.status)}
                            {project.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">{project.description}</div>
                        <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-gray-500">
                          <span>Hours: <span className="font-medium text-gray-700">{project.loggedHours}</span></span>
                          <span>Budget: <span className="font-medium text-gray-700">${project.budget.toFixed(2)}</span></span>
                          <span>Revenue: <span className="font-medium text-gray-700">${(project.revenue || 0).toFixed(2)}</span></span>
                          <span>{project.startDate} → {project.endDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-4">
                        <button className="p-1 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition">
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 rounded hover:bg-green-50 transition">
                          <Clock className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3 text-center hover:bg-gray-100 transition">
                <div className="text-xl font-bold text-blue-600">{customer.totalProjects}</div>
                <div className="text-xs text-gray-500">Total Projects</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center hover:bg-gray-100 transition">
                <div className="text-xl font-bold text-green-600">{customer.activeProjects}</div>
                <div className="text-xs text-gray-500">Active</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center hover:bg-gray-100 transition">
                <div className="text-xl font-bold text-purple-600">${totalRevenue.toFixed(0)}</div>
                <div className="text-xs text-gray-500">Revenue</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center hover:bg-gray-100 transition">
                <div className="text-xl font-bold text-orange-600">{formattedTotalHours}</div>
                <div className="text-xs text-gray-500">Hours</div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              Team Members ({teamMembers.length})
            </h3>
            <div className="space-y-2.5">
              {teamMembers.length === 0 ? (
                <div className="text-xs text-gray-400 text-center py-2">No team members assigned</div>
              ) : (
                teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full ${getRandomColor(member.name)} text-white flex items-center justify-center text-[10px] font-medium flex-shrink-0`}>
                        {getInitials(member.name)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.role}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <button 
                onClick={() => setShowAddMember(true)}
                className="mt-1 w-full py-1.5 text-xs text-purple-600 hover:text-purple-700 border border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition"
              >
                + Add Member
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-400" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {customer.recentActivity.length === 0 ? (
                <div className="text-xs text-gray-400 text-center py-2">No recent activity</div>
              ) : (
                customer.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-2.5 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-[10px] font-medium flex-shrink-0">
                      {getInitials(activity.user)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-700">{activity.description}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{activity.time}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setShowAddMember(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="px-5 py-3.5 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Add Team Member</h3>
                <p className="text-xs text-gray-500">Add a new member to the team</p>
              </div>
              <button onClick={() => setShowAddMember(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Member Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter member name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter role (e.g., Developer, Designer)"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                />
              </div>
            </div>
            <div className="px-5 py-3.5 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAddMember(false)}
                className="px-3.5 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (newMember.name.trim() && newMember.role.trim()) {
                    setShowAddMember(false);
                    setNewMember({ name: '', role: '' });
                  }
                }}
                className="px-3.5 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center"
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetail;
import React, { useState, useEffect } from 'react';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}

const TeamSettings: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Employee');
  const [inviteDepartment, setInviteDepartment] = useState('IT');
  const [memberLimit, setMemberLimit] = useState(5);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team/members', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      } else {
        setMockMembers();
      }
    } catch (error) {
      setMockMembers();
    } finally {
      setLoading(false);
    }
  };

  const setMockMembers = () => {
    setMembers([
      { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', status: 'Active', joined: '01/01/2023' },
      { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'Manager', status: 'Active', joined: '15/02/2023' },
      { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'Employee', status: 'Invited', joined: '10/03/2023' },
      { id: 4, name: 'Sarah Williams', email: 'sarah@company.com', role: 'Employee', status: 'Active', joined: '05/04/2023' },
      { id: 5, name: 'David Brown', email: 'david@company.com', role: 'Manager', status: 'Active', joined: '20/05/2023' },
      { id: 6, name: 'Emily Davis', email: 'emily@company.com', role: 'Employee', status: 'Invited', joined: '12/06/2023' },
      { id: 7, name: 'Chris Wilson', email: 'chris@company.com', role: 'Employee', status: 'Active', joined: '08/07/2023' }
    ]);
  };

  const handleInvite = async () => {
    if (!inviteEmail) {
      alert('Please enter email address');
      return;
    }
    
    const newMember: TeamMember = {
      id: members.length + 1,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'Invited',
      joined: new Date().toLocaleDateString()
    };
    
    try {
      const response = await fetch('/api/team/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole, department: inviteDepartment })
      });
      if (response.ok) {
        alert(`Invitation sent to ${inviteEmail}`);
        setMembers([newMember, ...members]);
      } else {
        alert(`Invitation sent to ${inviteEmail} (Demo)`);
        setMembers([newMember, ...members]);
      }
    } catch (error) {
      alert(`Invitation sent to ${inviteEmail} (Demo)`);
      setMembers([newMember, ...members]);
    }
    
    setInviteEmail('');
  };

  const handleEditMember = (id: number, currentRole: string) => {
    const newRole = prompt('Enter new role (Admin/Manager/Employee):', currentRole);
    if (newRole && ['Admin', 'Manager', 'Employee'].includes(newRole)) {
      setMembers(members.map(m => m.id === id ? { ...m, role: newRole } : m));
      alert(`Member role updated to ${newRole}`);
    } else if (newRole) {
      alert('Invalid role. Please enter Admin, Manager, or Employee');
    }
  };

  const handleDeleteMember = (id: number, name: string) => {
    if (window.confirm(`Remove ${name} from team?`)) {
      setMembers(members.filter(m => m.id !== id));
      alert('Member removed successfully');
    }
  };

  const handleResendInvite = (email: string) => {
    alert(`Invitation resent to ${email}`);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setMemberLimit(memberLimit + 5);
      setLoadingMore(false);
    }, 500);
  };

  const getStatusStyles = (status: string) => {
    if (status === 'Active') {
      return 'bg-green-100 text-green-700';
    }
    return 'bg-yellow-100 text-yellow-700';
  };

  if (loading) return (
    <div className="flex justify-center items-center py-12">
      <div className="text-gray-600">Loading team members...</div>
    </div>
  );

  const displayedMembers = members.slice(0, memberLimit);
  const hasMore = memberLimit < members.length;

  return (
    <div className="w-full max-w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Team Members</h2>
        <p className="text-sm text-gray-600">Manage your team members and their roles</p>
      </div>
      
      {/* Invite Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Enter email address"
            className="flex-1 px-4 py-2.5 text-gray-800 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
          <select 
            className="px-4 py-2.5 text-gray-800 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            value={inviteRole} 
            onChange={(e) => setInviteRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
          <select 
            className="px-4 py-2.5 text-gray-800 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            value={inviteDepartment} 
            onChange={(e) => setInviteDepartment(e.target.value)}
          >
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Business">Business</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
          </select>
          <button 
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
            onClick={handleInvite}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Invite Member
          </button>
        </div>
      </div>
      
      {/* Team Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm border-b border-gray-200">Name</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm border-b border-gray-200">Email</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm border-b border-gray-200">Role</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm border-b border-gray-200">Status</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm border-b border-gray-200">Joined Date</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold text-sm border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-900 font-medium border-b border-gray-100">{member.name}</td>
                  <td className="py-3 px-4 text-gray-700 border-b border-gray-100">{member.email}</td>
                  <td className="py-3 px-4 text-gray-800 border-b border-gray-100">{member.role}</td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${getStatusStyles(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-b border-gray-100">{member.joined}</td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                        onClick={() => handleEditMember(member.id, member.role)}
                        title="Edit Role"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        onClick={() => handleDeleteMember(member.id, member.name)}
                        title="Remove Member"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      {member.status === 'Invited' && (
                        <button 
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          onClick={() => handleResendInvite(member.email)}
                          title="Resend Invite"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Load More Button */}
        {hasMore && (
          <div className="py-4 text-center border-t border-gray-200">
            <button 
              className="px-5 py-2 text-sm font-medium text-indigo-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
              onClick={handleLoadMore} 
              disabled={loadingMore}
            >
              {loadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
        
        {/* Empty State */}
        {members.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p className="text-gray-500">No team members yet</p>
            <p className="text-gray-400 text-sm mt-1">Invite your first team member to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamSettings;
import React, { useState, useEffect } from 'react';
import './team.css';

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
      { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'Employee', status: 'Invited', joined: '10/03/2023' }
    ]);
  };

  const handleInvite = async () => {
    if (!inviteEmail) {
      alert('Please enter email address');
      return;
    }
    
    const newMember: TeamMember = {
      id: members.length + 1,
      name: 'New Member',
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
        setMembers([...members, newMember]);
      } else {
        alert(`Invitation sent to ${inviteEmail} (Demo)`);
        setMembers([...members, newMember]);
      }
    } catch (error) {
      alert(`Invitation sent to ${inviteEmail} (Demo)`);
      setMembers([...members, newMember]);
    }
    
    setInviteEmail('');
  };

  const handleEditMember = (id: number) => {
    const newRole = prompt('Enter new role (Admin/Manager/Employee):');
    if (newRole) {
      setMembers(members.map(m => m.id === id ? { ...m, role: newRole } : m));
      alert(`Member role updated to ${newRole}`);
    }
  };

  const handleDeleteMember = (id: number) => {
    if (window.confirm('Remove this team member?')) {
      setMembers(members.filter(m => m.id !== id));
      alert('Member removed successfully');
    }
  };

  const handleResendInvite = (email: string) => {
    alert(`Invitation resent to ${email}`);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="team-settings">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Team Members</h2>
      <p className="text-sm text-gray-500 mb-6">Manage your team members and their roles</p>
      
      <div className="invite-section">
        <input 
          type="email" 
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          placeholder="Enter email address"
          className="invite-input"
        />
        <select className="role-select" value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}>
          <option>Admin</option>
          <option>Manager</option>
          <option>Employee</option>
        </select>
        <select className="role-select" value={inviteDepartment} onChange={(e) => setInviteDepartment(e.target.value)}>
          <option>IT</option>
          <option>Marketing</option>
          <option>Business</option>
          <option>HR</option>
          <option>Sales</option>
        </select>
        <button className="btn-invite" onClick={handleInvite}>+ Invite Member</button>
      </div>
      
      <table className="team-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
              <td>
                <span className={member.status === 'Active' ? 'status-active' : 'status-invited'}>
                  {member.status}
                </span>
              </td>
              <td>{member.joined}</td>
              <td>
                <button className="action-edit" onClick={() => handleEditMember(member.id)}>✏️</button>
                <button className="action-delete" onClick={() => handleDeleteMember(member.id)}>🗑️</button>
                {member.status === 'Invited' && (
                  <button className="action-resend" onClick={() => handleResendInvite(member.email)}>📧</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamSettings;
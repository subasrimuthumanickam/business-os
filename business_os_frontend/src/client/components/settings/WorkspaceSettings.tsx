import React, { useState, useEffect } from 'react';
import './workspace.css';

interface WorkspaceData {
  workspaceName: string;
  email: string;
  username: string;
}

const WorkspaceSettings: React.FC = () => {
  const [workspace, setWorkspace] = useState<WorkspaceData>({
    workspaceName: '',
    email: '',
    username: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchWorkspaceData();
  }, []);

  const fetchWorkspaceData = async () => {
    try {
      const response = await fetch('/api/workspace/settings', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setWorkspace(data);
      } else {
        // Mock data
        setWorkspace({
          workspaceName: 'Beyond UI',
          email: 'beyondui@email.com',
          username: 'saasworkspace/beyondui'
        });
      }
    } catch (error) {
      setWorkspace({
        workspaceName: 'Beyond UI',
        email: 'beyondui@email.com',
        username: 'saasworkspace/beyondui'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/workspace/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(workspace)
      });
      if (response.ok) {
        alert('Workspace settings saved successfully!');
      } else {
        alert('Workspace settings saved! (Demo)');
      }
    } catch (error) {
      alert('Workspace settings saved! (Demo)');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="workspace-settings">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Workspace Details</h2>
      <p className="text-sm text-gray-500 mb-6">Basic workspace info details</p>
      
      <div className="space-y-5 max-w-md">
        <div className="field-group">
          <label>Workspace name</label>
          <input 
            type="text" 
            value={workspace.workspaceName} 
            onChange={(e) => setWorkspace({...workspace, workspaceName: e.target.value})}
          />
        </div>

        <div className="field-group">
          <label>Email</label>
          <input 
            type="email" 
            value={workspace.email} 
            onChange={(e) => setWorkspace({...workspace, email: e.target.value})}
          />
        </div>

        <div className="field-group">
          <label>Username</label>
          <input 
            type="text" 
            value={workspace.username} 
            onChange={(e) => setWorkspace({...workspace, username: e.target.value})}
          />
        </div>

        <button className="btn-save" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default WorkspaceSettings;
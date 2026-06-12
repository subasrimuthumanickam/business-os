import React, { useState, useEffect } from 'react';

interface Project {
  id: string;
  projectName: string;
  client: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'ongoing' | 'completed' | 'pending' | 'on_hold';
  budget?: number;
  teamMembers?: number;
  description?: string;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Form state for new/edit project
  const [formData, setFormData] = useState({
    projectName: '',
    client: '',
    startDate: '',
    endDate: '',
    progress: 0,
    status: 'ongoing' as Project['status'],
    budget: 0,
    description: '',
  });

  // Fetch projects (dynamic data)
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Try to fetch from API
      const response = await fetch('/api/projects', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data.data || data);
      } else {
        // Fallback to mock data
        setMockData();
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setMockData();
    } finally {
      setLoading(false);
    }
  };

  const setMockData = () => {
    setProjects([
      { id: '1', projectName: 'E-commerce Website', client: 'ABC Corp', startDate: '2024-01-10', endDate: '2024-04-10', progress: 65, status: 'ongoing' },
      { id: '2', projectName: 'Mobile App Development', client: 'XYZ Ltd', startDate: '2024-02-01', endDate: '2024-05-01', progress: 40, status: 'ongoing' },
      { id: '3', projectName: 'CRM Implementation', client: 'PQR Pvt Ltd', startDate: '2023-11-15', endDate: '2024-02-15', progress: 100, status: 'completed' },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        // Update existing project
        const response = await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          alert('Project updated successfully!');
        }
      } else {
        // Create new project
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          alert('Project created successfully!');
        }
      }
      fetchProjects();
      setShowModal(false);
      setEditingProject(null);
      resetForm();
    } catch (error) {
      // Fallback - update local state
      if (editingProject) {
        setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...formData } : p));
        alert('Project updated (local)');
      } else {
        const newProject: Project = {
          id: Date.now().toString(),
          ...formData
        };
        setProjects([...projects, newProject]);
        alert('Project created (local)');
      }
      setShowModal(false);
      setEditingProject(null);
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProjects(projects.filter(p => p.id !== id));
        alert('Project deleted successfully!');
      } catch (error) {
        setProjects(projects.filter(p => p.id !== id));
        alert('Project deleted (local)');
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      projectName: project.projectName,
      client: project.client,
      startDate: project.startDate,
      endDate: project.endDate,
      progress: project.progress,
      status: project.status,
      budget: project.budget || 0,
      description: project.description || '',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      projectName: '',
      client: '',
      startDate: '',
      endDate: '',
      progress: 0,
      status: 'ongoing',
      budget: 0,
      description: '',
    });
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'ongoing': return 'status-ongoing';
      case 'completed': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'on_hold': return 'status-onhold';
      default: return '';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchSearch && matchStatus;
  });

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="project-list">
      <div className="list-header">
        <h2>Projects</h2>
        <button className="btn-primary" onClick={() => { setEditingProject(null); resetForm(); setShowModal(true); }}>
          + New Project
        </button>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <input
          type="text"
          placeholder="🔍 Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="on_hold">On Hold</option>
        </select>
      </div>

      {/* Projects Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>PROJECT NAME</th>
              <th>CLIENT</th>
              <th>START DATE</th>
              <th>END DATE</th>
              <th>PROGRESS</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map(project => (
              <tr key={project.id}>
                <td>{project.projectName}</td>
                <td>{project.client}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td className="progress-cell">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${project.progress}%` }}>
                      {project.progress}%
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${getStatusClass(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn view" onClick={() => alert(`View: ${project.projectName}`)}>View</button>
                  <button className="action-btn edit" onClick={() => handleEdit(project)}>Edit</button>
                  <button className="action-btn delete" onClick={() => handleDelete(project.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Project Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProject ? 'Edit Project' : 'Create New Project'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Project Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.projectName} 
                  onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Client *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.client} 
                  onChange={(e) => setFormData({...formData, client: e.target.value})}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date *</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.startDate} 
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>End Date *</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.endDate} 
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Progress (%)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={formData.progress} 
                    onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})}
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select 
                    value={formData.status} 
                    onChange={(e) => setFormData({...formData, status: e.target.value as Project['status']})}
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="on_hold">On Hold</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Budget (Optional)</label>
                <input 
                  type="number" 
                  value={formData.budget} 
                  onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows={3} 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">{editingProject ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
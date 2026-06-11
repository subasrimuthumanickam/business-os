 import React, { useState, useEffect } from 'react';

interface Project {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  status: 'ongoing' | 'completed' | 'pending';
  progress: number;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      const mockProjects: Project[] = [
        { id: '1', name: 'E-commerce Website', client: 'ABC Corp', startDate: '2024-01-10', endDate: '2024-04-10', status: 'ongoing', progress: 65 },
        { id: '2', name: 'Mobile App Development', client: 'XYZ Ltd', startDate: '2024-02-01', endDate: '2024-05-01', status: 'ongoing', progress: 40 },
        { id: '3', name: 'CRM Implementation', client: 'PQR Pvt Ltd', startDate: '2023-11-15', endDate: '2024-02-15', status: 'completed', progress: 100 },
      ];
      setProjects(mockProjects);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="project-list">
      <div className="list-header">
        <h2>Projects</h2>
        <button className="btn-primary">+ New Project</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Client</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.client}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${project.progress}%` }}>
                      {project.progress}%
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${project.status}`}>
                    {project.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn view">View</button>
                  <button className="action-btn edit">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;

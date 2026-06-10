import React, { useState } from 'react';
import StatsCards from './StatsCards';
import { Button } from '../ui/Button';
import CompanyRegistrationModal from '../modals/CompanyRegistrationModal';

const SuperAdminDashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Acme Corp', email: 'admin@acme.com', plan: 'business', status: 'active', createdAt: '2024-01-15' },
    { id: 2, name: 'TechStart', email: 'hello@techstart.com', plan: 'starter', status: 'active', createdAt: '2024-02-03' },
    { id: 3, name: 'Global Inc', email: 'info@global.com', plan: 'enterprise', status: 'active', createdAt: '2024-03-22' }
  ]);

  const [stats] = useState({
    totalCompanies: 247,
    activeCompanies: 198,
    trialCompanies: 32,
    revenue: 24500
  });

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCompanyCreated = (newCompany: any) => {
    setCompanies([newCompany, ...companies]);
  };

  return (
    <div className="dashboard-shell">
      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-description">
              Monitor performance, manage tenant companies, and launch new accounts from a single aligned dashboard.
            </p>
          </div>
          <div className="status-badge">
            <span className="status-dot"></span>
            All systems are running smoothly
          </div>
        </div>

        <div className="quick-actions-grid">
          <div className="action-card">
            <p className="action-card-label">This week</p>
            <h3 className="action-card-title">Main overview</h3>
            <p className="action-card-text">
              Keep an eye on active accounts, revenue growth, and trial company conversions from one workspace.
            </p>
          </div>
          <div className="action-card">
            <p className="action-card-label">Quick action</p>
            <div className="quick-action-box">
              <div>
                <h3>Create a new company</h3>
                <p>Start onboarding in a few clicks.</p>
              </div>
              <Button onClick={() => setShowModal(true)}>+ New Company</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Companies Table */}
      {/* <div className="card">
        <div className="card-header">
          <h2>Companies Management</h2>
        </div>
        <div className="card-content">
          <div className="actions-bar">
            <input
              type="text"
              placeholder="Search companies..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={() => setShowModal(true)}>+ New Company</Button>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => (
                  <tr key={company.id}>
                    <td>
                      <div className="company-name">{company.name}</div>
                      <div className="company-email">{company.email}</div>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>{company.plan}</td>
                    <td>
                      <span className="status-badge-success">{company.status}</span>
                    </td>
                    <td style={{ color: '#9ca3af' }}>
                      {new Date(company.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}

      <CompanyRegistrationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleCompanyCreated}
      />
    </div>
  );
};

export default SuperAdminDashboard;
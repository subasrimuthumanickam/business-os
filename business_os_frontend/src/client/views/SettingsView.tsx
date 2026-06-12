import React, { useState } from 'react';

const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // ========== PROFILE SETTINGS (Dynamic) ==========
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@businessos.com',
    phone: '+91 98765 43210',
  });
  const [editingProfile, setEditingProfile] = useState<string | null>(null);
  const [tempProfileValue, setTempProfileValue] = useState('');

  // ========== COMPANY SETTINGS (Dynamic) ==========
  const [company, setCompany] = useState({
    companyName: 'ABC Corporation',
    companyEmail: 'contact@abccorp.com',
    phone: '+91 98765 43210',
    gstNumber: '22AAAAA0000A1Z',
    bankName: 'HDFC Bank',
    accountNumber: 'XXXXXXXXXXXX1234',
    ifscCode: 'HDFC0001234',
  });
  const [editingCompany, setEditingCompany] = useState<string | null>(null);
  const [tempCompanyValue, setTempCompanyValue] = useState('');

  // ========== NOTIFICATION SETTINGS ==========
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    invoiceAlerts: true,
    taskAlerts: true,
  });

  // ========== BILLING SETTINGS ==========
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Visa', last4: '1234', expiry: '12/2026', isDefault: true },
  ]);
  const [billingHistory, setBillingHistory] = useState([
    { id: 1, date: '01/06/2024', invoiceNo: 'INV-001', amount: 149, status: 'Paid' },
    { id: 2, date: '01/05/2024', invoiceNo: 'INV-002', amount: 149, status: 'Paid' },
    { id: 3, date: '01/04/2024', invoiceNo: 'INV-003', amount: 149, status: 'Paid' },
    { id: 4, date: '01/03/2024', invoiceNo: 'INV-004', amount: 149, status: 'Paid' },
  ]);
  const [historyLimit, setHistoryLimit] = useState(4);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // ========== TEAM SETTINGS ==========
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', status: 'Active', joined: '01/01/2023' },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'Manager', status: 'Active', joined: '15/02/2023' },
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'Employee', status: 'Invited', joined: '10/03/2023' },
  ]);
  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'Employee',
    department: 'IT',
  });

  // ========== PROFILE HANDLERS ==========
  const startEditProfile = (field: string, value: string) => {
    setEditingProfile(field);
    setTempProfileValue(value);
  };
  const saveProfileEdit = () => {
    if (editingProfile) {
      setProfile({ ...profile, [editingProfile]: tempProfileValue });
      setEditingProfile(null);
      alert(`${editingProfile} updated successfully!`);
    }
  };
  const cancelProfileEdit = () => {
    setEditingProfile(null);
  };

  // ========== COMPANY HANDLERS ==========
  const startEditCompany = (field: string, value: string) => {
    setEditingCompany(field);
    setTempCompanyValue(value);
  };
  const saveCompanyEdit = () => {
    if (editingCompany) {
      setCompany({ ...company, [editingCompany]: tempCompanyValue });
      setEditingCompany(null);
      alert(`${editingCompany} updated successfully!`);
    }
  };
  const cancelCompanyEdit = () => {
    setEditingCompany(null);
  };

  // ========== NOTIFICATION HANDLER ==========
  const handleNotificationSave = () => {
    alert('Notification preferences saved successfully!');
  };

  // ========== BILLING HANDLERS ==========
  const handleCancelPlan = () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      alert('Subscription cancelled successfully');
    }
  };
  const handleUpgradePlan = () => {
    alert('Redirecting to upgrade plan page');
  };
  const handleAddPaymentMethod = () => {
    const newId = paymentMethods.length + 1;
    setPaymentMethods([...paymentMethods, { id: newId, type: 'New Card', last4: '0000', expiry: '12/2028', isDefault: false }]);
    alert('New payment method added');
  };
  const handleEditPayment = (id: number) => {
    alert(`Edit payment method ${id}`);
  };
  const handleRemovePayment = (id: number) => {
    if (window.confirm('Remove this payment method?')) {
      setPaymentMethods(paymentMethods.filter(p => p.id !== id));
      alert('Payment method removed');
    }
  };
  const handleDownloadPDF = (invoiceNo: string) => {
    alert(`Downloading invoice ${invoiceNo}`);
  };
  const handleLoadMore = () => {
    setLoadingHistory(true);
    setTimeout(() => {
      const moreHistory = [
        { id: 5, date: '01/02/2024', invoiceNo: 'INV-005', amount: 149, status: 'Paid' },
        { id: 6, date: '01/01/2024', invoiceNo: 'INV-006', amount: 149, status: 'Paid' },
      ];
      setBillingHistory([...billingHistory, ...moreHistory]);
      setHistoryLimit(historyLimit + 2);
      setLoadingHistory(false);
    }, 1000);
  };

  // ========== TEAM HANDLERS ==========
  const handleEditMember = (id: number) => {
    alert(`Edit member ${id}`);
  };
  const handleDeleteMember = (id: number) => {
    if (window.confirm('Remove this team member?')) {
      setTeamMembers(teamMembers.filter(m => m.id !== id));
      alert('Member removed successfully');
    }
  };
  const handleInviteMember = () => {
    if (!inviteData.email) {
      alert('Please enter email address');
      return;
    }
    const newMember = {
      id: teamMembers.length + 1,
      name: 'New Member',
      email: inviteData.email,
      role: inviteData.role,
      status: 'Invited',
      joined: new Date().toLocaleDateString(),
    };
    setTeamMembers([...teamMembers, newMember]);
    alert(`Invitation sent to ${inviteData.email}`);
    setInviteData({ email: '', role: 'Employee', department: 'IT' });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'company', label: 'Company', icon: '🏢' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'billing', label: 'Billing', icon: '💰' },
    { id: 'team', label: 'Team', icon: '👥' },
  ];

  return (
    <div className="settings-view">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account and company preferences</p>
      </div>

      <div className="settings-container">
        {/* Sidebar Tabs */}
        <div className="settings-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="settings-content">
          
          {/* ==================== PROFILE SETTINGS ==================== */}
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2>Profile Settings</h2>
              
              <div className="settings-field">
                <div className="field-label">FULL NAME</div>
                <div className="field-value-row">
                  <span className="field-text">{profile.fullName}</span>
                  <button 
                    className="btn-edit-icon" 
                    onClick={() => startEditProfile('fullName', profile.fullName)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                </div>
                {editingProfile === 'fullName' && (
                  <div className="edit-actions">
                    <input 
                      type="text" 
                      className="field-input"
                      value={tempProfileValue} 
                      onChange={(e) => setTempProfileValue(e.target.value)}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <div className="settings-field">
                <div className="field-label">EMAIL ADDRESS</div>
                <div className="field-value-row">
                  <span className="field-text">{profile.email}</span>
                  <button 
                    className="btn-edit-icon" 
                    onClick={() => startEditProfile('email', profile.email)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                </div>
                {editingProfile === 'email' && (
                  <div className="edit-actions">
                    <input 
                      type="email" 
                      className="field-input"
                      value={tempProfileValue} 
                      onChange={(e) => setTempProfileValue(e.target.value)}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <div className="settings-field">
                <div className="field-label">PHONE NUMBER</div>
                <div className="field-value-row">
                  <span className="field-text">{profile.phone}</span>
                  <button 
                    className="btn-edit-icon" 
                    onClick={() => startEditProfile('phone', profile.phone)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                </div>
                {editingProfile === 'phone' && (
                  <div className="edit-actions">
                    <input 
                      type="tel" 
                      className="field-input"
                      value={tempProfileValue} 
                      onChange={(e) => setTempProfileValue(e.target.value)}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              {editingProfile && (
                <div className="form-actions">
                  <button className="btn-save" onClick={saveProfileEdit}>Save Changes</button>
                  <button className="btn-cancel" onClick={cancelProfileEdit}>Cancel</button>
                </div>
              )}
            </div>
          )}

          {/* ==================== COMPANY SETTINGS ==================== */}
          {activeTab === 'company' && (
            <div className="settings-section">
              <h2>Company Settings</h2>
              
              <div className="settings-field">
                <div className="field-label">COMPANY NAME</div>
                <div className="field-value-row">
                  <span className="field-text">{company.companyName}</span>
                  <button 
                    className="btn-edit-icon" 
                    onClick={() => startEditCompany('companyName', company.companyName)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                </div>
                {editingCompany === 'companyName' && (
                  <div className="edit-actions">
                    <input 
                      type="text" 
                      className="field-input"
                      value={tempCompanyValue} 
                      onChange={(e) => setTempCompanyValue(e.target.value)}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <div className="settings-field">
                <div className="field-label">COMPANY EMAIL</div>
                <div className="field-value-row">
                  <span className="field-text">{company.companyEmail}</span>
                  <button 
                    className="btn-edit-icon" 
                    onClick={() => startEditCompany('companyEmail', company.companyEmail)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                </div>
                {editingCompany === 'companyEmail' && (
                  <div className="edit-actions">
                    <input 
                      type="email" 
                      className="field-input"
                      value={tempCompanyValue} 
                      onChange={(e) => setTempCompanyValue(e.target.value)}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <div className="settings-field">
                <div className="field-label">PHONE NUMBER</div>
                <div className="field-value-row">
                  <span className="field-text">{company.phone}</span>
                  <button 
                    className="btn-edit-icon" 
                    onClick={() => startEditCompany('phone', company.phone)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                </div>
                {editingCompany === 'phone' && (
                  <div className="edit-actions">
                    <input 
                      type="tel" 
                      className="field-input"
                      value={tempCompanyValue} 
                      onChange={(e) => setTempCompanyValue(e.target.value)}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <div className="settings-field">
                <div className="field-label">GST NUMBER</div>
                <div className="field-value-row">
                  <span className="field-text">{company.gstNumber}</span>
                  <button 
                    className="btn-edit-icon" 
                    onClick={() => startEditCompany('gstNumber', company.gstNumber)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                </div>
                {editingCompany === 'gstNumber' && (
                  <div className="edit-actions">
                    <input 
                      type="text" 
                      className="field-input"
                      value={tempCompanyValue} 
                      onChange={(e) => setTempCompanyValue(e.target.value)}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <h3 className="section-subtitle">Banking Details</h3>

              <div className="settings-field">
                <div className="field-label">BANK NAME</div>
                <div className="field-value-row">
                  <span className="field-text">{company.bankName}</span>
                  <button 
                    className="btn-edit-icon" 
                    onClick={() => startEditCompany('bankName', company.bankName)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                </div>
                {editingCompany === 'bankName' && (
                  <div className="edit-actions">
                    <input 
                      type="text" 
                      className="field-input"
                      value={tempCompanyValue} 
                      onChange={(e) => setTempCompanyValue(e.target.value)}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <div className="settings-field">
                <div className="field-label">ACCOUNT NUMBER</div>
                <div className="field-value-row">
                  <span className="field-text">{company.accountNumber}</span>
                  <button 
                    className="btn-edit-icon" 
                    onClick={() => startEditCompany('accountNumber', company.accountNumber)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                </div>
                {editingCompany === 'accountNumber' && (
                  <div className="edit-actions">
                    <input 
                      type="text" 
                      className="field-input"
                      value={tempCompanyValue} 
                      onChange={(e) => setTempCompanyValue(e.target.value)}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <div className="settings-field">
                <div className="field-label">IFSC CODE</div>
                <div className="field-value-row">
                  <span className="field-text">{company.ifscCode}</span>
                  <button 
                    className="btn-edit-icon" 
                    onClick={() => startEditCompany('ifscCode', company.ifscCode)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                </div>
                {editingCompany === 'ifscCode' && (
                  <div className="edit-actions">
                    <input 
                      type="text" 
                      className="field-input"
                      value={tempCompanyValue} 
                      onChange={(e) => setTempCompanyValue(e.target.value)}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              {editingCompany && (
                <div className="form-actions">
                  <button className="btn-save" onClick={saveCompanyEdit}>Save Changes</button>
                  <button className="btn-cancel" onClick={cancelCompanyEdit}>Cancel</button>
                </div>
              )}
            </div>
          )}

          {/* ==================== NOTIFICATION SETTINGS ==================== */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Settings</h2>
              <p className="section-description">Choose how you want to receive notifications</p>
              
              <div className="notifications-list">
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>📧 Email Alerts</h4>
                    <p>Receive email notifications for important updates</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.emailAlerts} 
                      onChange={() => setNotifications({...notifications, emailAlerts: !notifications.emailAlerts})}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h4>💰 Invoice Alerts</h4>
                    <p>Get notified when invoices are created or paid</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.invoiceAlerts} 
                      onChange={() => setNotifications({...notifications, invoiceAlerts: !notifications.invoiceAlerts})}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h4>✅ Task Alerts</h4>
                    <p>Reminders for upcoming task deadlines</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.taskAlerts} 
                      onChange={() => setNotifications({...notifications, taskAlerts: !notifications.taskAlerts})}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button className="btn-primary" onClick={handleNotificationSave}>Save Preferences</button>
              </div>
            </div>
          )}

          {/* ==================== BILLING SETTINGS ==================== */}
      {/* ==================== BILLING SETTINGS ==================== */}
{activeTab === 'billing' && (
  <div className="settings-section">
    <h2>Billing & Subscription</h2>
    
    <div className="plan-card">
      <div className="plan-name">Professional Plan</div>
      <div className="plan-price">₹149 <span>/ month</span></div>
      <div className="plan-buttons">
        <button className="btn-upgrade" onClick={handleUpgradePlan}>Upgrade Plan</button>
        <button className="btn-cancel-plan" onClick={handleCancelPlan}>Cancel Plan</button>
      </div>
    </div>

    <h3 className="section-subtitle">Payment Methods</h3>
    {paymentMethods.map(method => (
      <div key={method.id} className="payment-card">
        <span>💳 {method.type} ending in {method.last4} - Expires {method.expiry}</span>
        <div className="payment-actions">
          <button className="btn-payment-edit" onClick={() => handleEditPayment(method.id)}>Edit</button>
          <button className="btn-payment-remove" onClick={() => handleRemovePayment(method.id)}>Remove</button>
        </div>
      </div>
    ))}
    <button className="btn-add-payment" onClick={handleAddPaymentMethod}>+ Add Payment Method</button>

    <h3 className="section-subtitle">Billing History</h3>
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Invoice #</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {billingHistory.slice(0, historyLimit).map(invoice => (
            <tr key={invoice.id}>
              <td>{invoice.date}</td>
              <td>{invoice.invoiceNo}</td>
              <td>₹{invoice.amount}</td>
              <td><span className="status-paid">{invoice.status}</span></td>
              <td>
                <button className="btn-download" onClick={() => handleDownloadPDF(invoice.invoiceNo)}>Download PDF</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    {historyLimit < billingHistory.length && (
      <div className="load-more-container">
        <button className="btn-load-more" onClick={handleLoadMore} disabled={loadingHistory}>
          {loadingHistory ? 'Loading...' : 'Load More'}
        </button>
      </div>
    )}
  </div>
)}

   {/* ==================== TEAM SETTINGS ==================== */}
          {activeTab === 'team' && (
            <div className="settings-section">
              <div className="team-header">
                <h2>Team Management</h2>
                <button className="btn-primary" onClick={handleInviteMember}>+ Invite Member</button>
              </div>
              
              <div className="table-container">
                <table className="data-table">
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
                    {teamMembers.map(member => (
                      <tr key={member.id}>
                        <td>{member.name}</td>
                        <td>{member.email}</td>
                        <td>{member.role}</td>
                        <td>
                          <span className={`status-${member.status.toLowerCase()}`}>{member.status}</span>
                        </td>
                        <td>{member.joined}</td>
                        <td className="actions-cell">
                          <button className="action-edit" onClick={() => handleEditMember(member.id)} title="Edit">
                            ✏️
                          </button>
                          <button className="action-delete" onClick={() => handleDeleteMember(member.id)} title="Delete">
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="invite-section">
                <h3>Invite New Member</h3>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={inviteData.email}
                    onChange={(e) => setInviteData({...inviteData, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Role</label>
                    <select 
                      value={inviteData.role}
                      onChange={(e) => setInviteData({...inviteData, role: e.target.value})}
                    >
                      <option>Admin</option>
                      <option>Manager</option>
                      <option>Employee</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select 
                      value={inviteData.department}
                      onChange={(e) => setInviteData({...inviteData, department: e.target.value})}
                    >
                      <option>IT</option>
                      <option>Marketing</option>
                      <option>Business</option>
                      <option>HR</option>
                      <option>Sales</option>
                    </select>
                  </div>
                </div>
                <button className="btn-primary" onClick={handleInviteMember}>Send Invitation</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
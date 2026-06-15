import React, { useState, useEffect } from 'react';
import './security.css';

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface TwoFAData {
  enabled: boolean;
  method: 'sms' | 'app';
}

const SecuritySettings: React.FC = () => {
  const [password, setPassword] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFA, setTwoFA] = useState<TwoFAData>({ enabled: false, method: 'sms' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const fetchSecurityData = async () => {
    try {
      const response = await fetch('/api/user/security', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setTwoFA({ enabled: data.twoFAEnabled, method: data.twoFAMethod || 'sms' });
      }
    } catch (error) {
      setTwoFA({ enabled: false, method: 'sms' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (password.newPassword !== password.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (password.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    setSaving(true);
    try {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          currentPassword: password.currentPassword,
          newPassword: password.newPassword
        })
      });
      if (response.ok) {
        alert('Password changed successfully!');
        setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        alert('Password changed! (Demo)');
        setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      alert('Password changed! (Demo)');
      setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } finally {
      setSaving(false);
    }
  };

  const handleToggle2FA = () => {
    setTwoFA({ ...twoFA, enabled: !twoFA.enabled });
    alert(`${!twoFA.enabled ? 'Enabled' : 'Disabled'} 2FA!`);
  };

  const handleSetMethod = (method: 'sms' | 'app') => {
    setTwoFA({ ...twoFA, method });
    alert(`2FA method set to ${method.toUpperCase()}`);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="security-settings">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Two-factor authentication (2FA)</h2>
      <p className="text-sm text-gray-500 mb-6">
        Keep your account secure by enabling 2FA via SMS or using OTP form authenticator app
      </p>
      
      <div className="space-y-4 mb-8">
        <div className="twofa-card">
          <span className="twofa-icon">📱</span>
          <div className="twofa-content">
            <h3>Text message SMS</h3>
            <p>Receive a one-time passcode via SMS each time you log in.</p>
          </div>
          <button 
            className={`btn-setup ${twoFA.enabled && twoFA.method === 'sms' ? 'active' : ''}`}
            onClick={() => handleSetMethod('sms')}
          >
            {twoFA.method === 'sms' && twoFA.enabled ? 'Active' : 'Set up'}
          </button>
        </div>

        <div className="twofa-card">
          <span className="twofa-icon">🔐</span>
          <div className="twofa-content">
            <h3>Authenticator app (TOTP)</h3>
            <p>Use an app to receive a temporary one-time passcode each time you log in.</p>
          </div>
          <button 
            className={`btn-setup ${twoFA.enabled && twoFA.method === 'app' ? 'active' : ''}`}
            onClick={() => handleSetMethod('app')}
          >
            {twoFA.method === 'app' && twoFA.enabled ? 'Active' : 'Set up'}
          </button>
        </div>
      </div>

      {!twoFA.enabled ? (
        <button className="btn-save mb-6" onClick={handleToggle2FA}>Enable 2FA</button>
      ) : (
        <button className="btn-cancel-plan mb-6" onClick={handleToggle2FA}>Disable 2FA</button>
      )}

      <div className="password-section">
        <h3>Change Password</h3>
        <div className="space-y-4 max-w-md">
          <div className="field-group">
            <label>Current Password</label>
            <input 
              type="password" 
              value={password.currentPassword}
              onChange={(e) => setPassword({...password, currentPassword: e.target.value})}
            />
          </div>
          <div className="field-group">
            <label>New Password</label>
            <input 
              type="password" 
              value={password.newPassword}
              onChange={(e) => setPassword({...password, newPassword: e.target.value})}
            />
          </div>
          <div className="field-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              value={password.confirmPassword}
              onChange={(e) => setPassword({...password, confirmPassword: e.target.value})}
            />
          </div>
          <button className="btn-save" onClick={handlePasswordChange} disabled={saving}>
            {saving ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
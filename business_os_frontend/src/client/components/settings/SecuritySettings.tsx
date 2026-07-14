// import React, { useState } from 'react';

// interface PasswordData {
//   currentPassword: string;
//   newPassword: string;
//   confirmPassword: string;
// }

// const SecuritySettings: React.FC = () => {
//   const [passwordData, setPasswordData] = useState<PasswordData>({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [is2FAEnabled, setIs2FAEnabled] = useState(false);
//   const [updatingPassword, setUpdatingPassword] = useState(false);
//   const [passwordError, setPasswordError] = useState('');
//   const [passwordSuccess, setPasswordSuccess] = useState('');

//   const handlePasswordChange = (field: keyof PasswordData, value: string) => {
//     setPasswordData({ ...passwordData, [field]: value });
//     // Clear messages when user types
//     setPasswordError('');
//     setPasswordSuccess('');
//   };

//   const validatePassword = (): boolean => {
//     if (!passwordData.currentPassword) {
//       setPasswordError('Current password is required');
//       return false;
//     }
//     if (!passwordData.newPassword) {
//       setPasswordError('New password is required');
//       return false;
//     }
//     if (passwordData.newPassword.length < 6) {
//       setPasswordError('New password must be at least 6 characters');
//       return false;
//     }
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setPasswordError('New password and confirm password do not match');
//       return false;
//     }
//     if (passwordData.newPassword === passwordData.currentPassword) {
//       setPasswordError('New password must be different from current password');
//       return false;
//     }
//     return true;
//   };

//   const handleUpdatePassword = async () => {
//     if (!validatePassword()) return;

//     setUpdatingPassword(true);
//     try {
//       const response = await fetch('/api/user/change-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({
//           currentPassword: passwordData.currentPassword,
//           newPassword: passwordData.newPassword
//         })
//       });

//       if (response.ok) {
//         setPasswordSuccess('Password updated successfully!');
//         setPasswordData({
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: ''
//         });
//       } else {
//         const error = await response.json();
//         setPasswordError(error.message || 'Failed to update password');
//       }
//     } catch (error) {
//       // Demo mode - simulate success
//       setPasswordSuccess('Password updated successfully! (Demo)');
//       setPasswordData({
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       });
//     } finally {
//       setUpdatingPassword(false);
//     }
//   };

//   const handleEnable2FA = async () => {
//     try {
//       const response = await fetch('/api/user/2fa/enable', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // Show QR code or setup instructions
//         alert('2FA setup started! Please scan the QR code with your authenticator app.');
//         setIs2FAEnabled(true);
//       } else {
//         alert('2FA would be enabled here. (Demo)');
//         setIs2FAEnabled(true);
//       }
//     } catch (error) {
//       alert('2FA would be enabled here. (Demo)');
//       setIs2FAEnabled(true);
//     }
//   };

//   const handleDisable2FA = async () => {
//     if (window.confirm('Are you sure you want to disable 2FA? This will make your account less secure.')) {
//       try {
//         const response = await fetch('/api/user/2fa/disable', {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         if (response.ok) {
//           alert('2FA has been disabled');
//           setIs2FAEnabled(false);
//         } else {
//           alert('2FA disabled (Demo)');
//           setIs2FAEnabled(false);
//         }
//       } catch (error) {
//         alert('2FA disabled (Demo)');
//         setIs2FAEnabled(false);
//       }
//     }
//   };

//   return (
//     <div className="w-full max-w-2xl">
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-2">Security Settings</h2>
//         <p className="text-sm text-gray-600">Manage your security preferences and password</p>
//       </div>

//       {/* 2FA Section - Authenticator App (TOTP) */}
//       <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
//         <div className="flex items-start gap-4">
//           <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
//             <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//           </div>
//           <div className="flex-1">
//             <h3 className="font-semibold text-gray-900 mb-1">Authenticator app (TOTP)</h3>
//             <p className="text-sm text-gray-600">
//               Use an app to receive a temporary one-time passcode each time you log in.
//             </p>
//           </div>
//           <button
//             onClick={is2FAEnabled ? handleDisable2FA : handleEnable2FA}
//             className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
//               is2FAEnabled 
//                 ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200' 
//                 : 'bg-indigo-600 text-white hover:bg-indigo-700'
//             }`}
//           >
//             {is2FAEnabled ? '✓ Enabled' : 'Enable 2FA'}
//           </button>
//         </div>

//         {is2FAEnabled && (
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span>Two-factor authentication is active on your account</span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Change Password Section */}
//       <div className="bg-white border border-gray-200 rounded-xl p-5">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        
//         {/* Current Password */}
//         <div className="mb-5">
//           <label className="block text-sm font-medium text-gray-700 mb-1.5">
//             Current Password
//           </label>
//           <div className="relative">
//             <input
//               type={showCurrentPassword ? "text" : "password"}
//               value={passwordData.currentPassword}
//               onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
//               placeholder="Enter current password"
//               className="w-full px-4 py-2.5 text-gray-800 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pr-12"
//             />
//             <button
//               type="button"
//               onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
//             >
//               {showCurrentPassword ? (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//               ) : (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* New Password */}
//         <div className="mb-5">
//           <label className="block text-sm font-medium text-gray-700 mb-1.5">
//             New Password
//           </label>
//           <div className="relative">
//             <input
//               type={showNewPassword ? "text" : "password"}
//               value={passwordData.newPassword}
//               onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
//               placeholder="Enter new password"
//               className="w-full px-4 py-2.5 text-gray-800 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pr-12"
//             />
//             <button
//               type="button"
//               onClick={() => setShowNewPassword(!showNewPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
//             >
//               {showNewPassword ? (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//               ) : (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                 </svg>
//               )}
//             </button>
//           </div>
//           <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
//         </div>

//         {/* Confirm Password */}
//         <div className="mb-5">
//           <label className="block text-sm font-medium text-gray-700 mb-1.5">
//             Confirm Password
//           </label>
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               value={passwordData.confirmPassword}
//               onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
//               placeholder="Confirm new password"
//               className="w-full px-4 py-2.5 text-gray-800 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pr-12"
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
//             >
//               {showConfirmPassword ? (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//               ) : (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Error Message */}
//         {passwordError && (
//           <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
//             <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span className="text-sm text-red-700">{passwordError}</span>
//           </div>
//         )}

//         {/* Success Message */}
//         {passwordSuccess && (
//           <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
//             <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span className="text-sm text-green-700">{passwordSuccess}</span>
//           </div>
//         )}

//         {/* Update Password Button */}
//         <button
//           onClick={handleUpdatePassword}
//           disabled={updatingPassword}
//           className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {updatingPassword ? 'Updating...' : 'Update Password'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SecuritySettings;/

import { useState, useEffect } from 'react';
import securityService, {
  SecuritySettings as SecuritySettingsType,
  LoginSession,
  AuditLogItem,
} from '../../services/security.service';

type TabId = 'password' | '2fa' | 'sessions' | 'audit';

const TABS: { id: TabId; label: string }[] = [
  { id: 'password', label: 'Password Policy' },
  { id: '2fa', label: 'Two-Factor Auth' },
  { id: 'sessions', label: 'Active Sessions' },
  { id: 'audit', label: 'Audit Log' },
];

const SecuritySettings = () => {
  const [activeTab, setActiveTab] = useState<TabId>('password');
  const [settings, setSettings] = useState<SecuritySettingsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const [sessions, setSessions] = useState<LoginSession[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditPage, setAuditPage] = useState(1);
  const [auditTotalPages, setAuditTotalPages] = useState(1);
  const [moduleFilter, setModuleFilter] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const data = await securityService.getSettings();
        setSettings(data);
      } catch (err) {
        console.error('Failed to load security settings:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    if (activeTab === 'sessions') {
      loadSessions();
    }
    if (activeTab === 'audit') {
      loadAuditLogs(1);
    }
  }, [activeTab]);

  const loadSessions = async () => {
    try {
      setSessionsLoading(true);
      const data = await securityService.getSessions();
      setSessions(data);
    } catch (err) {
      console.error('Failed to load sessions:', err);
    } finally {
      setSessionsLoading(false);
    }
  };

  const loadAuditLogs = async (page: number) => {
    try {
      setAuditLoading(true);
      const data = await securityService.getAuditLogs({
        page,
        pageSize: 10,
        module: moduleFilter || undefined,
      });
      setAuditLogs(data.logs);
      setAuditTotalPages(data.pagination.totalPages);
      setAuditPage(data.pagination.page);
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setAuditLoading(false);
    }
  };

  const updateField = <K extends keyof SecuritySettingsType>(
    field: K,
    value: SecuritySettingsType[K]
  ) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    try {
      setSaving(true);
      const updated = await securityService.updateSettings(settings);
      setSettings(updated);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2500);
    } catch (err) {
      console.error('Failed to save settings:', err);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleRevokeSession = async (sessionId: number) => {
    if (!window.confirm('Revoke this session? The device will be logged out.')) return;
    try {
      await securityService.revokeSession(sessionId);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    } catch (err) {
      console.error('Failed to revoke session:', err);
      alert('Failed to revoke session.');
    }
  };

  const handleRevokeAllOthers = async () => {
    if (!window.confirm('Revoke all other sessions? All other devices will be logged out.')) return;
    try {
      await securityService.revokeAllOtherSessions();
      loadSessions();
    } catch (err) {
      console.error('Failed to revoke sessions:', err);
      alert('Failed to revoke sessions.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Loading security settings...
      </div>
    );
  }

  return (
    <div className="relative border border-gray-200 rounded-xl bg-white shadow-sm w-full">
      {savedToast && (
        <div className="absolute -top-3 right-4 z-10 flex items-center gap-2 bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          Settings updated
        </div>
      )}

      {/* Top bar - tabs */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-200 flex items-center gap-2 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-6 py-6">
        {/* ============= PASSWORD POLICY TAB ============= */}
        {activeTab === 'password' && settings && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Password policy</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Set password strength requirements for all users
                </p>
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                {saving ? 'Saving...' : 'Save changes'}
              </button>
            </div>

            <div className="space-y-5 max-w-xl">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-800">Minimum password length</p>
                  <p className="text-xs text-gray-400">Recommended: at least 8 characters</p>
                </div>
                <input
                  type="number"
                  min={6}
                  max={32}
                  value={settings.min_password_length}
                  onChange={(e) => updateField('min_password_length', Number(e.target.value))}
                  className="w-20 text-sm px-3 py-1.5 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-800">Require uppercase letter</p>
                  <p className="text-xs text-gray-400">At least one A-Z character</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.require_uppercase}
                  onChange={(e) => updateField('require_uppercase', e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-800">Require number</p>
                  <p className="text-xs text-gray-400">At least one digit 0-9</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.require_number}
                  onChange={(e) => updateField('require_number', e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-800">Require special character</p>
                  <p className="text-xs text-gray-400">e.g. ! @ # $ % ^ &amp;</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.require_special_char}
                  onChange={(e) => updateField('require_special_char', e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">Password expiry</p>
                  <p className="text-xs text-gray-400">Force password reset after N days (0 = never)</p>
                </div>
                <input
                  type="number"
                  min={0}
                  max={365}
                  value={settings.password_expiry_days}
                  onChange={(e) => updateField('password_expiry_days', Number(e.target.value))}
                  className="w-20 text-sm px-3 py-1.5 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============= 2FA TAB ============= */}
        {activeTab === '2fa' && settings && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Two-factor authentication</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Add an extra layer of security to every login
                </p>
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                {saving ? 'Saving...' : 'Save changes'}
              </button>
            </div>

            <div className="max-w-xl space-y-5">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-800">Enforce 2FA for all users</p>
                  <p className="text-xs text-gray-400">
                    Users will be required to set up 2FA before accessing the account
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enforce_2fa}
                  onChange={(e) => updateField('enforce_2fa', e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">Max login attempts</p>
                  <p className="text-xs text-gray-400">Lock account after N failed attempts</p>
                </div>
                <input
                  type="number"
                  min={3}
                  max={10}
                  value={settings.max_login_attempts}
                  onChange={(e) => updateField('max_login_attempts', Number(e.target.value))}
                  className="w-20 text-sm px-3 py-1.5 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Individual users can enable their own 2FA from their profile settings page,
                using an authenticator app.
              </p>
            </div>
          </div>
        )}

        {/* ============= ACTIVE SESSIONS TAB ============= */}
        {activeTab === 'sessions' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Active sessions</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Devices currently signed in to your account
                </p>
              </div>
              {sessions.length > 1 && (
                <button
                  onClick={handleRevokeAllOthers}
                  className="text-sm text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 font-medium"
                >
                  Revoke all other sessions
                </button>
              )}
            </div>

            {sessionsLoading ? (
              <div className="text-sm text-gray-400 py-8 text-center">Loading sessions...</div>
            ) : sessions.length === 0 ? (
              <div className="text-sm text-gray-400 py-8 text-center">No active sessions found.</div>
            ) : (
              <div className="space-y-3">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="4" y="2" width="16" height="20" rx="2" />
                          <line x1="12" y1="18" x2="12" y2="18" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
                          {session.device_info} · {session.browser}
                          {session.is_current && (
                            <span className="text-[10px] font-medium bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                              This device
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {session.ip_address || 'Unknown IP'}
                          {session.location ? ` · ${session.location}` : ''} · Last active{' '}
                          {new Date(session.last_active_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {!session.is_current && (
                      <button
                        onClick={() => handleRevokeSession(session.id)}
                        className="text-xs text-red-600 hover:text-red-700 font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============= AUDIT LOG TAB ============= */}
        {activeTab === 'audit' && (
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Audit log</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Track important actions performed across your organization
                </p>
              </div>
              <input
                type="text"
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadAuditLogs(1)}
                placeholder="Filter by module e.g. invoices"
                className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
              />
            </div>

            {auditLoading ? (
              <div className="text-sm text-gray-400 py-8 text-center">Loading audit log...</div>
            ) : auditLogs.length === 0 ? (
              <div className="text-sm text-gray-400 py-8 text-center">No audit log entries found.</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-separate border-spacing-0">
                    <thead>
                      <tr>
                        <th className="text-left py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">
                          Time
                        </th>
                        <th className="text-left py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">
                          User
                        </th>
                        <th className="text-left py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">
                          Module
                        </th>
                        <th className="text-left py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">
                          Action
                        </th>
                        <th className="text-left py-2.5 px-3 font-medium text-gray-500 text-xs uppercase tracking-wide">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50/70">
                          <td className="py-2.5 px-3 border-b border-gray-100 text-gray-500 whitespace-nowrap">
                            {new Date(log.created_at).toLocaleString()}
                          </td>
                          <td className="py-2.5 px-3 border-b border-gray-100 text-gray-700">
                            {log.user_name || '—'}
                          </td>
                          <td className="py-2.5 px-3 border-b border-gray-100 text-gray-700 capitalize">
                            {log.module.replace(/_/g, ' ')}
                          </td>
                          <td className="py-2.5 px-3 border-b border-gray-100">
                            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
                              {log.action.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 border-b border-gray-100 text-gray-500">
                            {log.description || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {auditTotalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => loadAuditLogs(auditPage - 1)}
                      disabled={auditPage <= 1}
                      className="text-sm text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="text-xs text-gray-400">
                      Page {auditPage} of {auditTotalPages}
                    </span>
                    <button
                      onClick={() => loadAuditLogs(auditPage + 1)}
                      disabled={auditPage >= auditTotalPages}
                      className="text-sm text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecuritySettings;
// src/client/components/settings/CompanyProfile.tsx
import React, { useEffect, useRef, useState } from 'react';
import { companyService } from '../../services/api.service';

interface CompanyProfileData {
  company_name: string;
  subdomain?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  pincode?: string | null;
  gst_number?: string | null;
  phone?: string | null;
  email?: string | null;
  logo_url?: string | null;
  currency?: string | null;
  timezone?: string | null;
  fiscal_year_start?: string | null;
  date_format?: string | null;
  default_language?: string | null;
  time_format?: string | null;
}

const CompanyProfile: React.FC = () => {
  const [profile, setProfile] = useState<CompanyProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await companyService.getProfile<CompanyProfileData>();
      setProfile(data);
    } catch (err: any) {
      console.error('Failed to fetch company profile:', err);
      setError(err.message || 'Failed to load company profile');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof CompanyProfileData, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleLogoClick = () => fileInputRef.current?.click();

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    // local preview immediately
    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);

    try {
      const formData = new FormData();
      formData.append('logo', file);

      const token = localStorage.getItem('authToken');
      const res = await fetch('http://localhost:5000/api/company/logo', {
        method: 'POST',
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: formData,
      });
      const json = await res.json();

      if (json.success && json.data?.logo_url) {
        setProfile({ ...profile, logo_url: json.data.logo_url });
      } else {
        throw new Error(json.message || 'Logo upload failed');
      }
    } catch (err: any) {
      console.error('Logo upload failed:', err);
      setError(err.message || 'Logo upload failed');
    }
  };

  const handleSave = async () => {
    if (!profile) return;
    if (!profile.company_name?.trim()) {
      setError('Company name is required');
      return;
    }
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const updated = await companyService.updateProfile<CompanyProfileData>(profile);
      setProfile(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: any) {
      console.error('Failed to save company profile:', err);
      setError(err.message || 'Failed to save company profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-400 py-10 text-center">Loading company profile…</div>;
  }

  if (!profile) {
    return <div className="text-sm text-red-500 py-10 text-center">{error || 'Failed to load company profile'}</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-900">Company Profile</h2>
        <p className="text-sm text-gray-500 mt-1">
          Your company's identity and contact details, shown on invoices and reports.
        </p>
      </div>

      {/* Logo */}
      <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
        <div
          onClick={handleLogoClick}
          className="w-16 h-16 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-400 transition-colors shrink-0"
        >
          {logoPreview || profile.logo_url ? (
            <img src={logoPreview || profile.logo_url || ''} alt="Company logo" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl text-gray-300">🏢</span>
          )}
        </div>
        <div>
          <button
            onClick={handleLogoClick}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Upload logo
          </button>
          <p className="text-xs text-gray-400 mt-0.5">PNG or JPG, up to 2MB.</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleLogoChange}
          />
        </div>
      </div>

      {/* Identity */}
      <div className="space-y-6 py-6 border-b border-gray-100">
        <FieldRow label="Company Name" required>
          <input
            type="text"
            value={profile.company_name || ''}
            onChange={e => updateField('company_name', e.target.value)}
            className="settings-input"
          />
        </FieldRow>

        {profile.subdomain && (
          <FieldRow label="Subdomain" description="Contact support to change this.">
            <input
              type="text"
              value={profile.subdomain}
              disabled
              className="settings-input bg-gray-50 text-gray-400 cursor-not-allowed"
            />
          </FieldRow>
        )}

        <FieldRow label="GST Number">
          <input
            type="text"
            value={profile.gst_number || ''}
            onChange={e => updateField('gst_number', e.target.value)}
            className="settings-input"
          />
        </FieldRow>
      </div>

      {/* Contact */}
      <div className="space-y-6 py-6 border-b border-gray-100">
        <FieldRow label="Phone">
          <input
            type="text"
            value={profile.phone || ''}
            onChange={e => updateField('phone', e.target.value)}
            className="settings-input"
          />
        </FieldRow>

        <FieldRow label="Email">
          <input
            type="email"
            value={profile.email || ''}
            onChange={e => updateField('email', e.target.value)}
            className="settings-input"
          />
        </FieldRow>
      </div>

      {/* Address */}
      <div className="space-y-6 py-6 border-b border-gray-100">
        <FieldRow label="Address">
          <textarea
            value={profile.address || ''}
            onChange={e => updateField('address', e.target.value)}
            rows={2}
            className="settings-input"
          />
        </FieldRow>

        <FieldRow label="City">
          <input
            type="text"
            value={profile.city || ''}
            onChange={e => updateField('city', e.target.value)}
            className="settings-input"
          />
        </FieldRow>

        <FieldRow label="State">
          <input
            type="text"
            value={profile.state || ''}
            onChange={e => updateField('state', e.target.value)}
            className="settings-input"
          />
        </FieldRow>

        <FieldRow label="Country">
          <input
            type="text"
            value={profile.country || ''}
            onChange={e => updateField('country', e.target.value)}
            className="settings-input"
          />
        </FieldRow>

        <FieldRow label="Pincode">
          <input
            type="text"
            value={profile.pincode || ''}
            onChange={e => updateField('pincode', e.target.value)}
            className="settings-input"
          />
        </FieldRow>
      </div>

      {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

      <div className="flex items-center gap-3 pt-5">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
        {saved && <span className="text-sm text-green-600">Saved ✓</span>}
      </div>
    </div>
  );
};

const FieldRow: React.FC<{
  label: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}> = ({ label, description, required, children }) => (
  <div className="grid grid-cols-3 gap-4 items-start">
    <div className="col-span-1">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
    </div>
    <div className="col-span-2">{children}</div>
  </div>
);

export default CompanyProfile;
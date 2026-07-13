// src/client/components/settings/GeneralSettings.tsx
import React, { useEffect, useState } from 'react';
import { companyService } from '../../services/api.service';

interface GeneralSettingsProps {
  section?: 'general' | 'financial';
}

const LANGUAGES = [{ value: 'en', label: 'English' }, { value: 'ta', label: 'Tamil' }, { value: 'hi', label: 'Hindi' }];
const DATE_FORMATS = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'];
const TIME_FORMATS = [{ value: '12h', label: '12-hour' }, { value: '24h', label: '24-hour' }];
const TIMEZONES = ['Asia/Kolkata', 'Asia/Dubai', 'UTC', 'America/New_York', 'Europe/London'];
const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED'];

interface CompanyProfileData {
  company_name: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  pincode?: string | null;
  gst_number?: string | null;
  phone?: string | null;
  email?: string | null;
  currency?: string | null;
  timezone?: string | null;
  fiscal_year_start?: string | null;
  date_format?: string | null;
  default_language?: string | null;
  time_format?: string | null;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ section = 'general' }) => {
  const [profile, setProfile] = useState<CompanyProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await companyService.getProfile<CompanyProfileData>();
      setProfile(data);
    } catch (err: any) {
      console.error('Failed to fetch settings:', err);
      setError(err.message || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof CompanyProfileData, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const updated = await companyService.updateProfile<CompanyProfileData>(profile);
      setProfile(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: any) {
      console.error('Failed to save settings:', err);
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-400 py-10 text-center">Loading settings…</div>;
  }

  if (!profile) {
    return <div className="text-sm text-red-500 py-10 text-center">{error || 'Failed to load settings'}</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-900">
          {section === 'general' ? 'General & Localization' : 'Financial Settings'}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {section === 'general'
            ? 'Set your default language, date/time formats, and timezone.'
            : 'Set your base currency and fiscal year.'}
        </p>
      </div>

      <div className="space-y-6 pb-6 border-b border-gray-100">
        {section === 'general' ? (
          <>
            <FieldRow label="Default Language" description="Used across the interface for all users by default.">
              <select
                value={profile.default_language || 'en'}
                onChange={e => updateField('default_language', e.target.value)}
                className="settings-input"
              >
                {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </FieldRow>

            <FieldRow label="Date Format">
              <select
                value={profile.date_format || 'DD/MM/YYYY'}
                onChange={e => updateField('date_format', e.target.value)}
                className="settings-input"
              >
                {DATE_FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </FieldRow>

            <FieldRow label="Time Format">
              <select
                value={profile.time_format || '24h'}
                onChange={e => updateField('time_format', e.target.value)}
                className="settings-input"
              >
                {TIME_FORMATS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </FieldRow>

            <FieldRow label="Timezone">
              <select
                value={profile.timezone || 'Asia/Kolkata'}
                onChange={e => updateField('timezone', e.target.value)}
                className="settings-input"
              >
                {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
              </select>
            </FieldRow>
          </>
        ) : (
          <>
            <FieldRow label="Base Currency" description="All reports and totals will be shown in this currency.">
              <select
                value={profile.currency || 'INR'}
                onChange={e => updateField('currency', e.target.value)}
                className="settings-input"
              >
                {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </FieldRow>

            <FieldRow label="Fiscal Year Start" description="Date your fiscal year begins (e.g. 2026-04-01).">
              <input
                type="date"
                value={profile.fiscal_year_start ? profile.fiscal_year_start.substring(0, 10) : ''}
                onChange={e => updateField('fiscal_year_start', e.target.value)}
                className="settings-input"
              />
            </FieldRow>
          </>
        )}
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

const FieldRow: React.FC<{ label: string; description?: string; children: React.ReactNode }> = ({
  label,
  description,
  children,
}) => (
  <div className="grid grid-cols-3 gap-4 items-start">
    <div className="col-span-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
    </div>
    <div className="col-span-2">{children}</div>
  </div>
);

export default GeneralSettings;
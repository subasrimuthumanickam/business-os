// src/client/views/CompleteCompanyProfile.tsx
import React, { useEffect, useState } from 'react';
import { Building2, MapPin, Wallet, Loader2, CheckCircle2, Pencil } from 'lucide-react';
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

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED'];
const TIMEZONES = ['Asia/Kolkata', 'Asia/Dubai', 'UTC', 'America/New_York', 'Europe/London'];
const DATE_FORMATS = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'];

const REQUIRED_FIELDS: (keyof CompanyProfileData)[] = [
  'company_name', 'address', 'city', 'state', 'country', 'pincode',
  'phone', 'email', 'currency', 'timezone',
];

const toDateInputValue = (value?: string | null): string => {
  if (!value) return '';
  const isoMatch = /^\d{4}-\d{2}-\d{2}/.exec(value);
  return isoMatch ? isoMatch[0] : '';
};

const formatDateDisplay = (value?: string | null): string => {
  const iso = toDateInputValue(value);
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}-${m}-${y}`;
};

const inputClass =
  'w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white ' +
  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ' +
  'placeholder:text-gray-400 transition-colors';

const CompleteCompanyProfile: React.FC = () => {
  const [profile, setProfile] = useState<CompanyProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await companyService.getProfile<CompanyProfileData>();
      setProfile(data);
      // If most required fields are already filled, open in view mode; otherwise start in edit mode
      const filled = REQUIRED_FIELDS.filter(f => data?.[f] && String(data[f]).trim() !== '').length;
      setIsEditing(filled < REQUIRED_FIELDS.length);
    } catch (err: any) {
      setError(err.message || 'Failed to load company profile');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof CompanyProfileData, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const completionPercent = (() => {
    if (!profile) return 0;
    const filled = REQUIRED_FIELDS.filter(f => profile[f] && String(profile[f]).trim() !== '').length;
    return Math.round((filled / REQUIRED_FIELDS.length) * 100);
  })();

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
      setIsEditing(false);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: any) {
      setError(err.message || 'Failed to save company profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-full bg-gray-50">
      <div className="px-4 sm:px-8 pt-6 sm:pt-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Complete Your Company Details' : 'Company Details'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditing
              ? 'A few more details to get your organization fully set up.'
              : 'Your organization profile and settings.'}
          </p>
        </div>
        {!loading && profile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Pencil size={14} /> Edit Details
          </button>
        )}
      </div>

      <div className="px-4 sm:px-8 py-6 max-w-4xl">
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 flex items-center justify-center py-20 text-gray-400 gap-2">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Loading company details…</span>
          </div>
        ) : !profile ? (
          <div className="bg-white rounded-xl border border-gray-200 py-20 text-center text-sm text-red-500">
            {error || 'Failed to load company profile'}
          </div>
        ) : isEditing ? (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Progress bar */}
            <div className="px-6 sm:px-8 pt-6">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                <span>Profile completion</span>
                <span className="font-medium text-gray-700">{completionPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>

            <div className="px-6 sm:px-8 py-5 space-y-6">
              {/* Company Info */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Building2 size={16} className="text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-800">Company Information</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Company Name" required>
                    <input
                      type="text"
                      value={profile.company_name || ''}
                      onChange={e => updateField('company_name', e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="GST Number">
                    <input
                      type="text"
                      value={profile.gst_number || ''}
                      onChange={e => updateField('gst_number', e.target.value)}
                      placeholder="e.g. 33ABCDE1234F1Z5"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Phone" required>
                    <input
                      type="text"
                      value={profile.phone || ''}
                      onChange={e => updateField('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      type="email"
                      value={profile.email || ''}
                      onChange={e => updateField('email', e.target.value)}
                      placeholder="company@example.com"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </section>

              {/* Address */}
              <section className="pt-5 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-800">Business Address</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Field label="Address" required>
                      <textarea
                        value={profile.address || ''}
                        onChange={e => updateField('address', e.target.value)}
                        rows={2}
                        placeholder="Street, area, landmark"
                        className={inputClass + ' resize-none'}
                      />
                    </Field>
                  </div>
                  <Field label="City" required>
                    <input
                      type="text"
                      value={profile.city || ''}
                      onChange={e => updateField('city', e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="State" required>
                    <input
                      type="text"
                      value={profile.state || ''}
                      onChange={e => updateField('state', e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Country" required>
                    <input
                      type="text"
                      value={profile.country || ''}
                      onChange={e => updateField('country', e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Pincode" required>
                    <input
                      type="text"
                      value={profile.pincode || ''}
                      onChange={e => updateField('pincode', e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>
              </section>

              {/* Financial */}
              <section className="pt-5 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Wallet size={16} className="text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-800">Financial Settings</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Base Currency" required>
                    <select
                      value={profile.currency || 'INR'}
                      onChange={e => updateField('currency', e.target.value)}
                      className={inputClass}
                    >
                      {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Timezone" required>
                    <select
                      value={profile.timezone || 'Asia/Kolkata'}
                      onChange={e => updateField('timezone', e.target.value)}
                      className={inputClass}
                    >
                      {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                    </select>
                  </Field>
                  <Field label="Fiscal Year Start">
                    <input
                      type="date"
                      value={toDateInputValue(profile.fiscal_year_start)}
                      onChange={e => updateField('fiscal_year_start', e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Date Format">
                    <select
                      value={profile.date_format || 'DD/MM/YYYY'}
                      onChange={e => updateField('date_format', e.target.value)}
                      className={inputClass}
                    >
                      {DATE_FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </Field>
                </div>
              </section>

              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 transition-colors flex items-center gap-2"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        ) : (
          /* ---- VIEW MODE ---- */
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {saved && (
              <div className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-green-50 border-b border-green-100 text-sm text-green-700">
                <CheckCircle2 size={16} /> Saved successfully
              </div>
            )}

            <div className="px-6 sm:px-8 py-6 space-y-6">
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Building2 size={16} className="text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-800">Company Information</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <ViewField label="Company Name" value={profile.company_name} />
                  <ViewField label="GST Number" value={profile.gst_number} />
                  <ViewField label="Phone" value={profile.phone} />
                  <ViewField label="Email" value={profile.email} />
                </div>
              </section>

              <section className="pt-5 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-800">Business Address</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <ViewField label="Address" value={profile.address} />
                  </div>
                  <ViewField label="City" value={profile.city} />
                  <ViewField label="State" value={profile.state} />
                  <ViewField label="Country" value={profile.country} />
                  <ViewField label="Pincode" value={profile.pincode} />
                </div>
              </section>

              <section className="pt-5 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Wallet size={16} className="text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-800">Financial Settings</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <ViewField label="Base Currency" value={profile.currency} />
                  <ViewField label="Timezone" value={profile.timezone} />
                  <ViewField label="Fiscal Year Start" value={formatDateDisplay(profile.fiscal_year_start)} />
                  <ViewField label="Date Format" value={profile.date_format} />
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Field: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({
  label,
  required,
  children,
}) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const ViewField: React.FC<{ label: string; value?: string | null }> = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{label}</p>
    <p className="text-sm text-gray-900">{value && String(value).trim() !== '' ? value : '—'}</p>
  </div>
);

export default CompleteCompanyProfile;
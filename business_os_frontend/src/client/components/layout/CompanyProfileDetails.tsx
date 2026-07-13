import React, { useEffect, useState } from 'react';
import { Building2, MapPin, FileText, Image as ImageIcon, Globe, Save, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useCompanyProfileView } from '../../../context/CompanyProfileContext'; // adjust path

interface CompanyProfileForm {
  company_name: string;
  subdomain: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  gst_number: string;
  logo_url: string;
  currency: string;
  timezone: string;
  fiscal_year_start: string;
  date_format: string;
}

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED'];
const TIMEZONES = ['Asia/Kolkata', 'Asia/Dubai', 'America/New_York', 'Europe/London'];
const DATE_FORMATS = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'];
const FISCAL_STARTS = [
  { value: '01-01', label: 'January (Calendar Year)' },
  { value: '04-01', label: 'April (Indian Standard)' },
  { value: '07-01', label: 'July' },
];

const emptyForm: CompanyProfileForm = {
  company_name: '',
  subdomain: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  country: 'India',
  pincode: '',
  gst_number: '',
  logo_url: '',
  currency: 'INR',
  timezone: 'Asia/Kolkata',
  fiscal_year_start: '04-01',
  date_format: 'DD/MM/YYYY',
};

// TODO: confirm this matches the key used in Login.tsx when the token is saved
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

const CompanyProfileDetails: React.FC = () => {
  const { closeCompanyProfile } = useCompanyProfileView();
  const [form, setForm] = useState<CompanyProfileForm>(emptyForm);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get('/api/settings/company', { headers: getAuthHeader() });
        setForm((prev) => ({ ...prev, ...res.data }));
        if (res.data.logo_url) setLogoPreview(res.data.logo_url);
      } catch (err) {
        console.error('Failed to load company profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, []);

  const handleChange = (field: keyof CompanyProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.company_name || !form.subdomain) {
      setError('Company Name and Subdomain are required.');
      return;
    }

    setSaving(true);
    try {
      const authHeader = getAuthHeader();
      const { logo_url, ...profileFields } = form;

      await axios.put('/api/settings/company', profileFields, { headers: authHeader });

      if (logoFile) {
        const logoPayload = new FormData();
        logoPayload.append('logo', logoFile);
        await axios.post('/api/settings/company/logo', logoPayload, {
          headers: { ...authHeader, 'Content-Type': 'multipart/form-data' },
        });
      }

      closeCompanyProfile();
    } catch (err) {
      console.error(err);
      setError('Could not save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#1d2238] mb-1">Complete Your Company Profile</h1>
      <p className="text-gray-500 text-sm mb-6">
        This information appears on your invoices, estimates, and reports.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-4 py-2 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <section className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={18} className="text-blue-600" />
            <h2 className="font-semibold text-gray-800">Basic Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Company Name *" value={form.company_name} onChange={(v) => handleChange('company_name', v)} />
            <Field label="Subdomain *" value={form.subdomain} onChange={(v) => handleChange('subdomain', v)} placeholder="yourcompany" />
            <Field label="Business Email" value={form.email} onChange={(v) => handleChange('email', v)} type="email" />
            <Field label="Phone" value={form.phone} onChange={(v) => handleChange('phone', v)} />
          </div>
        </section>

        {/* Address */}
        <section className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-blue-600" />
            <h2 className="font-semibold text-gray-800">Address</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Address" value={form.address} onChange={(v) => handleChange('address', v)} className="md:col-span-2" />
            <Field label="City" value={form.city} onChange={(v) => handleChange('city', v)} />
            <Field label="State" value={form.state} onChange={(v) => handleChange('state', v)} />
            <Field label="Country" value={form.country} onChange={(v) => handleChange('country', v)} />
            <Field label="Pincode" value={form.pincode} onChange={(v) => handleChange('pincode', v)} />
          </div>
        </section>

        {/* Tax / Legal */}
        <section className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={18} className="text-blue-600" />
            <h2 className="font-semibold text-gray-800">Tax & Legal</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="GST Number" value={form.gst_number} onChange={(v) => handleChange('gst_number', v)} />
          </div>
        </section>

        {/* Branding */}
        <section className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon size={18} className="text-blue-600" />
            <h2 className="font-semibold text-gray-800">Branding</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain" />
              ) : (
                <ImageIcon size={20} className="text-gray-300" />
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleLogoChange} className="text-sm" />
          </div>
        </section>

        {/* Regional Settings */}
        <section className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={18} className="text-blue-600" />
            <h2 className="font-semibold text-gray-800">Regional Settings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField label="Currency" value={form.currency} onChange={(v) => handleChange('currency', v)} options={CURRENCIES} />
            <SelectField label="Timezone" value={form.timezone} onChange={(v) => handleChange('timezone', v)} options={TIMEZONES} />
            <SelectField
              label="Fiscal Year Start"
              value={form.fiscal_year_start}
              onChange={(v) => handleChange('fiscal_year_start', v)}
              options={FISCAL_STARTS.map((f) => f.value)}
              labels={FISCAL_STARTS.map((f) => f.label)}
            />
            <SelectField label="Date Format" value={form.date_format} onChange={(v) => handleChange('date_format', v)} options={DATE_FORMATS} />
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={closeCompanyProfile}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
          >
            Skip for now
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md disabled:opacity-60"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

/* --- Small reusable field components --- */

const Field: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  className?: string;
}> = ({ label, value, onChange, type = 'text', placeholder, className = '' }) => (
  <div className={className}>
    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500"
    />
  </div>
);

const SelectField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  labels?: string[];
}> = ({ label, value, onChange, options, labels }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
    >
      {options.map((opt, i) => (
        <option key={opt} value={opt}>
          {labels ? labels[i] : opt}
        </option>
      ))}
    </select>
  </div>
);

export default CompanyProfileDetails;
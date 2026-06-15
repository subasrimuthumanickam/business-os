import React, { useState, useEffect } from 'react';
import './CustomerForm.css';

interface CustomerData {
  id?: number | string;
  customer_type: string;
  salutation: string | null;  // <--- Ivide | null nu add pannunga
  first_name: string | null;  // <--- Ivide | null nu add pannunga
  last_name: string | null;   // <--- Ivide | null nu add pannunga
  company_name: string | null;
  display_name: string;
  email: string;
  phone_work: string | null;
  phone_mobile: string | null;
  currency: string;
  location: string | null;
}

interface CustomerFormProps {
  onSubmit: (data: CustomerData) => void;
  onCancel: () => void;
  initialData?: CustomerData;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [customerType, setCustomerType] = useState('Business');
  const [salutation, setSalutation] = useState('Mrs.');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneWork, setPhoneWork] = useState('');
  const [phoneMobile, setPhoneMobile] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [location, setLocation] = useState('');

  // Auto-generate Display Name when names change (just like Zoho model)
  useEffect(() => {
    if (!initialData) {
      const computedName = `${salutation} ${firstName} ${lastName}`.trim().replace(/\s+/g, ' ');
      setDisplayName(computedName);
    }
  }, [salutation, firstName, lastName, initialData]);

  useEffect(() => {
    if (initialData) {
      setCustomerType(initialData.customer_type || 'Business');
      setSalutation(initialData.salutation || 'Mrs.');
      setFirstName(initialData.first_name || '');
      setLastName(initialData.last_name || '');
      setCompanyName(initialData.company_name || '');
      setDisplayName(initialData.display_name || '');
      setEmail(initialData.email || '');
      setPhoneWork(initialData.phone_work || '');
      setPhoneMobile(initialData.phone_mobile || '');
      setCurrency(initialData.currency || 'INR');
      setLocation(initialData.location || '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName || !email) return;

    onSubmit({
      customer_type: customerType,
      salutation,
      first_name: firstName,
      last_name: lastName,
      company_name: companyName,
      display_name: displayName,
      email,
      phone_work: phoneWork,
      phone_mobile: phoneMobile,
      currency,
      location
    });
  };

  return (
    <div className="form-card-scroller">
      <div className="form-card-header">
        <h3>{initialData ? 'Update Customer Profile' : 'Register New SaaS Platform Customer'}</h3>
        <p className="form-subtitle">Modify configurations or add custom brand enterprise metrics inside your system terminal profile context.</p>
      </div>

      <form onSubmit={handleSubmit} className="zoho-styled-form">
        
        {/* FIELD 1: Customer Type */}
        <div className="form-group row-align">
          <label className="main-label">Customer Type</label>
          <div className="radio-group">
            <label className="radio-container">
              <input 
                type="radio" 
                name="customer_type" 
                value="Business" 
                checked={customerType === 'Business'} 
                onChange={() => setCustomerType('Business')} 
              />
              <span className="radio-label">Business</span>
            </label>
            <label className="radio-container">
              <input 
                type="radio" 
                name="customer_type" 
                value="Individual" 
                checked={customerType === 'Individual'} 
                onChange={() => setCustomerType('Individual')} 
              />
              <span className="radio-label">Individual</span>
            </label>
          </div>
        </div>

        {/* FIELD 2: Primary Contact */}
        <div className="form-group row-align">
          <label className="main-label">Primary Contact</label>
          <div className="triple-input-row">
            <select value={salutation} onChange={(e) => setSalutation(e.target.value)} className="salutation-select">
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="Miss.">Miss.</option>
              <option value="Dr.">Dr.</option>
            </select>
            <input 
              type="text" 
              placeholder="First Name" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              className="name-input"
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              className="name-input"
            />
          </div>
        </div>

        {/* FIELD 3: Company Name */}
        <div className="form-group row-align">
          <label htmlFor="company-name" className="main-label">Company Name</label>
          <input 
            id="company-name"
            type="text" 
            value={companyName} 
            onChange={(e) => setCompanyName(e.target.value)} 
            placeholder="e.g. Zylker Inc"
          />
        </div>

        {/* FIELD 4: Customer Display Name */}
        <div className="form-group row-align">
          <label htmlFor="display-name" className="main-label highlighted">Customer Display Name *</label>
          <input 
            id="display-name"
            type="text" 
            value={displayName} 
            onChange={(e) => setDisplayName(e.target.value)} 
            required
          />
        </div>

        {/* FIELD 5: Customer Email */}
        <div className="form-group row-align">
          <label htmlFor="cust-email" className="main-label">Customer Email *</label>
          <input 
            id="cust-email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="username@company.com"
            required 
          />
        </div>

        {/* FIELD 6: Customer Phone */}
        <div className="form-group row-align">
          <label className="main-label">Customer Phone</label>
          <div className="dual-input-row">
            <input 
              type="text" 
              placeholder="Work Phone" 
              value={phoneWork} 
              onChange={(e) => setPhoneWork(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Mobile Phone" 
              value={phoneMobile} 
              onChange={(e) => setPhoneMobile(e.target.value)} 
            />
          </div>
        </div>

        {/* FIELD 7: Currency Dropdown */}
        <div className="form-group row-align">
          <label htmlFor="currency-select" className="main-label">Currency</label>
          <select id="currency-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="INR">INR - Indian Rupee</option>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
          </select>
        </div>

        {/* FIELD 8: Operational Location */}
        <div className="form-group row-align">
          <label htmlFor="cust-loc" className="main-label">Operational Location</label>
          <input 
            id="cust-loc"
            type="text" 
            value={location} 
            placeholder="e.g. Sivakasi, Tamil Nadu"
            onChange={(e) => setLocation(e.target.value)} 
          />
        </div>

        {/* Action Controls Footer */}
        <div className="form-actions-row">
          <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-primary">{initialData ? 'Save Changes' : 'Save Profile Context'}</button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
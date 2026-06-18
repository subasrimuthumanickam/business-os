import React, { useState, useEffect, ChangeEvent } from "react";
import "./CustomerForm.css";


export interface CustomerData {
  id?: number | string;
  customer_type: string;
  salutation: string | null;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  display_name: string;
  email: string;
  phone_work: string | null;
  phone_mobile: string | null;
  currency: string;
  location: string | null;
  tax_rule: string;
  billing_address: string;
  shipping_address: string;
}

interface CustomerFormProps {
  onSubmit: (data: CustomerData) => void;
  onCancel: () => void;
  initialData?: CustomerData;
}

// =============================================
// Constants
// =============================================

type TabName = "Other Details" | "Address" | "Contact Persons" | "Custom Fields" | "Reporting Tags" | "Remarks";

const SALUTATIONS = ["Mr.", "Mrs.", "Ms.", "Miss.", "Dr."];
const CURRENCIES = ["INR", "USD", "EUR", "GBP"];
const CURRENCY_LABELS: Record<string, string> = {
  INR: "INR - Indian Rupee",
  USD: "USD - United States Dollar",
  EUR: "EUR - Euro",
  GBP: "GBP - British Pound",
};
const TAX_RULES = ["Zero rate", "Standard"];
const TABS: TabName[] = ["Other Details", "Address", "Contact Persons", "Custom Fields", "Reporting Tags", "Remarks"];

// =============================================
// Component
// =============================================

export const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [customerType, setCustomerType] = useState<string>("Business");
  const [salutation, setSalutation]     = useState<string>("Mrs.");
  const [firstName, setFirstName]       = useState<string>("");
  const [lastName, setLastName]         = useState<string>("");
  const [companyName, setCompanyName]   = useState<string>("");
  const [displayName, setDisplayName]   = useState<string>("");
  const [email, setEmail]               = useState<string>("");
  const [phoneWork, setPhoneWork]       = useState<string>("");
  const [phoneMobile, setPhoneMobile]   = useState<string>("");
  const [currency, setCurrency]         = useState<string>("INR");
  const [location, setLocation]         = useState<string>("");
  const [taxRule, setTaxRule]           = useState<string>("Zero rate");
  const [billingAddress, setBillingAddress]   = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");

  const [activeTab, setActiveTab] = useState<TabName>("Other Details");
  const [errors, setErrors]       = useState<Record<string, string>>({});

  // ---- Load initialData (Edit mode) ----
  useEffect(() => {
    if (initialData) {
      setCustomerType(initialData.customer_type || "Business");
      setSalutation(initialData.salutation || "Mrs.");
      setFirstName(initialData.first_name || "");
      setLastName(initialData.last_name || "");
      setCompanyName(initialData.company_name || "");
      setDisplayName(initialData.display_name || "");
      setEmail(initialData.email || "");
      setPhoneWork(initialData.phone_work || "");
      setPhoneMobile(initialData.phone_mobile || "");
      setCurrency(initialData.currency || "INR");
      setLocation(initialData.location || "");
      setTaxRule(initialData.tax_rule || "Zero rate");
      setBillingAddress(initialData.billing_address || "");
      setShippingAddress(initialData.shipping_address || "");
    }
  }, [initialData]);

  // ---- Auto-generate display_name (only for new customer) ----
  useEffect(() => {
    if (!initialData) {
      const computed = `${salutation} ${firstName} ${lastName}`.trim().replace(/\s+/g, " ");
      setDisplayName(computed);
    }
  }, [salutation, firstName, lastName, initialData]);

  // ---- Validation ----
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "First name is required";
    if (!lastName.trim())  e.lastName  = "Last name is required";
    if (!displayName.trim()) e.displayName = "Display name is required";
    if (!email.trim())     e.email     = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Invalid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ---- Submit ----
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      customer_type:    customerType,
      salutation:       salutation || null,
      first_name:       firstName  || null,
      last_name:        lastName   || null,
      company_name:     companyName || null,
      display_name:     displayName,
      email,
      phone_work:       phoneWork   || null,
      phone_mobile:     phoneMobile || null,
      currency,
      location:         location   || null,
      tax_rule:         taxRule,
      billing_address:  billingAddress,
      shipping_address: shippingAddress,
    });
  };

  // =============================================
  // Render
  // =============================================

  return (
    <div className="ncf-page">
      <div className="ncf-container">
        <h2 className="ncf-title">
          {initialData ? "Edit Customer" : "New Customer"}
        </h2>

        <form onSubmit={handleSubmit} noValidate>

          {/* Customer Type */}
          <div className="ncf-row">
            <label className="ncf-label">Customer Type</label>
            <div className="ncf-radios">
              {["Business", "Individual"].map((t) => (
                <label key={t} className="ncf-radio-label">
                  <input
                    type="radio"
                    name="customer_type"
                    value={t}
                    checked={customerType === t}
                    onChange={() => setCustomerType(t)}
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          {/* Primary Contact */}
          <div className="ncf-row">
            <label className="ncf-label">Primary Contact</label>
            <div className="ncf-contact-row">
              <select
                value={salutation}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSalutation(e.target.value)}
                className="ncf-select ncf-select--sal"
              >
                {SALUTATIONS.map((s) => <option key={s}>{s}</option>)}
              </select>

              <div className="ncf-input-wrap">
                <input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); setErrors(p => ({...p, firstName: ""})); }}
                  className={`ncf-input ${errors.firstName ? "ncf-input--error" : ""}`}
                />
                {errors.firstName && <span className="ncf-error">{errors.firstName}</span>}
              </div>

              <div className="ncf-input-wrap">
                <input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); setErrors(p => ({...p, lastName: ""})); }}
                  className={`ncf-input ${errors.lastName ? "ncf-input--error" : ""}`}
                />
                {errors.lastName && <span className="ncf-error">{errors.lastName}</span>}
              </div>
            </div>
          </div>

          {/* Company Name */}
          {customerType === "Business" && (
            <div className="ncf-row">
              <label className="ncf-label">Company Name</label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="ncf-input ncf-input--md"
                placeholder="e.g. Zylker Inc"
              />
            </div>
          )}

          {/* Display Name */}
          <div className="ncf-row">
            <label className="ncf-label ncf-label--required">
              Customer Display Name <span className="ncf-info">ⓘ</span>
            </label>
            <div className="ncf-input-wrap">
              <input
                value={displayName}
                onChange={(e) => { setDisplayName(e.target.value); setErrors(p => ({...p, displayName: ""})); }}
                className={`ncf-input ncf-input--md ${errors.displayName ? "ncf-input--error" : ""}`}
              />
              {errors.displayName && <span className="ncf-error">{errors.displayName}</span>}
            </div>
          </div>

          {/* Email */}
          <div className="ncf-row">
            <label className="ncf-label">Customer Email *</label>
            <div className="ncf-input-wrap">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(p => ({...p, email: ""})); }}
                placeholder="email@example.com"
                className={`ncf-input ncf-input--md ${errors.email ? "ncf-input--error" : ""}`}
              />
              {errors.email && <span className="ncf-error">{errors.email}</span>}
            </div>
          </div>

          {/* Phone */}
          <div className="ncf-row">
            <label className="ncf-label">Customer Phone</label>
            <div className="ncf-phone-row">
              <input
                value={phoneWork}
                onChange={(e) => setPhoneWork(e.target.value)}
                placeholder="Work Phone"
                className="ncf-input"
              />
              <input
                value={phoneMobile}
                onChange={(e) => setPhoneMobile(e.target.value)}
                placeholder="Mobile Phone"
                className="ncf-input"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="ncf-tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`ncf-tab ${activeTab === tab ? "ncf-tab--active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab: Other Details */}
          {activeTab === "Other Details" && (
            <div className="ncf-tab-content">
              <div className="ncf-row">
                <label className="ncf-label">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="ncf-select ncf-select--md"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>
                  ))}
                </select>
              </div>
              <div className="ncf-row">
                <label className="ncf-label">Operational Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Sivakasi, Tamil Nadu"
                  className="ncf-input ncf-input--md"
                />
              </div>
              <div className="ncf-row">
                <label className="ncf-label">Tax Rule</label>
                <select
                  value={taxRule}
                  onChange={(e) => setTaxRule(e.target.value)}
                  className="ncf-select ncf-select--md"
                >
                  {TAX_RULES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Tab: Address */}
          {activeTab === "Address" && (
            <div className="ncf-tab-content">
              <div className="ncf-row ncf-row--top">
                <label className="ncf-label">Billing Address</label>
                <textarea
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  rows={4}
                  className="ncf-textarea"
                  placeholder="Street, City, State, ZIP, Country"
                />
              </div>
              <div className="ncf-row ncf-row--top">
                <label className="ncf-label">Shipping Address</label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  rows={4}
                  className="ncf-textarea"
                  placeholder="Street, City, State, ZIP, Country"
                />
              </div>
            </div>
          )}

          {/* Tab: Remarks & placeholders */}
          {(["Contact Persons", "Custom Fields", "Reporting Tags", "Remarks"] as TabName[]).includes(activeTab) && (
            <div className="ncf-tab-content ncf-tab-content--empty">
              <p>No {activeTab} added yet.</p>
            </div>
          )}

          {/* Actions */}
          <div className="ncf-actions">
            <button type="submit" disabled={false} className="ncf-btn ncf-btn--primary">
              {initialData ? "Save Changes" : "Save"}
            </button>
            <button type="button" onClick={onCancel} className="ncf-btn ncf-btn--secondary">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
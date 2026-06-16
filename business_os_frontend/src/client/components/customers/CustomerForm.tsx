// import React, { useState, useEffect } from 'react';
// import './CustomerForm.css';

// interface CustomerData {
//   id?: number | string;
//   customer_type: string;
//   salutation: string | null;  // <--- Ivide | null nu add pannunga
//   first_name: string | null;  // <--- Ivide | null nu add pannunga
//   last_name: string | null;   // <--- Ivide | null nu add pannunga
//   company_name: string | null;
//   display_name: string;
//   email: string;
//   phone_work: string | null;
//   phone_mobile: string | null;
//   currency: string;
//   location: string | null;
//   tax_rule: string;
//   billing_address: string;
//   shipping_address: string;
  
// }

// interface CustomerFormProps {
//   onSubmit: (data: CustomerData) => void;
//   onCancel: () => void;
//   initialData?: CustomerData;
// }

// export const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, onCancel, initialData }) => {
//   const [customerType, setCustomerType] = useState('Business');
//   const [salutation, setSalutation] = useState('Mrs.');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [companyName, setCompanyName] = useState('');
//   const [displayName, setDisplayName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneWork, setPhoneWork] = useState('');
//   const [phoneMobile, setPhoneMobile] = useState('');
//   const [currency, setCurrency] = useState('INR');
//   const [location, setLocation] = useState('');
//   const [taxRule, setTaxRule] = useState('Zero rate');
//   const [billingAddress, setBillingAddress] = useState('');
//   const [shippingAddress, setShippingAddress] = useState('');

//   // Auto-generate Display Name when names change (just like Zoho model)
//   useEffect(() => {
//     if (!initialData) {
//       const computedName = `${salutation} ${firstName} ${lastName}`.trim().replace(/\s+/g, ' ');
//       setDisplayName(computedName);
//     }
//   }, [salutation, firstName, lastName, initialData]);

//   useEffect(() => {
//     if (initialData) {
//       setCustomerType(initialData.customer_type || 'Business');
//       setSalutation(initialData.salutation || 'Mrs.');
//       setFirstName(initialData.first_name || '');
//       setLastName(initialData.last_name || '');
//       setCompanyName(initialData.company_name || '');
//       setDisplayName(initialData.display_name || '');
//       setEmail(initialData.email || '');
//       setPhoneWork(initialData.phone_work || '');
//       setPhoneMobile(initialData.phone_mobile || '');
//       setCurrency(initialData.currency || 'INR');
//       setLocation(initialData.location || '');
//       setTaxRule(initialData.tax_rule || 'Zero rate');
//       setBillingAddress(initialData.billing_address || '');
//       setShippingAddress(initialData.shipping_address || '');
//     }
//   }, [initialData]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!displayName || !email) return;

//     onSubmit({
//       customer_type: customerType,
//       salutation,
//       first_name: firstName,
//       last_name: lastName,
//       company_name: companyName,
//       display_name: displayName,
//       email,
//       phone_work: phoneWork,
//       phone_mobile: phoneMobile,
//       currency,
//       location,
//       tax_rule: taxRule,
//       billing_address: billingAddress,
//       shipping_address: shippingAddress
//     });
//   };

//   return (
//     <div className="form-card-scroller">
//       <div className="form-card-header">
//         <h3>{initialData ? 'Update Customer Profile' : 'Register New SaaS Platform Customer'}</h3>
//         <p className="form-subtitle">Modify configurations or add custom brand enterprise metrics inside your system terminal profile context.</p>
//       </div>

//       <form onSubmit={handleSubmit} className="zoho-styled-form">
        
//         {/* FIELD 1: Customer Type */}
//         <div className="form-group row-align">
//           <label className="main-label">Customer Type</label>
//           <div className="radio-group">
//             <label className="radio-container">
//               <input 
//                 type="radio" 
//                 name="customer_type" 
//                 value="Business" 
//                 checked={customerType === 'Business'} 
//                 onChange={() => setCustomerType('Business')} 
//               />
//               <span className="radio-label">Business</span>
//             </label>
//             <label className="radio-container">
//               <input 
//                 type="radio" 
//                 name="customer_type" 
//                 value="Individual" 
//                 checked={customerType === 'Individual'} 
//                 onChange={() => setCustomerType('Individual')} 
//               />
//               <span className="radio-label">Individual</span>
//             </label>
//           </div>
//         </div>

//         {/* FIELD 2: Primary Contact */}
//         <div className="form-group row-align">
//           <label className="main-label">Primary Contact</label>
//           <div className="triple-input-row">
//             <select value={salutation} onChange={(e) => setSalutation(e.target.value)} className="salutation-select">
//               <option value="Mr.">Mr.</option>
//               <option value="Mrs.">Mrs.</option>
//               <option value="Ms.">Ms.</option>
//               <option value="Miss.">Miss.</option>
//               <option value="Dr.">Dr.</option>
//             </select>
//             <input 
//               type="text" 
//               placeholder="First Name" 
//               value={firstName} 
//               onChange={(e) => setFirstName(e.target.value)} 
//               className="name-input"
//             />
//             <input 
//               type="text" 
//               placeholder="Last Name" 
//               value={lastName} 
//               onChange={(e) => setLastName(e.target.value)} 
//               className="name-input"
//             />
//           </div>
//         </div>

//         {/* FIELD 3: Company Name */}
//         <div className="form-group row-align">
//           <label htmlFor="company-name" className="main-label">Company Name</label>
//           <input 
//             id="company-name"
//             type="text" 
//             value={companyName} 
//             onChange={(e) => setCompanyName(e.target.value)} 
//             placeholder="e.g. Zylker Inc"
//           />
//         </div>

//         {/* FIELD 4: Customer Display Name */}
//         <div className="form-group row-align">
//           <label htmlFor="display-name" className="main-label highlighted">Customer Display Name *</label>
//           <input 
//             id="display-name"
//             type="text" 
//             value={displayName} 
//             onChange={(e) => setDisplayName(e.target.value)} 
//             required
//           />
//         </div>

//         {/* FIELD 5: Customer Email */}
//         <div className="form-group row-align">
//           <label htmlFor="cust-email" className="main-label">Customer Email *</label>
//           <input 
//             id="cust-email"
//             type="email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             placeholder="username@company.com"
//             required 
//           />
//         </div>

//         {/* FIELD 6: Customer Phone */}
//         <div className="form-group row-align">
//           <label className="main-label">Customer Phone</label>
//           <div className="dual-input-row">
//             <input 
//               type="text" 
//               placeholder="Work Phone" 
//               value={phoneWork} 
//               onChange={(e) => setPhoneWork(e.target.value)} 
//             />
//             <input 
//               type="text" 
//               placeholder="Mobile Phone" 
//               value={phoneMobile} 
//               onChange={(e) => setPhoneMobile(e.target.value)} 
//             />
//           </div>
//         </div>

//         {/* FIELD 7: Currency Dropdown */}
//         <div className="form-group row-align">
//           <label htmlFor="currency-select" className="main-label">Currency</label>
//           <select id="currency-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
//             <option value="INR">INR - Indian Rupee</option>
//             <option value="USD">USD - United States Dollar</option>
//             <option value="EUR">EUR - Euro</option>
//             <option value="GBP">GBP - British Pound</option>
//           </select>
//         </div>

//         {/* FIELD 8: Operational Location */}
//         <div className="form-group row-align">
//           <label htmlFor="cust-loc" className="main-label">Operational Location</label>
//           <input 
//             id="cust-loc"
//             type="text" 
//             value={location} 
//             placeholder="e.g. Sivakasi, Tamil Nadu"
//             onChange={(e) => setLocation(e.target.value)} 
//           />
//         </div>

//         {/* SECTION 2: ADDRESS & TAX DETAILS */}
//         <div className="section-header">Address & Tax Details</div>
        
//         <div className="form-group row-align">
//           <label className="main-label">Tax Rule</label>
//           <select value={taxRule} onChange={(e) => setTaxRule(e.target.value)}>
//             <option value="Zero rate">Zero rate</option>
//             <option value="Standard">Standard</option>
//           </select>
//         </div>

//         <div className="form-group row-align">
//           <label className="main-label">Billing Address</label>
//           <textarea 
//             value={billingAddress} 
//             onChange={(e) => setBillingAddress(e.target.value)}
//             placeholder="Billing Address"
//           />
//         </div>

//         <div className="form-group row-align">
//           <label className="main-label">Shipping Address</label>
//           <textarea 
//             value={shippingAddress} 
//             onChange={(e) => setShippingAddress(e.target.value)}
//             placeholder="Shipping Address"
//           />
//         </div>

//         {/* Action Controls Footer */}
//         <div className="form-actions-row">
//           <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
//           <button type="submit" className="btn-primary">{initialData ? 'Save Changes' : 'Save Profile Context'}</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CustomerForm;

// import { useState, ChangeEvent } from "react";
// import "./NewCustomerForm.css";

// import type {
//   CustomerFormData,
//   CustomerType,
//   Salutation,
//   Currency,
//   TaxRule,
//   PaymentTerm,
//   PriceList,
//   TabName,
//   FormErrors,
//   ToastState,
//   CreateCustomerResponse,
// } from "./types/customer";

// // =============================================
// // Constants
// // =============================================

// const API_URL = "http://localhost:5000/api/customers";

// const SALUTATIONS: Salutation[] = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
// const CURRENCIES: Currency[] = [
//   "USD- United States Dollar",
//   "INR- Indian Rupee",
//   "EUR- Euro",
//   "GBP- British Pound",
// ];
// const TAX_RULES: TaxRule[] = ["Zero rate", "Standard rate", "Reduced rate", "Exempt"];
// const PAYMENT_TERMS: PaymentTerm[] = ["Due On Receipt", "Net 15", "Net 30", "Net 45", "Net 60"];
// const PRICE_LISTS: PriceList[] = ["Custom Phone", "Standard", "Wholesale", "Retail"];
// const TABS: TabName[] = [
//   "Other Details",
//   "Address",
//   "Contact Persons",
//   "Custom Fields",
//   "Reporting Tags",
//   "Remarks",
// ];

// const initialForm: CustomerFormData = {
//   customer_type: "Business",
//   salutation: "Mrs.",
//   first_name: "",
//   last_name: "",
//   company_name: "",
//   display_name: "",
//   customer_email: "",
//   customer_phone: "",
//   customer_mobile: "",
//   track_vat: true,
//   company_id: "",
//   currency: "USD- United States Dollar",
//   tax_rule: "Zero rate",
//   enable_tds: true,
//   payment_terms: "Due On Receipt",
//   price_list: "Custom Phone",
//   allow_bank_payment: true,
//   billing_address: "",
//   shipping_address: "",
//   remarks: "",
// };

// // =============================================
// // Component
// // =============================================

// export default function NewCustomerForm(): JSX.Element {
//   const [form, setForm] = useState<CustomerFormData>(initialForm);
//   const [activeTab, setActiveTab] = useState<TabName>("Other Details");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [toast, setToast] = useState<ToastState | null>(null);
//   const [errors, setErrors] = useState<FormErrors>({});

//   // ---- Toast ----
//   const showToast = (msg: string, type: ToastState["type"] = "success"): void => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3500);
//   };

//   // ---- Handle Input Change ----
//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ): void => {
//     const { name, value } = e.target;
//     const key = name as keyof CustomerFormData;

//     // Handle checkbox separately
//     const isCheckbox = (e.target as HTMLInputElement).type === "checkbox";
//     const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;
//     const newValue = isCheckbox ? checked : value;

//     // Clear field error
//     if (errors[key]) {
//       setErrors((prev) => ({ ...prev, [key]: undefined }));
//     }

//     // Auto-build display_name when name fields change
//     if (key === "first_name" || key === "last_name" || key === "salutation") {
//       const sal = key === "salutation" ? value : form.salutation;
//       const fn = key === "first_name" ? value : form.first_name;
//       const ln = key === "last_name" ? value : form.last_name;
//       setForm((prev) => ({
//         ...prev,
//         [key]: newValue,
//         display_name: `${sal} ${fn} ${ln}`.trim(),
//       }));
//       return;
//     }

//     setForm((prev) => ({ ...prev, [key]: newValue }));
//   };

//   // ---- Validation ----
//   const validate = (): boolean => {
//     const e: FormErrors = {};
//     if (!form.first_name.trim()) e.first_name = "First name is required";
//     if (!form.last_name.trim()) e.last_name = "Last name is required";
//     if (!form.display_name.trim()) e.display_name = "Display name is required";
//     if (form.customer_email && !/\S+@\S+\.\S+/.test(form.customer_email)) {
//       e.customer_email = "Invalid email address";
//     }
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   // ---- Submit ----
//   const handleSubmit = async (): Promise<void> => {
//     if (!validate()) return;
//     setLoading(true);
//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data: CreateCustomerResponse = await res.json();
//       if (data.success) {
//         showToast(`Customer created! ID: ${data.customer_id}`);
//         setForm(initialForm);
//         setErrors({});
//       } else {
//         showToast(data.error ?? "Something went wrong", "error");
//       }
//     } catch {
//       showToast("Cannot connect to server. Check backend.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---- Cancel ----
//   const handleCancel = (): void => {
//     setForm(initialForm);
//     setErrors({});
//   };

//   // =============================================
//   // Render
//   // =============================================

//   return (
//     <div className="ncf-page">
//       {toast && (
//         <div className={`ncf-toast ncf-toast--${toast.type}`}>{toast.msg}</div>
//       )}

//       <div className="ncf-container">
//         <h2 className="ncf-title">New Customer</h2>

//         {/* Customer Type */}
//         <div className="ncf-row">
//           <label className="ncf-label">
//             Customer Type <span className="ncf-info">ⓘ</span>
//           </label>
//           <div className="ncf-radios">
//             {(["Business", "Individual"] as CustomerType[]).map((t) => (
//               <label key={t} className="ncf-radio-label">
//                 <input
//                   type="radio"
//                   name="customer_type"
//                   value={t}
//                   checked={form.customer_type === t}
//                   onChange={handleChange}
//                 />
//                 {t}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Primary Contact */}
//         <div className="ncf-row">
//           <label className="ncf-label">
//             Primary Contact <span className="ncf-info">ⓘ</span>
//           </label>
//           <div className="ncf-contact-row">
//             <select
//               name="salutation"
//               value={form.salutation}
//               onChange={handleChange}
//               className="ncf-select ncf-select--sal"
//             >
//               {SALUTATIONS.map((s) => (
//                 <option key={s}>{s}</option>
//               ))}
//             </select>

//             <div className="ncf-input-wrap">
//               <input
//                 name="first_name"
//                 placeholder="First Name"
//                 value={form.first_name}
//                 onChange={handleChange}
//                 className={`ncf-input ${errors.first_name ? "ncf-input--error" : ""}`}
//               />
//               {errors.first_name && (
//                 <span className="ncf-error">{errors.first_name}</span>
//               )}
//             </div>

//             <div className="ncf-input-wrap">
//               <input
//                 name="last_name"
//                 placeholder="Last Name"
//                 value={form.last_name}
//                 onChange={handleChange}
//                 className={`ncf-input ${errors.last_name ? "ncf-input--error" : ""}`}
//               />
//               {errors.last_name && (
//                 <span className="ncf-error">{errors.last_name}</span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Company Name */}
//         {form.customer_type === "Business" && (
//           <div className="ncf-row">
//             <label className="ncf-label">Company Name</label>
//             <input
//               name="company_name"
//               value={form.company_name}
//               onChange={handleChange}
//               className="ncf-input ncf-input--md"
//               placeholder="e.g. Zylker Inc"
//             />
//           </div>
//         )}

//         {/* Display Name */}
//         <div className="ncf-row">
//           <label className="ncf-label ncf-label--required">
//             Customer Display Name <span className="ncf-info">ⓘ</span>
//           </label>
//           <div className="ncf-input-wrap">
//             <input
//               name="display_name"
//               value={form.display_name}
//               onChange={handleChange}
//               className={`ncf-input ncf-input--md ${errors.display_name ? "ncf-input--error" : ""}`}
//             />
//             {errors.display_name && (
//               <span className="ncf-error">{errors.display_name}</span>
//             )}
//           </div>
//         </div>

//         {/* Email */}
//         <div className="ncf-row">
//           <label className="ncf-label">
//             Customer Email <span className="ncf-info">ⓘ</span>
//           </label>
//           <div className="ncf-input-wrap">
//             <input
//               name="customer_email"
//               type="email"
//               value={form.customer_email}
//               onChange={handleChange}
//               placeholder="email@example.com"
//               className={`ncf-input ncf-input--md ${errors.customer_email ? "ncf-input--error" : ""}`}
//             />
//             {errors.customer_email && (
//               <span className="ncf-error">{errors.customer_email}</span>
//             )}
//           </div>
//         </div>

//         {/* Phone */}
//         <div className="ncf-row">
//           <label className="ncf-label">
//             Customer Phone <span className="ncf-info">ⓘ</span>
//           </label>
//           <div className="ncf-phone-row">
//             <input
//               name="customer_phone"
//               value={form.customer_phone}
//               onChange={handleChange}
//               placeholder="Phone"
//               className="ncf-input"
//             />
//             <input
//               name="customer_mobile"
//               value={form.customer_mobile}
//               onChange={handleChange}
//               placeholder="Mobile"
//               className="ncf-input"
//             />
//           </div>
//         </div>

//         {/* VAT Tracking */}
//         <div className="ncf-row">
//           <label className="ncf-label" />
//           <label className="ncf-checkbox-label">
//             <input
//               type="checkbox"
//               name="track_vat"
//               checked={form.track_vat}
//               onChange={handleChange}
//             />
//             <span>Track VAT MOSS, OSS, IOSS, or sale of digital services for this customer</span>
//           </label>
//         </div>
//         {form.track_vat && (
//           <div className="ncf-row">
//             <label className="ncf-label" />
//             <p className="ncf-hint">
//               Enable this option if this is an overseas customer or they are in an EU member
//               state so that you can record and track VAT MOSS, OSS, IOSS, or digital services
//               export using reports.
//             </p>
//           </div>
//         )}

//         {/* Tabs */}
//         <div className="ncf-tabs">
//           {TABS.map((tab) => (
//             <button
//               key={tab}
//               className={`ncf-tab ${activeTab === tab ? "ncf-tab--active" : ""}`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Tab: Other Details */}
//         {activeTab === "Other Details" && (
//           <div className="ncf-tab-content">
//             <div className="ncf-row">
//               <label className="ncf-label">Company ID <span className="ncf-info">ⓘ</span></label>
//               <input
//                 name="company_id"
//                 value={form.company_id}
//                 onChange={handleChange}
//                 className="ncf-input ncf-input--md"
//               />
//             </div>
//             <div className="ncf-row">
//               <label className="ncf-label">Currency</label>
//               <select name="currency" value={form.currency} onChange={handleChange} className="ncf-select ncf-select--md">
//                 {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
//               </select>
//             </div>
//             <div className="ncf-row">
//               <label className="ncf-label">Tax Rule <span className="ncf-info">ⓘ</span></label>
//               <select name="tax_rule" value={form.tax_rule} onChange={handleChange} className="ncf-select ncf-select--md">
//                 {TAX_RULES.map((t) => <option key={t}>{t}</option>)}
//               </select>
//             </div>
//             <div className="ncf-row">
//               <label className="ncf-label">TDS</label>
//               <label className="ncf-checkbox-label">
//                 <input type="checkbox" name="enable_tds" checked={form.enable_tds} onChange={handleChange} />
//                 <span>Enable TDS for this Customer</span>
//               </label>
//             </div>
//             <div className="ncf-row">
//               <label className="ncf-label">Payment Terms</label>
//               <select name="payment_terms" value={form.payment_terms} onChange={handleChange} className="ncf-select ncf-select--md">
//                 {PAYMENT_TERMS.map((p) => <option key={p}>{p}</option>)}
//               </select>
//             </div>
//             <div className="ncf-row">
//               <label className="ncf-label">Price List</label>
//               <select name="price_list" value={form.price_list} onChange={handleChange} className="ncf-select ncf-select--md">
//                 {PRICE_LISTS.map((p) => <option key={p}>{p}</option>)}
//               </select>
//             </div>
//             <div className="ncf-row">
//               <label className="ncf-label">Bank Account Payment</label>
//               <label className="ncf-checkbox-label">
//                 <input type="checkbox" name="allow_bank_payment" checked={form.allow_bank_payment} onChange={handleChange} />
//                 <span>Allow this customer to pay via their bank account.</span>
//               </label>
//             </div>
//           </div>
//         )}

//         {/* Tab: Address */}
//         {activeTab === "Address" && (
//           <div className="ncf-tab-content">
//             <div className="ncf-row ncf-row--top">
//               <label className="ncf-label">Billing Address</label>
//               <textarea name="billing_address" value={form.billing_address} onChange={handleChange} rows={4} className="ncf-textarea" placeholder="Street, City, State, ZIP, Country" />
//             </div>
//             <div className="ncf-row ncf-row--top">
//               <label className="ncf-label">Shipping Address</label>
//               <textarea name="shipping_address" value={form.shipping_address} onChange={handleChange} rows={4} className="ncf-textarea" placeholder="Street, City, State, ZIP, Country" />
//             </div>
//           </div>
//         )}

//         {/* Tab: Remarks */}
//         {activeTab === "Remarks" && (
//           <div className="ncf-tab-content">
//             <div className="ncf-row ncf-row--top">
//               <label className="ncf-label">Remarks</label>
//               <textarea name="remarks" value={form.remarks} onChange={handleChange} rows={5} className="ncf-textarea" placeholder="Any notes about this customer..." />
//             </div>
//           </div>
//         )}

//         {/* Other tabs placeholder */}
//         {(["Contact Persons", "Custom Fields", "Reporting Tags"] as TabName[]).includes(activeTab) && (
//           <div className="ncf-tab-content ncf-tab-content--empty">
//             <p>No {activeTab} added yet.</p>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="ncf-actions">
//           <button onClick={handleSubmit} disabled={loading} className="ncf-btn ncf-btn--primary">
//             {loading ? "Saving..." : "Save"}
//           </button>
//           <button onClick={handleCancel} className="ncf-btn ncf-btn--secondary">
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

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
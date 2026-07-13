// import React, { useState, useEffect, ChangeEvent } from "react";

// export interface CustomerData {
//   id?: number | string;
//   customer_type: string;
//   salutation: string | null;
//   first_name: string | null;
//   last_name: string | null;
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

// // =============================================
// // Constants
// // =============================================

// type TabName = "Other Details" | "Address" | "Contact Persons" | "Custom Fields" | "Reporting Tags" | "Remarks";

// const SALUTATIONS = ["Mr.", "Mrs.", "Ms.", "Miss.", "Dr."];
// const CURRENCIES = ["INR", "USD", "EUR", "GBP"];
// const CURRENCY_LABELS: Record<string, string> = {
//   INR: "INR - Indian Rupee",
//   USD: "USD - United States Dollar",
//   EUR: "EUR - Euro",
//   GBP: "GBP - British Pound",
// };
// const TAX_RULES = ["Zero rate", "Standard"];
// const TABS: TabName[] = ["Other Details", "Address", "Contact Persons", "Custom Fields", "Reporting Tags", "Remarks"];

// // =============================================
// // Shared Tailwind class fragments
// // =============================================

// const inputBase =
//   "border border-gray-300 rounded-[5px] px-2.5 py-[7px] text-[13.5px] text-gray-900 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";
// const inputError = "border-red-500";
// const rowClass = "flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-4";
// const rowTopClass = "flex flex-col md:flex-row md:items-start gap-2 md:gap-3 mb-4";
// const labelClass = "w-full md:w-[180px] lg:w-[200px] md:min-w-[180px] lg:min-w-[200px] text-gray-600 text-[13.5px]";

// // =============================================
// // Component
// // =============================================

// export const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, onCancel, initialData }) => {
//   const [customerType, setCustomerType] = useState<string>("Business");
//   const [salutation, setSalutation]     = useState<string>("Mrs.");
//   const [firstName, setFirstName]       = useState<string>("");
//   const [lastName, setLastName]         = useState<string>("");
//   const [companyName, setCompanyName]   = useState<string>("");
//   const [displayName, setDisplayName]   = useState<string>("");
//   const [email, setEmail]               = useState<string>("");
//   const [phoneWork, setPhoneWork]       = useState<string>("");
//   const [phoneMobile, setPhoneMobile]   = useState<string>("");
//   const [currency, setCurrency]         = useState<string>("INR");
//   const [location, setLocation]         = useState<string>("");
//   const [taxRule, setTaxRule]           = useState<string>("Zero rate");
//   const [billingAddress, setBillingAddress]   = useState<string>("");
//   const [shippingAddress, setShippingAddress] = useState<string>("");

//   const [activeTab, setActiveTab] = useState<TabName>("Other Details");
//   const [errors, setErrors]       = useState<Record<string, string>>({});

//   // ---- Load initialData (Edit mode) ----
//   useEffect(() => {
//     if (initialData) {
//       setCustomerType(initialData.customer_type || "Business");
//       setSalutation(initialData.salutation || "Mrs.");
//       setFirstName(initialData.first_name || "");
//       setLastName(initialData.last_name || "");
//       setCompanyName(initialData.company_name || "");
//       setDisplayName(initialData.display_name || "");
//       setEmail(initialData.email || "");
//       setPhoneWork(initialData.phone_work || "");
//       setPhoneMobile(initialData.phone_mobile || "");
//       setCurrency(initialData.currency || "INR");
//       setLocation(initialData.location || "");
//       setTaxRule(initialData.tax_rule || "Zero rate");
//       setBillingAddress(initialData.billing_address || "");
//       setShippingAddress(initialData.shipping_address || "");
//     }
//   }, [initialData]);

//   // ---- Auto-generate display_name (only for new customer) ----
//   useEffect(() => {
//     if (!initialData) {
//       const computed = `${salutation} ${firstName} ${lastName}`.trim().replace(/\s+/g, " ");
//       setDisplayName(computed);
//     }
//   }, [salutation, firstName, lastName, initialData]);

//   // ---- Validation ----
//   const validate = (): boolean => {
//     const e: Record<string, string> = {};
//     if (!firstName.trim()) e.firstName = "First name is required";
//     if (!lastName.trim())  e.lastName  = "Last name is required";
//     if (!displayName.trim()) e.displayName = "Display name is required";
//     if (!email.trim())     e.email     = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Invalid email address";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   // ---- Submit ----
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const finalCompanyName =
//       customerType === "Individual"
//         ? "Individual"
//         : (companyName || null);

//     onSubmit({
//       customer_type: customerType,
//       salutation: salutation || null,
//       first_name: firstName || null,
//       last_name: lastName || null,
//       company_name: finalCompanyName,
//       display_name: displayName,
//       email,
//       phone_work: phoneWork || null,
//       phone_mobile: phoneMobile || null,
//       currency,
//       location: location || null,
//       tax_rule: taxRule,
//       billing_address: billingAddress,
//       shipping_address: shippingAddress,
//     });
//   };

//   // =============================================
//   // Render
//   // =============================================

//   return (
//     <div className="min-h-screen bg-[#f5f6f8] font-serif text-sm text-[#2d2d2d] p-4 sm:p-6">
//       <div className="bg-white rounded-lg border border-gray-200 w-full max-w-[820px] mx-auto p-[18px] sm:p-6 lg:p-8 shadow-sm">
//         <h2 className="text-xl font-semibold text-gray-900 mb-6">
//           {initialData ? "Edit Customer" : "New Customer"}
//         </h2>

//         <form onSubmit={handleSubmit} noValidate>

//           {/* Customer Type */}
//           <div className={rowClass}>
//             <label className={labelClass}>Customer Type</label>
//             <div className="flex gap-5">
//               {["Business", "Individual"].map((t) => (
//                 <label key={t} className="flex items-center gap-1.5 cursor-pointer text-[13.5px]">
//                   <input
//                     type="radio"
//                     name="customer_type"
//                     value={t}
//                     checked={customerType === t}
//                     onChange={() => setCustomerType(t)}
//                     className="accent-blue-500"
//                   />
//                   {t}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Primary Contact */}
//           <div className={rowClass}>
//             <label className={labelClass}>Primary Contact</label>
//             <div className="flex flex-col md:flex-row gap-2 flex-wrap w-full">
//               <select
//                 value={salutation}
//                 onChange={(e: ChangeEvent<HTMLSelectElement>) => setSalutation(e.target.value)}
//                 className={`${inputBase} w-full md:w-[90px]`}
//               >
//                 {SALUTATIONS.map((s) => <option key={s}>{s}</option>)}
//               </select>

//               <div className="flex flex-col gap-[3px] w-full md:w-[160px]">
//                 <input
//                   placeholder="First Name"
//                   value={firstName}
//                   onChange={(e) => { setFirstName(e.target.value); setErrors(p => ({...p, firstName: ""})); }}
//                   className={`${inputBase} w-full ${errors.firstName ? inputError : ""}`}
//                 />
//                 {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}
//               </div>

//               <div className="flex flex-col gap-[3px] w-full md:w-[160px]">
//                 <input
//                   placeholder="Last Name"
//                   value={lastName}
//                   onChange={(e) => { setLastName(e.target.value); setErrors(p => ({...p, lastName: ""})); }}
//                   className={`${inputBase} w-full ${errors.lastName ? inputError : ""}`}
//                 />
//                 {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
//               </div>
//             </div>
//           </div>

//           {/* Company Name */}
//           {customerType === "Business" && (
//             <div className={rowClass}>
//               <label className={labelClass}>Company Name</label>
//               <input
//                 value={companyName}
//                 onChange={(e) => setCompanyName(e.target.value)}
//                 className={`${inputBase} w-full md:w-[280px]`}
//                 placeholder="e.g. Zylker Inc"
//               />
//             </div>
//           )}

//           {/* Display Name */}
//           <div className={rowClass}>
//             <label className={`${labelClass} after:content-['*'] after:text-red-500 after:ml-[3px]`}>
//               Customer Display Name <span className="text-gray-400 text-xs cursor-help">ⓘ</span>
//             </label>
//             <div className="flex flex-col gap-[3px] w-full md:w-[280px]">
//               <input
//                 value={displayName}
//                 onChange={(e) => { setDisplayName(e.target.value); setErrors(p => ({...p, displayName: ""})); }}
//                 className={`${inputBase} w-full ${errors.displayName ? inputError : ""}`}
//               />
//               {errors.displayName && <span className="text-red-500 text-xs">{errors.displayName}</span>}
//             </div>
//           </div>

//           {/* Email */}
//           <div className={rowClass}>
//             <label className={labelClass}>Customer Email *</label>
//             <div className="flex flex-col gap-[3px] w-full md:w-[280px]">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => { setEmail(e.target.value); setErrors(p => ({...p, email: ""})); }}
//                 placeholder="email@example.com"
//                 className={`${inputBase} w-full ${errors.email ? inputError : ""}`}
//               />
//               {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
//             </div>
//           </div>

//           {/* Phone */}
//           <div className={rowClass}>
//             <label className={labelClass}>Customer Phone</label>
//             <div className="flex flex-col md:flex-row gap-2 w-full">
//               <input
//                 value={phoneWork}
//                 onChange={(e) => setPhoneWork(e.target.value)}
//                 placeholder="Work Phone"
//                 className={`${inputBase} w-full md:w-[170px]`}
//               />
//               <input
//                 value={phoneMobile}
//                 onChange={(e) => setPhoneMobile(e.target.value)}
//                 placeholder="Mobile Phone"
//                 className={`${inputBase} w-full md:w-[170px]`}
//               />
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="flex gap-0 border-b-2 border-gray-200 my-6 overflow-x-auto">
//             {TABS.map((tab) => (
//               <button
//                 key={tab}
//                 type="button"
//                 className={`bg-transparent border-none px-4 py-2.5 text-[13.5px] cursor-pointer border-b-2 -mb-0.5 whitespace-nowrap transition-colors ${
//                   activeTab === tab
//                     ? "text-blue-500 border-blue-500 font-medium"
//                     : "text-gray-500 border-transparent hover:text-blue-500"
//                 }`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {/* Tab: Other Details */}
//           {activeTab === "Other Details" && (
//             <div className="pb-2">
//               <div className={rowClass}>
//                 <label className={labelClass}>Currency</label>
//                 <select
//                   value={currency}
//                   onChange={(e) => setCurrency(e.target.value)}
//                   className={`${inputBase} w-full md:w-[280px]`}
//                 >
//                   {CURRENCIES.map((c) => (
//                     <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className={rowClass}>
//                 <label className={labelClass}>Operational Location</label>
//                 <input
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   placeholder="e.g. Sivakasi, Tamil Nadu"
//                   className={`${inputBase} w-full md:w-[280px]`}
//                 />
//               </div>
//               <div className={rowClass}>
//                 <label className={labelClass}>Tax Rule</label>
//                 <select
//                   value={taxRule}
//                   onChange={(e) => setTaxRule(e.target.value)}
//                   className={`${inputBase} w-full md:w-[280px]`}
//                 >
//                   {TAX_RULES.map((t) => <option key={t}>{t}</option>)}
//                 </select>
//               </div>
//             </div>
//           )}

//           {/* Tab: Address */}
//           {activeTab === "Address" && (
//             <div className="pb-2">
//               <div className={rowTopClass}>
//                 <label className={labelClass}>Billing Address</label>
//                 <textarea
//                   value={billingAddress}
//                   onChange={(e) => setBillingAddress(e.target.value)}
//                   rows={4}
//                   className={`${inputBase} w-full md:w-[380px] resize-y leading-relaxed`}
//                   placeholder="Street, City, State, ZIP, Country"
//                 />
//               </div>
//               <div className={rowTopClass}>
//                 <label className={labelClass}>Shipping Address</label>
//                 <textarea
//                   value={shippingAddress}
//                   onChange={(e) => setShippingAddress(e.target.value)}
//                   rows={4}
//                   className={`${inputBase} w-full md:w-[380px] resize-y leading-relaxed`}
//                   placeholder="Street, City, State, ZIP, Country"
//                 />
//               </div>
//             </div>
//           )}

//           {/* Tab: Remarks & placeholders */}
//           {(["Contact Persons", "Custom Fields", "Reporting Tags", "Remarks"] as TabName[]).includes(activeTab) && (
//             <div className="py-8 text-center text-gray-400">
//               <p>No {activeTab} added yet.</p>
//             </div>
//           )}

//           {/* Actions */}
//           <div className="flex flex-col sm:flex-row gap-2.5 mt-7 pt-5 border-t border-gray-100">
//             <button
//               type="submit"
//               disabled={false}
//               className="min-w-[110px] h-[42px] px-6 rounded-md text-sm font-semibold cursor-pointer transition-all w-full sm:w-auto bg-blue-600 text-white border border-blue-600 hover:bg-blue-700"
//             >
//               {initialData ? "Save Changes" : "Save"}
//             </button>
//             <button
//               type="button"
//               onClick={onCancel}
//               className="min-w-[110px] h-[42px] px-6 rounded-md text-sm font-semibold cursor-pointer transition-all w-full sm:w-auto bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default CustomerForm;

import React, { useState, useEffect, ChangeEvent } from "react";

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
// Shared Tailwind class fragments
// =============================================

const inputBase =
  "border border-gray-300 rounded-[5px] px-2.5 py-[7px] text-[13.5px] text-gray-900 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";
const inputError = "border-red-500";
const rowClass = "flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-4";
const rowTopClass = "flex flex-col md:flex-row md:items-start gap-2 md:gap-3 mb-4";
const labelClass = "w-full md:w-[180px] lg:w-[200px] md:min-w-[180px] lg:min-w-[200px] text-gray-600 text-[13.5px]";

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

  // ---- Auto-generate display_name (both create AND edit mode) ----
  // Previously this only ran for new customers (`!initialData`), so
  // changing the salutation/first/last name while editing an existing
  // customer never updated display_name — the list kept showing the old
  // "Mrs. Vicky A" even after saving "Dr." Now it stays in sync both ways.
  useEffect(() => {
    const computed = `${salutation} ${firstName} ${lastName}`.trim().replace(/\s+/g, " ");
    setDisplayName(computed);
  }, [salutation, firstName, lastName]);

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

    const finalCompanyName =
      customerType === "Individual"
        ? "Individual"
        : (companyName || null);

    onSubmit({
      customer_type: customerType,
      salutation: salutation || null,
      first_name: firstName || null,
      last_name: lastName || null,
      company_name: finalCompanyName,
      display_name: displayName,
      email,
      phone_work: phoneWork || null,
      phone_mobile: phoneMobile || null,
      currency,
      location: location || null,
      tax_rule: taxRule,
      billing_address: billingAddress,
      shipping_address: shippingAddress,
    });
  };

  // =============================================
  // Render
  // =============================================

  return (
    <div className="min-h-screen bg-[#f5f6f8] font-serif text-sm text-[#2d2d2d] p-4 sm:p-6">
      <div className="bg-white rounded-lg border border-gray-200 w-full max-w-[820px] mx-auto p-[18px] sm:p-6 lg:p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {initialData ? "Edit Customer" : "New Customer"}
        </h2>

        <form onSubmit={handleSubmit} noValidate>

          {/* Customer Type */}
          <div className={rowClass}>
            <label className={labelClass}>Customer Type</label>
            <div className="flex gap-5">
              {["Business", "Individual"].map((t) => (
                <label key={t} className="flex items-center gap-1.5 cursor-pointer text-[13.5px]">
                  <input
                    type="radio"
                    name="customer_type"
                    value={t}
                    checked={customerType === t}
                    onChange={() => setCustomerType(t)}
                    className="accent-blue-500"
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          {/* Primary Contact */}
          <div className={rowClass}>
            <label className={labelClass}>Primary Contact</label>
            <div className="flex flex-col md:flex-row gap-2 flex-wrap w-full">
              <select
                value={salutation}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSalutation(e.target.value)}
                className={`${inputBase} w-full md:w-[90px]`}
              >
                {SALUTATIONS.map((s) => <option key={s}>{s}</option>)}
              </select>

              <div className="flex flex-col gap-[3px] w-full md:w-[160px]">
                <input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); setErrors(p => ({...p, firstName: ""})); }}
                  className={`${inputBase} w-full ${errors.firstName ? inputError : ""}`}
                />
                {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}
              </div>

              <div className="flex flex-col gap-[3px] w-full md:w-[160px]">
                <input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); setErrors(p => ({...p, lastName: ""})); }}
                  className={`${inputBase} w-full ${errors.lastName ? inputError : ""}`}
                />
                {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
              </div>
            </div>
          </div>

          {/* Company Name */}
          {customerType === "Business" && (
            <div className={rowClass}>
              <label className={labelClass}>Company Name</label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={`${inputBase} w-full md:w-[280px]`}
                placeholder="e.g. Zylker Inc"
              />
            </div>
          )}

          {/* Display Name */}
          <div className={rowClass}>
            <label className={`${labelClass} after:content-['*'] after:text-red-500 after:ml-[3px]`}>
              Customer Display Name <span className="text-gray-400 text-xs cursor-help">ⓘ</span>
            </label>
            <div className="flex flex-col gap-[3px] w-full md:w-[280px]">
              <input
                value={displayName}
                onChange={(e) => { setDisplayName(e.target.value); setErrors(p => ({...p, displayName: ""})); }}
                className={`${inputBase} w-full ${errors.displayName ? inputError : ""}`}
              />
              {errors.displayName && <span className="text-red-500 text-xs">{errors.displayName}</span>}
            </div>
          </div>

          {/* Email */}
          <div className={rowClass}>
            <label className={labelClass}>Customer Email *</label>
            <div className="flex flex-col gap-[3px] w-full md:w-[280px]">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(p => ({...p, email: ""})); }}
                placeholder="email@example.com"
                className={`${inputBase} w-full ${errors.email ? inputError : ""}`}
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
            </div>
          </div>

          {/* Phone */}
          <div className={rowClass}>
            <label className={labelClass}>Customer Phone</label>
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <input
                value={phoneWork}
                onChange={(e) => setPhoneWork(e.target.value)}
                placeholder="Work Phone"
                className={`${inputBase} w-full md:w-[170px]`}
              />
              <input
                value={phoneMobile}
                onChange={(e) => setPhoneMobile(e.target.value)}
                placeholder="Mobile Phone"
                className={`${inputBase} w-full md:w-[170px]`}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border-b-2 border-gray-200 my-6 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`bg-transparent border-none px-4 py-2.5 text-[13.5px] cursor-pointer border-b-2 -mb-0.5 whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "text-blue-500 border-blue-500 font-medium"
                    : "text-gray-500 border-transparent hover:text-blue-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab: Other Details */}
          {activeTab === "Other Details" && (
            <div className="pb-2">
              <div className={rowClass}>
                <label className={labelClass}>Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className={`${inputBase} w-full md:w-[280px]`}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>
                  ))}
                </select>
              </div>
              <div className={rowClass}>
                <label className={labelClass}>Operational Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Sivakasi, Tamil Nadu"
                  className={`${inputBase} w-full md:w-[280px]`}
                />
              </div>
              <div className={rowClass}>
                <label className={labelClass}>Tax Rule</label>
                <select
                  value={taxRule}
                  onChange={(e) => setTaxRule(e.target.value)}
                  className={`${inputBase} w-full md:w-[280px]`}
                >
                  {TAX_RULES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Tab: Address */}
          {activeTab === "Address" && (
            <div className="pb-2">
              <div className={rowTopClass}>
                <label className={labelClass}>Billing Address</label>
                <textarea
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  rows={4}
                  className={`${inputBase} w-full md:w-[380px] resize-y leading-relaxed`}
                  placeholder="Street, City, State, ZIP, Country"
                />
              </div>
              <div className={rowTopClass}>
                <label className={labelClass}>Shipping Address</label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  rows={4}
                  className={`${inputBase} w-full md:w-[380px] resize-y leading-relaxed`}
                  placeholder="Street, City, State, ZIP, Country"
                />
              </div>
            </div>
          )}

          {/* Tab: Remarks & placeholders */}
          {(["Contact Persons", "Custom Fields", "Reporting Tags", "Remarks"] as TabName[]).includes(activeTab) && (
            <div className="py-8 text-center text-gray-400">
              <p>No {activeTab} added yet.</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2.5 mt-7 pt-5 border-t border-gray-100">
            <button
              type="submit"
              disabled={false}
              className="min-w-[110px] h-[42px] px-6 rounded-md text-sm font-semibold cursor-pointer transition-all w-full sm:w-auto bg-blue-600 text-white border border-blue-600 hover:bg-blue-700"
            >
              {initialData ? "Save Changes" : "Save"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="min-w-[110px] h-[42px] px-6 rounded-md text-sm font-semibold cursor-pointer transition-all w-full sm:w-auto bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
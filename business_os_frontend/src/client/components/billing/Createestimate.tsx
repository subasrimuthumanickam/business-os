// // import React, { useEffect, useState, useRef } from "react";
// // import "./Createestimate.css";

// // interface EstimateItem {
// //   item_name: string;
// //   quantity: number;
// //   rate: number;
// //   amount: number;
// // }

// // interface CustomerOption {
// //   id: number;
// //   display_name: string;
// //   email: string;
// // }

// // interface CreateEstimateProps {
// //   customer: any;
// //   onClose: () => void;
// // }

// // const CreateEstimate: React.FC<CreateEstimateProps> = ({ customer, onClose }) => {
// //   const getTodayDate = () => new Date().toISOString().split("T")[0];
// //   const getExpiryDate = () => {
// //     const date = new Date();
// //     date.setDate(date.getDate() + 15);
// //     return date.toISOString().split("T")[0];
// //   };

// //   const [estimateNumber, setEstimateNumber] = useState("");
// //   const [estimateDate, setEstimateDate] = useState(getTodayDate());
// //   const [expiryDate, setExpiryDate] = useState(getExpiryDate());

// //   // Customer search state
// //   const [customerSearch, setCustomerSearch] = useState("");
// //   const [customerId, setCustomerId] = useState<number | null>(null);
// //   const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const searchRef = useRef<HTMLDivElement>(null);

// //   const [items, setItems] = useState<EstimateItem[]>([
// //     { item_name: "", quantity: 1, rate: 0, amount: 0 },
// //   ]);

// //   useEffect(() => {
// //     generateEstimateNumber();

// //     const handleOutsideClick = (e: MouseEvent) => {
// //       if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
// //         setShowDropdown(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleOutsideClick);
// //     return () => document.removeEventListener("mousedown", handleOutsideClick);
// //   }, []);

// //   // Auto-fill customer from props
// //   useEffect(() => {
// //     if (customer) {
// //       setCustomerSearch(customer.name);
// //       setCustomerId(Number(customer.id));
// //     }
// //   }, [customer]);

// //   const generateEstimateNumber = () => {
// //     const random = Math.floor(10000 + Math.random() * 90000);
// //     setEstimateNumber(`EST-${random}`);
// //   };

// //   const handleCustomerSearch = async (value: string) => {
// //     setCustomerSearch(value);
// //     setCustomerId(null);

// //     if (value.trim().length < 1) {
// //       setCustomerOptions([]);
// //       setShowDropdown(false);
// //       return;
// //     }

// //     try {
// //       const res = await fetch(
// //         `http://localhost:5000/api/customers/search?q=${encodeURIComponent(value)}`
// //       );
// //       const data = await res.json();
// //       if (data.success) {
// //         setCustomerOptions(data.data);
// //         setShowDropdown(true);
// //       }
// //     } catch (err) {
// //       console.error("Customer search failed:", err);
// //     }
// //   };

// //   const handleSelectCustomer = (customer: CustomerOption) => {
// //     setCustomerSearch(customer.display_name);
// //     setCustomerId(customer.id);
// //     setCustomerOptions([]);
// //     setShowDropdown(false);
// //   };

// //   const handleItemChange = (
// //     index: number,
// //     field: keyof EstimateItem,
// //     value: string | number
// //   ) => {
// //     const updatedItems = [...items];
// //     updatedItems[index] = {
// //       ...updatedItems[index],
// //       [field]: field === "item_name" ? value : Number(value),
// //     };
// //     updatedItems[index].amount =
// //       updatedItems[index].quantity * updatedItems[index].rate;
// //     setItems(updatedItems);
// //   };

// //   const addItem = () => {
// //     setItems([...items, { item_name: "", quantity: 1, rate: 0, amount: 0 }]);
// //   };

// //   const removeItem = (index: number) => {
// //     setItems(items.filter((_, i) => i !== index));
// //   };

// //   const subtotal = items.reduce((total, item) => total + item.amount, 0);
// //   const tax = subtotal * 0.18;
// //   const grandTotal = subtotal + tax;

// //   const handleSave = async () => {
// //     if (!customerId) {
// //       alert("Please select a valid customer from the dropdown.");
// //       return;
// //     }

// //     const payload = {
// //       customer_id: customerId,
// //       estimate_number: estimateNumber,
// //       estimate_date: estimateDate,
// //       expiry_date: expiryDate,
// //       status: "Draft",
// //       subtotal,
// //       tax,
// //       total: grandTotal,
// //       items,
// //     };

// //     try {
// //       const response = await fetch("http://localhost:5000/api/estimates/create", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         alert("Estimate Created Successfully!");
// //         generateEstimateNumber();
// //         setCustomerSearch("");
// //         setCustomerId(null);
// //         setItems([{ item_name: "", quantity: 1, rate: 0, amount: 0 }]);
// //       } else {
// //         alert(data.message || "Failed to Save Estimate");
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       alert("Server Connection Failed");
// //     }
// //   };

// //   return (
// //   <div className="estimate-page">
// //     {/* Header */}
// //     <div className="estimate-topbar">
// //       <h2>Create Estimate</h2>

// //       <div className="topbar-actions">
// //         <button className="draft-btn">Save as Draft</button>
// //         <button className="save-btn" onClick={handleSave}>
// //           Save Estimate
// //         </button>
// //         <button className="cancel-btn" onClick={onClose}>
// //           Cancel
// //         </button>
// //       </div>
// //     </div>

// //     <div className="estimate-container">

// //       {/* Customer + Estimate Details */}
// //       <div className="estimate-header-grid">

// //         {/* Customer Section */}
// //         <div className="section-card">
// //           <h3>Customer Details</h3>

// //           <div className="form-group">
// //             <label>Customer Name</label>

// //             <input
// //               type="text"
// //               placeholder="Search customer..."
// //               value={customerSearch}
// //               onChange={(e) =>
// //                 handleCustomerSearch(e.target.value)
// //               }
// //             />
// //           </div>

// //           <div className="form-group">
// //             <label>Email</label>
// //             <input type="text" readOnly />
// //           </div>

// //           <div className="form-group">
// //             <label>Billing Address</label>
// //             <textarea rows={4}></textarea>
// //           </div>
// //         </div>

// //         {/* Estimate Info */}
// //         <div className="section-card">
// //           <h3>Estimate Information</h3>

// //           <div className="form-group">
// //             <label>Estimate Number</label>
// //             <input value={estimateNumber} readOnly />
// //           </div>

// //           <div className="form-group">
// //             <label>Estimate Date</label>

// //             <input
// //               type="date"
// //               value={estimateDate}
// //               onChange={(e) =>
// //                 setEstimateDate(e.target.value)
// //               }
// //             />
// //           </div>

// //           <div className="form-group">
// //             <label>Expiry Date</label>

// //             <input
// //               type="date"
// //               value={expiryDate}
// //               onChange={(e) =>
// //                 setExpiryDate(e.target.value)
// //               }
// //             />
// //           </div>

// //           <div className="form-group">
// //             <label>Status</label>

// //             <select>
// //               <option>Draft</option>
// //               <option>Sent</option>
// //               <option>Accepted</option>
// //               <option>Rejected</option>
// //             </select>
// //           </div>
// //         </div>

// //       </div>

// //       {/* Items Table */}
// //       <div className="table-card">

// //         <table className="items-table">
// //           <thead>
// //             <tr>
// //               <th>Item Name</th>
// //               <th>Description</th>
// //               <th>Qty</th>
// //               <th>Rate</th>
// //               <th>Amount</th>
// //               <th></th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {items.map((item, index) => (
// //               <tr key={index}>

// //                 <td>
// //                   <input
// //                     value={item.item_name}
// //                     onChange={(e) =>
// //                       handleItemChange(
// //                         index,
// //                         "item_name",
// //                         e.target.value
// //                       )
// //                     }
// //                   />
// //                 </td>

// //                 <td>
// //                   <input placeholder="Description" />
// //                 </td>

// //                 <td>
// //                   <input
// //                     type="number"
// //                     value={item.quantity}
// //                     onChange={(e) =>
// //                       handleItemChange(
// //                         index,
// //                         "quantity",
// //                         e.target.value
// //                       )
// //                     }
// //                   />
// //                 </td>

// //                 <td>
// //                   <input
// //                     type="number"
// //                     value={item.rate}
// //                     onChange={(e) =>
// //                       handleItemChange(
// //                         index,
// //                         "rate",
// //                         e.target.value
// //                       )
// //                     }
// //                   />
// //                 </td>

// //                 <td>
// //                   ₹{item.amount.toFixed(2)}
// //                 </td>

// //                 <td>
// //                   <button
// //                     className="remove-btn"
// //                     onClick={() => removeItem(index)}
// //                   >
// //                     Remove
// //                   </button>
// //                 </td>

// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>

// //         <button className="add-item-btn" onClick={addItem}>
// //           + Add Item
// //         </button>

// //       </div>

// //       {/* Bottom Section */}
// //       <div className="bottom-grid">

// //         <div className="notes-section section-card">

// //           <h3>Customer Notes</h3>
// //           <textarea rows={5}></textarea>

// //           <h3>Terms & Conditions</h3>
// //           <textarea rows={5}></textarea>

// //         </div>

// //         <div className="summary-card">

// //           <div className="summary-row">
// //             <span>Subtotal</span>
// //             <span>₹{subtotal.toFixed(2)}</span>
// //           </div>

// //           <div className="summary-row">
// //             <span>GST (18%)</span>
// //             <span>₹{tax.toFixed(2)}</span>
// //           </div>

// //           <div className="summary-row total">
// //             <span>Total</span>
// //             <span>₹{grandTotal.toFixed(2)}</span>
// //           </div>

// //         </div>

// //       </div>

// //     </div>
// //   </div>
// // );
// // };

// // export default CreateEstimate;

// import React, { useEffect, useState, useRef } from "react";
// import "./Createestimate.css";

// interface EstimateItem {
//   product_id?: number | null;
//   item_name: string;
//   description: string;
//   quantity: number;
//   rate: number;
//   discount_percent: number;
//   tax_rate_id: number | null;
//   amount: number;
// }

// interface CustomerOption {
//   id: number;
//   display_name: string;
//   email: string;
// }

// interface SalespersonOption {
//   id: number;
//   name: string;
// }

// interface ProjectOption {
//   id: number;
//   name: string;
// }

// interface PriceListOption {
//   id: number;
//   name: string;
// }

// interface TaxRateOption {
//   id: number;
//   name: string;
//   rate_percent: number;
// }

// interface CreateEstimateProps {
//   customer: any;
//   onClose: () => void;
// }

// const API = "http://localhost:5000/api";

// const emptyItem = (): EstimateItem => ({
//   product_id: null,
//   item_name: "",
//   description: "",
//   quantity: 1,
//   rate: 0,
//   discount_percent: 0,
//   tax_rate_id: null,
//   amount: 0,
// });

// const CreateEstimate: React.FC<CreateEstimateProps> = ({ customer, onClose }) => {
//   const getTodayDate = () => new Date().toISOString().split("T")[0];
//   const getExpiryDate = () => {
//     const date = new Date();
//     date.setDate(date.getDate() + 15);
//     return date.toISOString().split("T")[0];
//   };

//   const [estimateNumber, setEstimateNumber] = useState("");
//   const [referenceNumber, setReferenceNumber] = useState("");
//   const [estimateDate, setEstimateDate] = useState(getTodayDate());
//   const [expiryDate, setExpiryDate] = useState(getExpiryDate());
//   const [notes, setNotes] = useState("");
//   const [termsConditions, setTermsConditions] = useState("");

//   // Customer search state
//   const [customerSearch, setCustomerSearch] = useState("");
//   const [customerId, setCustomerId] = useState<number | null>(null);
//   const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const searchRef = useRef<HTMLDivElement>(null);

//   // New dropdown options
//   const [salespersons, setSalespersons] = useState<SalespersonOption[]>([]);
//   const [projects, setProjects] = useState<ProjectOption[]>([]);
//   const [priceLists, setPriceLists] = useState<PriceListOption[]>([]);
//   const [taxRates, setTaxRates] = useState<TaxRateOption[]>([]);

//   const [salespersonId, setSalespersonId] = useState<number | null>(null);
//   const [projectId, setProjectId] = useState<number | null>(null);
//   const [priceListId, setPriceListId] = useState<number | null>(null);

//   const [shippingCharges, setShippingCharges] = useState(0);

//   const [items, setItems] = useState<EstimateItem[]>([emptyItem()]);

//   useEffect(() => {
//     generateEstimateNumber();
//     loadDropdownData();

//     const handleOutsideClick = (e: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => document.removeEventListener("mousedown", handleOutsideClick);
//   }, []);

//   // Auto-fill customer from props
//   useEffect(() => {
//     if (customer) {
//       setCustomerSearch(customer.name);
//       setCustomerId(Number(customer.id));
//     }
//   }, [customer]);

//   const loadDropdownData = async () => {
//     try {
//       const [usersRes, projectsRes, priceListsRes, taxRatesRes] = await Promise.all([
//         fetch(`${API}/users`),
//         fetch(`${API}/projects`),
//         fetch(`${API}/price-lists`),
//         fetch(`${API}/tax-rates`),
//       ]);

//       const usersData = await usersRes.json();
//       const projectsData = await projectsRes.json();
//       const priceListsData = await priceListsRes.json();
//       const taxRatesData = await taxRatesRes.json();

//       if (usersData.success) setSalespersons(usersData.data || []);
//       if (projectsData.success) setProjects(projectsData.data || []);
//       if (priceListsData.success) setPriceLists(priceListsData.data || []);
//       if (taxRatesData.success) setTaxRates(taxRatesData.data || []);
//     } catch (err) {
//       console.error("Failed to load dropdown data:", err);
//     }
//   };

//   const generateEstimateNumber = () => {
//     const random = Math.floor(10000 + Math.random() * 90000);
//     setEstimateNumber(`EST-${random}`);
//   };

//   const handleCustomerSearch = async (value: string) => {
//     setCustomerSearch(value);
//     setCustomerId(null);

//     if (value.trim().length < 1) {
//       setCustomerOptions([]);
//       setShowDropdown(false);
//       return;
//     }

//     try {
//       const res = await fetch(
//         `${API}/customers/search?q=${encodeURIComponent(value)}`
//       );
//       const data = await res.json();
//       if (data.success) {
//         setCustomerOptions(data.data);
//         setShowDropdown(true);
//       }
//     } catch (err) {
//       console.error("Customer search failed:", err);
//     }
//   };

//   const handleSelectCustomer = (customer: CustomerOption) => {
//     setCustomerSearch(customer.display_name);
//     setCustomerId(customer.id);
//     setCustomerOptions([]);
//     setShowDropdown(false);
//   };

//   // Computes the line amount: (qty * rate) minus discount%, tax is shown
//   // separately per line but rolled into the overall tax total at the bottom.
//   const computeLineAmount = (item: EstimateItem) => {
//     const base = item.quantity * item.rate;
//     const afterDiscount = base - (base * (item.discount_percent || 0)) / 100;
//     return afterDiscount;
//   };

//   const handleItemChange = (
//     index: number,
//     field: keyof EstimateItem,
//     value: string | number | null
//   ) => {
//     const updatedItems = [...items];
//     const numericFields: (keyof EstimateItem)[] = ["quantity", "rate", "discount_percent"];

//     updatedItems[index] = {
//       ...updatedItems[index],
//       [field]: numericFields.includes(field) ? Number(value) : value,
//     } as EstimateItem;

//     updatedItems[index].amount = computeLineAmount(updatedItems[index]);
//     setItems(updatedItems);
//   };

//   const handleItemTaxChange = (index: number, taxRateId: string) => {
//     const updatedItems = [...items];
//     updatedItems[index].tax_rate_id = taxRateId ? Number(taxRateId) : null;
//     setItems(updatedItems);
//   };

//   const addItem = () => {
//     setItems([...items, emptyItem()]);
//   };

//   const removeItem = (index: number) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   // Subtotal = sum of line amounts (already discount-adjusted)
//   const subtotal = items.reduce((total, item) => total + item.amount, 0);

//   // Tax = sum of each line's tax (based on its own tax rate, applied to its discounted amount)
//   const totalTax = items.reduce((total, item) => {
//     const rate = taxRates.find((t) => t.id === item.tax_rate_id);
//     const pct = rate ? rate.rate_percent : 0;
//     return total + (item.amount * pct) / 100;
//   }, 0);

//   const grandTotal = subtotal + totalTax + (Number(shippingCharges) || 0);

//   const resetForm = () => {
//     generateEstimateNumber();
//     setReferenceNumber("");
//     setCustomerSearch("");
//     setCustomerId(null);
//     setSalespersonId(null);
//     setProjectId(null);
//     setPriceListId(null);
//     setShippingCharges(0);
//     setNotes("");
//     setTermsConditions("");
//     setItems([emptyItem()]);
//   };

//   const buildPayload = (status: string) => ({
//     customer_id: customerId,
//     estimate_number: estimateNumber,
//     reference_number: referenceNumber || null,
//     salesperson_id: salespersonId,
//     project_id: projectId,
//     price_list_id: priceListId,
//     estimate_date: estimateDate,
//     expiry_date: expiryDate,
//     status,
//     subtotal,
//     tax: totalTax,
//     shipping_charges: shippingCharges,
//     total: grandTotal,
//     notes,
//     items: items.map((item) => ({
//       product_id: item.product_id || null,
//       item_name: item.item_name,
//       description: item.description,
//       quantity: item.quantity,
//       rate: item.rate,
//       discount_percent: item.discount_percent,
//       tax_rate_id: item.tax_rate_id,
//       amount: item.amount,
//     })),
//   });

//   const submitEstimate = async (status: string) => {
//     if (!customerId) {
//       alert("Please select a valid customer from the dropdown.");
//       return;
//     }

//     try {
//       const response = await fetch(`${API}/estimates/create`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(buildPayload(status)),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert(status === "Draft" ? "Estimate saved as draft!" : "Estimate Created Successfully!");
//         resetForm();
//       } else {
//         alert(data.message || "Failed to Save Estimate");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Server Connection Failed");
//     }
//   };

//   return (
//     <div className="estimate-page">
//       {/* Header */}
//       <div className="estimate-topbar">
//         <h2>Create Estimate</h2>

//         <div className="topbar-actions">
//           <button className="draft-btn" onClick={() => submitEstimate("Draft")}>
//             Save as Draft
//           </button>
//           <button className="save-btn" onClick={() => submitEstimate("Sent")}>
//             Save Estimate
//           </button>
//           <button className="cancel-btn" onClick={onClose}>
//             Cancel
//           </button>
//         </div>
//       </div>

//       <div className="estimate-container">
//         {/* Customer + Estimate Details */}
//         <div className="estimate-header-grid">
//           {/* Customer Section */}
//           <div className="section-card">
//             <h3>Customer Details</h3>

//             <div className="form-group" ref={searchRef} style={{ position: "relative" }}>
//               <label>Customer Name</label>
//               <input
//                 type="text"
//                 placeholder="Search customer..."
//                 value={customerSearch}
//                 onChange={(e) => handleCustomerSearch(e.target.value)}
//               />
//               {showDropdown && customerOptions.length > 0 && (
//                 <ul className="customer-dropdown">
//                   {customerOptions.map((opt) => (
//                     <li
//                       key={opt.id}
//                       className="customer-dropdown-item"
//                       onClick={() => handleSelectCustomer(opt)}
//                     >
//                       <span className="dropdown-name">{opt.display_name}</span>
//                       <span className="dropdown-email">{opt.email}</span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             <div className="form-group">
//               <label>Email</label>
//               <input type="text" value={customer?.email || ""} readOnly />
//             </div>

//             <div className="form-group">
//               <label>Billing Address</label>
//               <textarea rows={4} defaultValue={customer?.billing_address || ""}></textarea>
//             </div>
//           </div>

//           {/* Estimate Info */}
//           <div className="section-card">
//             <h3>Estimate Information</h3>

//             <div className="form-group">
//               <label>Estimate Number</label>
//               <input value={estimateNumber} readOnly />
//             </div>

//             <div className="form-group">
//               <label>Reference#</label>
//               <input
//                 type="text"
//                 placeholder="Optional reference number"
//                 value={referenceNumber}
//                 onChange={(e) => setReferenceNumber(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label>Estimate Date</label>
//               <input
//                 type="date"
//                 value={estimateDate}
//                 onChange={(e) => setEstimateDate(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label>Expiry Date</label>
//               <input
//                 type="date"
//                 value={expiryDate}
//                 onChange={(e) => setExpiryDate(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label>Salesperson</label>
//               <select
//                 value={salespersonId ?? ""}
//                 onChange={(e) => setSalespersonId(e.target.value ? Number(e.target.value) : null)}
//               >
//                 <option value="">Select or Add Salesperson</option>
//                 {salespersons.map((sp) => (
//                   <option key={sp.id} value={sp.id}>{sp.name}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Project Name</label>
//               <select
//                 value={projectId ?? ""}
//                 onChange={(e) => setProjectId(e.target.value ? Number(e.target.value) : null)}
//               >
//                 <option value="">Select a project</option>
//                 {projects.map((p) => (
//                   <option key={p.id} value={p.id}>{p.name}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Price List</label>
//               <select
//                 value={priceListId ?? ""}
//                 onChange={(e) => setPriceListId(e.target.value ? Number(e.target.value) : null)}
//               >
//                 <option value="">Select a price list</option>
//                 {priceLists.map((pl) => (
//                   <option key={pl.id} value={pl.id}>{pl.name}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Items Table */}
//         <div className="table-card">
//           <table className="items-table">
//             <thead>
//               <tr>
//                 <th>Item Name</th>
//                 <th>Description</th>
//                 <th>Qty</th>
//                 <th>Rate</th>
//                 <th>Discount %</th>
//                 <th>Tax</th>
//                 <th>Amount</th>
//                 <th></th>
//               </tr>
//             </thead>

//             <tbody>
//               {items.map((item, index) => (
//                 <tr key={index}>
//                   <td>
//                     <input
//                       value={item.item_name}
//                       onChange={(e) => handleItemChange(index, "item_name", e.target.value)}
//                     />
//                   </td>

//                   <td>
//                     <input
//                       placeholder="Description"
//                       value={item.description}
//                       onChange={(e) => handleItemChange(index, "description", e.target.value)}
//                     />
//                   </td>

//                   <td>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
//                     />
//                   </td>

//                   <td>
//                     <input
//                       type="number"
//                       value={item.rate}
//                       onChange={(e) => handleItemChange(index, "rate", e.target.value)}
//                     />
//                   </td>

//                   <td>
//                     <input
//                       type="number"
//                       value={item.discount_percent}
//                       onChange={(e) => handleItemChange(index, "discount_percent", e.target.value)}
//                     />
//                   </td>

//                   <td>
//                     <select
//                       value={item.tax_rate_id ?? ""}
//                       onChange={(e) => handleItemTaxChange(index, e.target.value)}
//                     >
//                       <option value="">Select a Tax</option>
//                       {taxRates.map((t) => (
//                         <option key={t.id} value={t.id}>{t.name}</option>
//                       ))}
//                     </select>
//                   </td>

//                   <td>₹{item.amount.toFixed(2)}</td>

//                   <td>
//                     <button className="remove-btn" onClick={() => removeItem(index)}>
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <button className="add-item-btn" onClick={addItem}>
//             + Add Item
//           </button>
//         </div>

//         {/* Bottom Section */}
//         <div className="bottom-grid">
//           <div className="notes-section section-card">
//             <h3>Customer Notes</h3>
//             <textarea rows={5} value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>

//             <h3>Terms &amp; Conditions</h3>
//             <textarea
//               rows={5}
//               value={termsConditions}
//               onChange={(e) => setTermsConditions(e.target.value)}
//             ></textarea>
//           </div>

//           <div className="summary-card">
//             <div className="summary-row">
//               <span>Subtotal</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>

//             <div className="summary-row">
//               <span>Tax</span>
//               <span>₹{totalTax.toFixed(2)}</span>
//             </div>

//             <div className="summary-row">
//               <span>Shipping Charges</span>
//               <input
//                 type="number"
//                 className="shipping-input"
//                 value={shippingCharges}
//                 onChange={(e) => setShippingCharges(Number(e.target.value))}
//               />
//             </div>

//             <div className="summary-row total">
//               <span>Total</span>
//               <span>₹{grandTotal.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateEstimate;

import React, { useEffect, useState, useRef } from "react";
import "./Createestimate.css";

interface EstimateItem {
  product_id?: number | null;
  item_name: string;
  description: string;
  quantity: number;
  rate: number;
  discount_percent: number;
  tax_rate_id: number | null;
  amount: number;
}

interface CustomerOption {
  id: number;
  display_name: string;
  email: string;
}

interface SalespersonOption {
  id: number;
  name: string;
}

interface ProjectOption {
  id: number;
  name: string;
}

interface PriceListOption {
  id: number;
  name: string;
}

interface TaxRateOption {
  id: number;
  name: string;
  rate_percent: number;
}

interface CreateEstimateProps {
  customer: any;
  onClose: () => void;
}

const API = "http://localhost:5000/api";

const emptyItem = (): EstimateItem => ({
  product_id: null,
  item_name: "",
  description: "",
  quantity: 1,
  rate: 0,
  discount_percent: 0,
  tax_rate_id: null,
  amount: 0,
});

const CreateEstimate: React.FC<CreateEstimateProps> = ({ customer, onClose }) => {
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const [estimateNumber, setEstimateNumber] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [estimateDate, setEstimateDate] = useState(getTodayDate());
  const [expiryDate, setExpiryDate] = useState("");
  const [notes, setNotes] = useState("");
  const [termsConditions, setTermsConditions] = useState("");

  const [customerSearch, setCustomerSearch] = useState("");
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [salespersons, setSalespersons] = useState<SalespersonOption[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [priceLists, setPriceLists] = useState<PriceListOption[]>([]);
  const [taxRates, setTaxRates] = useState<TaxRateOption[]>([]);

  const [salespersonId, setSalespersonId] = useState<number | null>(null);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [priceListId, setPriceListId] = useState<number | null>(null);

  const [shippingCharges, setShippingCharges] = useState(0);

  const [items, setItems] = useState<EstimateItem[]>([emptyItem()]);

  useEffect(() => {
    generateEstimateNumber();
    loadDropdownData();

    const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (customer) {
      setCustomerSearch(customer.name);
      setCustomerId(Number(customer.id));
    }
  }, [customer]);

  const loadDropdownData = async () => {
    try {
      const [usersRes, projectsRes, priceListsRes, taxRatesRes] = await Promise.all([
        fetch(`${API}/users`),
        fetch(`${API}/projects`),
        fetch(`${API}/price-lists`),
        fetch(`${API}/tax-rates`),
      ]);

      const usersData = await usersRes.json();
      const projectsData = await projectsRes.json();
      const priceListsData = await priceListsRes.json();
      const taxRatesData = await taxRatesRes.json();

      if (usersData.success) setSalespersons(usersData.data || []);
      if (projectsData.success) setProjects(projectsData.data || []);
      if (priceListsData.success) setPriceLists(priceListsData.data || []);
      if (taxRatesData.success) setTaxRates(taxRatesData.data || []);
    } catch (err) {
      console.error("Failed to load dropdown data:", err);
    }
  };

  const generateEstimateNumber = () => {
    const random = Math.floor(10000 + Math.random() * 90000);
    setEstimateNumber(`EST-${random}`);
  };

  const handleCustomerSearch = async (value: string) => {
    setCustomerSearch(value);
    setCustomerId(null);

    if (value.trim().length < 1) {
      setCustomerOptions([]);
      setShowDropdown(false);
      return;
    }

    try {
      const res = await fetch(`${API}/customers/search?q=${encodeURIComponent(value)}`);
      const data = await res.json();
      if (data.success) {
        setCustomerOptions(data.data);
        setShowDropdown(true);
      }
    } catch (err) {
      console.error("Customer search failed:", err);
    }
  };

  const handleSelectCustomer = (customer: CustomerOption) => {
    setCustomerSearch(customer.display_name);
    setCustomerId(customer.id);
    setCustomerOptions([]);
    setShowDropdown(false);
  };

  const computeLineAmount = (item: EstimateItem) => {
    const base = item.quantity * item.rate;
    const afterDiscount = base - (base * (item.discount_percent || 0)) / 100;
    return afterDiscount;
  };

  const handleItemChange = (
    index: number,
    field: keyof EstimateItem,
    value: string | number | null
  ) => {
    const updatedItems = [...items];
    const numericFields: (keyof EstimateItem)[] = ["quantity", "rate", "discount_percent"];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]: numericFields.includes(field) ? Number(value) : value,
    } as EstimateItem;

    updatedItems[index].amount = computeLineAmount(updatedItems[index]);
    setItems(updatedItems);
  };

  const handleItemTaxChange = (index: number, taxRateId: string) => {
    const updatedItems = [...items];
    updatedItems[index].tax_rate_id = taxRateId ? Number(taxRateId) : null;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, emptyItem()]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((total, item) => total + item.amount, 0);

  const totalTax = items.reduce((total, item) => {
    const rate = taxRates.find((t) => t.id === item.tax_rate_id);
    const pct = rate ? rate.rate_percent : 0;
    return total + (item.amount * pct) / 100;
  }, 0);

  const grandTotal = subtotal + totalTax + (Number(shippingCharges) || 0);

  const resetForm = () => {
    generateEstimateNumber();
    setReferenceNumber("");
    setCustomerSearch("");
    setCustomerId(null);
    setSalespersonId(null);
    setProjectId(null);
    setPriceListId(null);
    setShippingCharges(0);
    setNotes("");
    setTermsConditions("");
    setExpiryDate("");
    setItems([emptyItem()]);
  };

  const buildPayload = (status: string) => ({
    customer_id: customerId,
    estimate_number: estimateNumber,
    reference_number: referenceNumber || null,
    salesperson_id: salespersonId,
    project_id: projectId,
    price_list_id: priceListId,
    estimate_date: estimateDate,
    expiry_date: expiryDate || null,
    status,
    subtotal,
    tax: totalTax,
    shipping_charges: shippingCharges,
    total: grandTotal,
    notes,
    items: items.map((item) => ({
      product_id: item.product_id || null,
      item_name: item.item_name,
      description: item.description,
      quantity: item.quantity,
      rate: item.rate,
      discount_percent: item.discount_percent,
      tax_rate_id: item.tax_rate_id,
      amount: item.amount,
    })),
  });

  const submitEstimate = async (status: string) => {
    if (!customerId) {
      alert("Please select a valid customer from the dropdown.");
      return;
    }

    try {
      const response = await fetch(`${API}/estimates/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(status)),
      });

      const data = await response.json();

      if (response.ok) {
        alert(status === "Draft" ? "Estimate saved as draft!" : "Estimate Created Successfully!");
        resetForm();
      } else {
        alert(data.message || "Failed to Save Estimate");
      }
    } catch (error) {
      console.error(error);
      alert("Server Connection Failed");
    }
  };

  return (
    <div className="zest-page">
      <div className="zest-titlebar">
        <h1><span className="zest-title-icon">⛁</span> New Estimate</h1>
        <div className="zest-titlebar-right">
          <span className="zest-pagetips">💡 Page Tips</span>
          <button className="zest-close" onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="zest-sheet">
        <div className="zest-row">
          <label className="zest-label zest-required">Customer Name</label>
          <div className="zest-row-field">
            <div className="zest-customer-search" ref={searchRef}>
              <input
                type="text"
                placeholder="Search or select a customer"
                value={customerSearch}
                onChange={(e) => handleCustomerSearch(e.target.value)}
              />
              <button type="button" className="zest-search-btn">🔍</button>
              <span className="zest-currency-badge">{customer?.currency || "INR"}</span>

              {showDropdown && customerOptions.length > 0 && (
                <ul className="customer-dropdown">
                  {customerOptions.map((opt) => (
                    <li key={opt.id} className="customer-dropdown-item" onClick={() => handleSelectCustomer(opt)}>
                      <span className="dropdown-name">{opt.display_name}</span>
                      <span className="dropdown-email">{opt.email}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="zest-quicklinks">
              <span>📄 Unpaid Invoices</span>
              <span className="zest-quicklink-sep">|</span>
              <span>👤 View Customer Details</span>
            </div>

            <div className="zest-address-row">
              <div>
                <span className="zest-subtle-label">BILLING ADDRESS</span>
                <a href="#" onClick={(e) => e.preventDefault()}>Add new address</a>
              </div>
              <div>
                <span className="zest-subtle-label">SHIPPING ADDRESS</span>
                <a href="#" onClick={(e) => e.preventDefault()}>Add new address</a>
              </div>
            </div>
          </div>
        </div>

        <hr className="zest-divider" />

        <div className="zest-row">
          <label className="zest-label zest-required">Estimate#</label>
          <div className="zest-row-field zest-inline-field">
            <input value={estimateNumber} readOnly className="zest-input-md" />
            <span className="zest-gear" title="Configure number series">⚙</span>
          </div>
        </div>

        <div className="zest-row">
          <label className="zest-label">Reference#</label>
          <div className="zest-row-field">
            <input
              type="text"
              placeholder="Optional reference number"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              className="zest-input-md"
            />
          </div>
        </div>

        <div className="zest-row zest-row-split">
          <div className="zest-split-col">
            <label className="zest-label zest-required">Estimate Date</label>
            <input
              type="date"
              value={estimateDate}
              onChange={(e) => setEstimateDate(e.target.value)}
              className="zest-input-md"
            />
          </div>
          <div className="zest-split-col">
            <label className="zest-label">Expiry Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="zest-input-md"
            />
          </div>
        </div>

        <hr className="zest-divider" />

        <div className="zest-row">
          <label className="zest-label">Salesperson</label>
          <div className="zest-row-field">
            <select
              value={salespersonId ?? ""}
              onChange={(e) => setSalespersonId(e.target.value ? Number(e.target.value) : null)}
              className="zest-input-md"
            >
              <option value="">Select or Add Salesperson</option>
              {salespersons.map((sp) => (
                <option key={sp.id} value={sp.id}>{sp.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="zest-row">
          <label className="zest-label">Project Name</label>
          <div className="zest-row-field">
            <select
              value={projectId ?? ""}
              onChange={(e) => setProjectId(e.target.value ? Number(e.target.value) : null)}
              className="zest-input-md"
            >
              <option value="">Select a project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        <hr className="zest-divider" />

        <div className="zest-row zest-row-tight">
          <label className="zest-label">Price List</label>
          <div className="zest-row-field">
            <select
              value={priceListId ?? ""}
              onChange={(e) => setPriceListId(e.target.value ? Number(e.target.value) : null)}
              className="zest-pricelist-select"
            >
              <option value="">Select a price list</option>
              {priceLists.map((pl) => (
                <option key={pl.id} value={pl.id}>{pl.name}</option>
              ))}
            </select>
          </div>
        </div>

        <table className="zest-items-table">
          <thead>
            <tr>
              <th className="zest-col-item">Item Details</th>
              <th className="zest-col-qty">Quantity</th>
              <th className="zest-col-rate">Rate</th>
              <th className="zest-col-discount">Discount</th>
              <th className="zest-col-tax">Tax</th>
              <th className="zest-col-amount">Amount</th>
              <th className="zest-col-remove"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    placeholder="Type or click to select an item."
                    value={item.item_name}
                    onChange={(e) => handleItemChange(index, "item_name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                  />
                </td>
                <td>
                  <div className="zest-discount-cell">
                    <input
                      type="number"
                      value={item.discount_percent}
                      onChange={(e) => handleItemChange(index, "discount_percent", e.target.value)}
                    />
                    <span className="zest-percent-tag">%</span>
                  </div>
                </td>
                <td>
                  <select
                    value={item.tax_rate_id ?? ""}
                    onChange={(e) => handleItemTaxChange(index, e.target.value)}
                  >
                    <option value="">Select a Tax</option>
                    {taxRates.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </td>
                <td className="zest-amount-cell">{item.amount.toFixed(2)}</td>
                <td className="zest-remove-cell">
                  {items.length > 1 && (
                    <button className="zest-remove-btn" onClick={() => removeItem(index)} title="Remove">✕</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="zest-add-line-btn" onClick={addItem}>
          Add another line ▾
        </button>

        <hr className="zest-divider" />

        <div className="zest-bottom-grid">
          <div className="zest-notes-col">
            <div className="zest-row">
              <label className="zest-label">Customer Notes</label>
              <div className="zest-row-field">
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Looking forward to your business"
                />
              </div>
            </div>
            <div className="zest-row">
              <label className="zest-label">Terms &amp; Conditions</label>
              <div className="zest-row-field">
                <textarea
                  rows={3}
                  value={termsConditions}
                  onChange={(e) => setTermsConditions(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="zest-totals-col">
            <div className="zest-total-row">
              <span>Sub Total</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>
            <div className="zest-total-row">
              <span>Tax</span>
              <span>{totalTax.toFixed(2)}</span>
            </div>
            <div className="zest-total-row">
              <span>Shipping Charges <span className="zest-info-icon" title="Additional shipping cost">ⓘ</span></span>
              <input
                type="number"
                className="zest-shipping-input"
                value={shippingCharges}
                onChange={(e) => setShippingCharges(Number(e.target.value))}
              />
            </div>
            <div className="zest-total-row zest-grand-total">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="zest-footer-actions">
          <button className="zest-btn zest-btn-outline" onClick={() => submitEstimate("Draft")}>
            Save as Draft
          </button>
          <button className="zest-btn zest-btn-primary" onClick={() => submitEstimate("Sent")}>
            Save and Send
          </button>
          <button className="zest-btn zest-btn-ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEstimate;
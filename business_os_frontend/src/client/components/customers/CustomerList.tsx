// import React, { useState, useRef, useEffect } from 'react';
// import CustomerForm from './CustomerForm';
// import CustomerDetails from './CustomerDetails';
// import * as customerService from '../../services/customerService';
// import './CustomerList.css';

// interface Customer {
//   id: number;
//   company_id: number;
//   name: string;
//   email: string;
//   location: string;
//   orders: number | null;
//   amountSpent: number;
// }

// export const CustomerList: React.FC = () => {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  
//   const [showForm, setShowForm] = useState(false);
//   const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
//   const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     loadCustomers();
//   }, []);

//   const loadCustomers = async () => {
//     try {
//       setLoading(true);
//       const res = await customerService.getAll();
//       if (res.success) {
//         setCustomers(res.data);
//       }
//     } catch (err) {
//       console.error("Database loading error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleDropdown = (id: number) => {
//     setActiveDropdownId(activeDropdownId === id ? null : id);
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Are you sure you want to delete this customer record from the tenant database?")) {
//       try {
//         const res = await customerService.deleteCustomer(id);
//         if (res.success) {
//           setCustomers(customers.filter(c => c.id !== id));
//         }
//       } catch (err) {
//         console.error("Deletion failed:", err);
//       }
//     }
//     setActiveDropdownId(null);
//   };

//   const handleFormSubmit = async (formData: { name: string; email: string; location: string }) => {
//     try {
//       if (editingCustomer) {
//         const res = await customerService.update(editingCustomer.id, formData);
//         if (res.success) {
//           await loadCustomers();
//           setEditingCustomer(null);
//         }
//       } else {
//         const res = await customerService.create(formData);
//         if (res.success) {
//           await loadCustomers();
//           setShowForm(false);
//         }
//       }
//     } catch (err) {
//       console.error("Form submission failed:", err);
//       alert("Error saving record to Database.");
//     }
//   };

//   const handleExport = () => {
//     let csvContent = "data:text/csv;charset=utf-8,ID,Name,Email,Location,Orders,Amount Spent\n";
//     customers.forEach(c => {
//       csvContent += `${c.id},"${c.name}","${c.email}","${c.location}",${c.orders || 0},${c.amountSpent}\n`;
//     });
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "business_os_customers.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const triggerImportClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
//     alert("CSV import is being connected through standard multi-tenant routes.");
//     event.target.value = '';
//   };

//   const filteredCustomers = customers.filter(c =>
//     c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     c.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return <div className="customer-container"><h3>Loading tenant records from database...</h3></div>;
//   }

//   return (
//     <div className="customer-container">
//       <input 
//         type="file" 
//         ref={fileInputRef} 
//         style={{ display: 'none' }} 
//         accept=".csv" 
//         onChange={handleFileImport}
//       />

//       {showForm || editingCustomer ? (
//         <div>
//           <button className="btn-secondary back-btn" onClick={() => { setShowForm(false); setEditingCustomer(null); }}>
//             ← Back to Customer Registry
//           </button>
//           <CustomerForm 
//             onSubmit={handleFormSubmit} 
//             onCancel={() => { setShowForm(false); setEditingCustomer(null); }} 
//             initialData={editingCustomer || undefined}
//           />
//         </div>
//       ) : viewingCustomer ? (
//         <div>
//           <button className="btn-secondary back-btn" onClick={() => setViewingCustomer(null)}>
//             ← Back to Registry Table
//           </button>
//           <CustomerDetails customer={{ ...viewingCustomer, id: viewingCustomer.id.toString() }} />
//         </div>
//       ) : (
//         <>
//           <div className="customer-header">
//             <div>
//               <h2>Customers</h2>
//               <p className="subtitle">
//                 BusinessOS - Multi-Tenant ERP SaaS Platform: Manage isolated domains.
//               </p>
//             </div>
//             <div className="header-actions">
//               <button className="btn-secondary" onClick={triggerImportClick}>⬇ Import CSV</button>
//               <button className="btn-secondary" onClick={handleExport}>⬆ Export CSV</button>
//               <button className="btn-primary" onClick={() => setShowForm(true)}>Add Customers</button>
//             </div>
//           </div>

//           <div className="customer-kpi">
//             <span className="kpi-count"><strong>{filteredCustomers.length}</strong> customer{filteredCustomers.length !== 1 ? 's' : ''}</span>
//           </div>

//           <div className="filter-bar">
//             <div className="search-wrapper">
//               <span className="search-icon">🔍</span>
//               <input 
//                 type="text" 
//                 placeholder="Search tenant registries" 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="table-responsive">
//             <table className="customer-table">
//               <thead>
//                 <tr>
//                   <th style={{ width: '40px' }}><input type="checkbox" /></th>
//                   <th>Customers</th>
//                   <th>Email Address</th>
//                   <th>Location</th>
//                   <th>Orders</th>
//                   <th>Amount Spent</th>
//                   <th style={{ textAlign: 'center', width: '100px' }}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredCustomers.map((customer) => (
//                   <tr key={customer.id}>
//                     <td><input type="checkbox" /></td>
//                     <td 
//                       className="customer-name-cell clickable-name" 
//                       onClick={() => setViewingCustomer(customer)}
//                     >
//                       {customer.name}
//                     </td>
//                     <td className="customer-email-cell">{customer.email}</td>
//                     <td>{customer.location}</td>
//                     <td>{customer.orders !== null ? `${customer.orders} Orders` : '0 Orders'}</td>
//                     <td>{Number(customer.amountSpent || 0).toFixed(2)}</td>
//                     <td style={{ textAlign: 'center' }} className="action-cell">
//                       <button className="btn-dots" onClick={() => toggleDropdown(customer.id)}>•••</button>
                      
//                       {activeDropdownId === customer.id && (
//                         <div className="action-dropdown">
//                           <button className="dropdown-item" onClick={() => { setViewingCustomer(customer); setActiveDropdownId(null); }}>👁 View</button>
//                           <button className="dropdown-item" onClick={() => { setEditingCustomer(customer); setActiveDropdownId(null); }}>✏ Edit</button>
//                           <button className="dropdown-item delete-item" onClick={() => handleDelete(customer.id)}>🗑 Delete</button>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CustomerList;
// CustomerList.tsx
import React, { useState, useRef, useEffect } from 'react';
import CustomerForm from './CustomerForm';
import CustomerDetails from './CustomerDetails';
import * as customerService from '../../services/customerService';
import './CustomerList.css';

// 🎯 Matching the full schema entity layout from our SQLite upgrade data types
interface Customer {
  id: number;
  company_id: number;
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
  orders: number | null;
  amountSpent: number;
  name?: string; // Kept for rendering fallback structures if needed
}

export const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await customerService.getAll();
      if (res.success) {
        setCustomers(res.data);
      }
    } catch (err) {
      console.error("Database loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (id: number) => {
    setActiveDropdownId(activeDropdownId === id ? null : id);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this customer record from the tenant database?")) {
      try {
        const res = await customerService.deleteCustomer(id);
        if (res.success) {
          setCustomers(customers.filter(c => c.id !== id));
        }
      } catch (err) {
        console.error("Deletion failed:", err);
      }
    }
    setActiveDropdownId(null);
  };

  // 🎯 FIXED TS2322 TYPE MATRIX MATCH: Now safely accepting the Enhanced Form values mapping layout 
  const handleFormSubmit = async (formData: any) => {
    try {
      if (editingCustomer) {
        const res = await customerService.update(editingCustomer.id, formData);
        if (res.success) {
          await loadCustomers();
          setEditingCustomer(null);
        }
      } else {
        const res = await customerService.create(formData);
        if (res.success) {
          await loadCustomers();
          setShowForm(false);
        }
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      alert("Error saving record to Database.");
    }
  };

  const handleExport = () => {
    let csvContent = "data:text/csv;charset=utf-8,ID,Display Name,Company Name,Email,Location,Orders,Amount Spent\n";
    customers.forEach(c => {
      // Safely extracting dynamic Zoho Books name models or legacy fallback name rows
      const targetName = c.display_name || c.name || "Unnamed Entity";
      const targetCompany = c.company_name || "";
      csvContent += `${c.id},"${targetName}","${targetCompany}","${c.email}","${c.location || ''}",${c.orders || 0},${c.amountSpent}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "business_os_customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    alert("CSV import is being connected through standard multi-tenant routes.");
    event.target.value = '';
  };

  // 🎯 Search filters adjusted to check both display_name, legacy names, and emails
  const filteredCustomers = customers.filter(c => {
    const targetName = (c.display_name || c.name || '').toLowerCase();
    const targetEmail = (c.email || '').toLowerCase();
    const searchStr = searchTerm.toLowerCase();
    return targetName.includes(searchStr) || targetEmail.includes(searchStr);
  });

  if (loading) {
    return <div className="customer-container"><h3>Loading tenant records from database...</h3></div>;
  }

  return (
    <div className="customer-container">
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept=".csv" 
        onChange={handleFileImport}
      />

      {showForm || editingCustomer ? (
        <div>
          <button className="btn-secondary back-btn" onClick={() => { setShowForm(false); setEditingCustomer(null); }}>
            ← Back to Customer Registry
          </button>
          <CustomerForm 
            onSubmit={handleFormSubmit} 
            onCancel={() => { setShowForm(false); setEditingCustomer(null); }} 
            initialData={editingCustomer || undefined}
          />
        </div>
      ) : viewingCustomer ? (
        <div>
          <button className="btn-secondary back-btn" onClick={() => setViewingCustomer(null)}>
            ← Back to Registry Table
          </button>
          <CustomerDetails 
  customer={{ 
    ...viewingCustomer, 
    id: viewingCustomer.id.toString(),
    // 'name' illa na empty string anuppiduvom, error varathu
    name: viewingCustomer.display_name || viewingCustomer.name || "" 
  } as any} 
/>
        </div>
      ) : (
        <>
          <div className="customer-header">
            <div>
              <h2>Customers</h2>
              <p className="subtitle">
                BusinessOS - Multi-Tenant ERP SaaS Platform: Manage isolated domains.
              </p>
            </div>
            <div className="header-actions">
              <button className="btn-secondary" onClick={triggerImportClick}>⬇ Import CSV</button>
              <button className="btn-secondary" onClick={handleExport}>⬆ Export CSV</button>
              <button className="btn-primary" onClick={() => setShowForm(true)}>Add Customers</button>
            </div>
          </div>

          <div className="customer-kpi">
            <span className="kpi-count"><strong>{filteredCustomers.length}</strong> customer{filteredCustomers.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="filter-bar">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search tenant registries" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="customer-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}><input type="checkbox" /></th>
                  <th>Customers</th>
                  <th>Email Address</th>
                  <th>Location</th>
                  <th>Orders</th>
                  <th>Amount Spent</th>
                  <th style={{ textAlign: 'center', width: '100px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td><input type="checkbox" /></td>
                    <td 
                      className="customer-name-cell clickable-name" 
                      onClick={() => setViewingCustomer(customer)}
                    >
                      {/* Displays display_name if exists, else falls back to old name column row */}
                      {customer.display_name || customer.name}
                    </td>
                    <td className="customer-email-cell">{customer.email}</td>
                    <td>{customer.location || '—'}</td>
                    <td>{customer.orders !== null ? `${customer.orders} Orders` : '0 Orders'}</td>
                    <td>{Number(customer.amountSpent || 0).toFixed(2)}</td>
                    <td style={{ textAlign: 'center' }} className="action-cell">
                      <button className="btn-dots" onClick={() => toggleDropdown(customer.id)}>•••</button>
                      
                      {activeDropdownId === customer.id && (
                        <div className="action-dropdown">
                          <button className="dropdown-item" onClick={() => { setViewingCustomer(customer); setActiveDropdownId(null); }}>👁 View</button>
                          <button className="dropdown-item" onClick={() => { setEditingCustomer(customer); setActiveDropdownId(null); }}>✏ Edit</button>
                          <button className="dropdown-item delete-item" onClick={() => handleDelete(customer.id)}>🗑 Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerList;
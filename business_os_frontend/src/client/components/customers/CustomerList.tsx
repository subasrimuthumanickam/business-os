// import React, { useState, useRef } from 'react';
// import CustomerForm from './CustomerForm';
// import CustomerDetails from './CustomerDetails';
// import './CustomerList.css';

// interface Customer {
//   id: string;
//   name: string;
//   email: string;
//   location: string;
//   orders: number | null;
//   amountSpent: number;
// }

// const initialCustomers: Customer[] = [
//   { id: '1', name: 'Yoga', email: 'abc@gmail.com', location: 'Chennai', orders: 0, amountSpent: 0.00 },
//   { id: '2', name: 'Esther Howard', email: 'esther.h@example.com', location: 'Great Falls, Maryland', orders: 2, amountSpent: 250.00 },
//   { id: '3', name: 'Leslie Alexander', email: 'leslie.a@example.com', location: 'Pasadena, Oklahoma', orders: 3, amountSpent: 350.00 },
//   { id: '4', name: 'Guy Hawkins', email: 'guy.hawkins@example.com', location: 'Corona, Michigan', orders: null, amountSpent: 0.00 },
//   { id: '5', name: 'Savannah Nguyen', email: 'savannah.n@example.com', location: 'Syracuse, Connecticut', orders: null, amountSpent: 0.00 },
// ];

// export const CustomerList: React.FC = () => {
//   const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  
//   // Views and Form States
//   const [showForm, setShowForm] = useState(false);
//   const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
//   const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const toggleDropdown = (id: string) => {
//     setActiveDropdownId(activeDropdownId === id ? null : id);
//   };

//   // Action: Delete Customer
//   const handleDelete = (id: string) => {
//     if (window.confirm("Are you sure you want to delete this customer record from the tenant database?")) {
//       setCustomers(customers.filter(c => c.id !== id));
//     }
//     setActiveDropdownId(null);
//   };

//   // Action: Export Data to CSV
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

//   // Action: Trigger File Upload Dialog for CSV Import
//   const triggerImportClick = () => {
//     fileInputRef.current?.click();
//   };

//   // Action: Process Uploaded CSV File
//   const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const text = e.target?.result as string;
//       const lines = text.split("\n");
//       const importedCustomers: Customer[] = [];

//       // Skip header line loop through items
//       for (let i = 1; i < lines.length; i++) {
//         if (!lines[i].trim()) continue;
//         const columns = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); // Split by comma outside quotes
//         if (columns.length >= 4) {
//           importedCustomers.push({
//             id: Date.now().toString() + i,
//             name: columns[1]?.replace(/"/g, '').trim() || 'Unknown',
//             email: columns[2]?.replace(/"/g, '').trim() || 'N/A',
//             location: columns[3]?.replace(/"/g, '').trim() || 'N/A',
//             orders: columns[4] ? parseInt(columns[4]) : 0,
//             amountSpent: columns[5] ? parseFloat(columns[5]) : 0.0
//           });
//         }
//       }

//       if (importedCustomers.length > 0) {
//         setCustomers([...importedCustomers, ...customers]);
//         alert(`Successfully imported ${importedCustomers.length} records into this tenant space.`);
//       }
//     };
//     reader.readAsText(file);
//     event.target.value = ''; // Reset file element input
//   };

//   // Action: Form Submission (Handles both Add & Edit updates)
//   const handleFormSubmit = (formData: { name: string; email: string; location: string }) => {
//     if (editingCustomer) {
//       // Update existing record
//       setCustomers(customers.map(c => 
//         c.id === editingCustomer.id 
//           ? { ...c, name: formData.name, email: formData.email, location: formData.location }
//           : c
//       ));
//       setEditingCustomer(null);
//     } else {
//       // Add a fresh record
//       const newCustomer: Customer = {
//         id: Date.now().toString(),
//         name: formData.name,
//         email: formData.email,
//         location: formData.location || 'N/A',
//         orders: 0,
//         amountSpent: 0.00
//       };
//       setCustomers([newCustomer, ...customers]);
//       setShowForm(false);
//     }
//   };

//   const filteredCustomers = customers.filter(c =>
//     c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     c.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="customer-container">
//       {/* Hidden Input field for automated CSV imports */}
//       <input 
//         type="file" 
//         ref={fileInputRef} 
//         style={{ display: 'none' }} 
//         accept=".csv" 
//         onChange={handleFileImport}
//       />

//       {/* Screen View Conditional Management */}
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
//           <CustomerDetails customer={viewingCustomer} />
//         </div>
//       ) : (
//         <>
//           {/* Main Dashboard Panel Layout */}
//           <div className="customer-header">
//             <div>
//               <h2>Customers</h2>
//               <p className="subtitle">
//                 BusinessOS - Multi-Tenant ERP SaaS Platform: Manage isolated global client domains, cross-tenant subscription states, and revenue analytics.
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
//             <span className="kpi-percentage"><strong>100%</strong> of active tenant base</span>
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
//             <div className="filter-actions">
//               <button className="btn-filter">Add filter ⬇</button>
//               <button className="btn-icon">↕</button>
//               <button className="btn-icon">•••</button>
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
//                     <td className="customer-name-cell">{customer.name}</td>
//                     <td className="customer-email-cell">{customer.email}</td>
//                     <td>{customer.location}</td>
//                     <td>{customer.orders !== null ? `${customer.orders} Orders` : '0 Orders'}</td>
//                     <td>${customer.amountSpent.toFixed(2)}</td>
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
import React, { useState, useRef } from 'react';
import CustomerForm from './CustomerForm';
import CustomerDetails from './CustomerDetails';
import './CustomerList.css';

interface Customer {
  id: string;
  name: string;
  email: string;
  location: string;
  orders: number | null;
  amountSpent: number;
}

const initialCustomers: Customer[] = [
  { id: '1', name: 'Yoga', email: 'abc@gmail.com', location: 'Chennai', orders: 0, amountSpent: 0.00 },
  { id: '2', name: 'Esther Howard', email: 'esther.h@example.com', location: 'Great Falls, Maryland', orders: 2, amountSpent: 250.00 },
  { id: '3', name: 'Leslie Alexander', email: 'leslie.a@example.com', location: 'Pasadena, Oklahoma', orders: 3, amountSpent: 350.00 },
  { id: '4', name: 'Guy Hawkins', email: 'guy.hawkins@example.com', location: 'Corona, Michigan', orders: null, amountSpent: 0.00 },
  { id: '5', name: 'Savannah Nguyen', email: 'savannah.n@example.com', location: 'Syracuse, Connecticut', orders: null, amountSpent: 0.00 },
];

export const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  
  // Views and Form States
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleDropdown = (id: string) => {
    setActiveDropdownId(activeDropdownId === id ? null : id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this customer record from the tenant database?")) {
      setCustomers(customers.filter(c => c.id !== id));
    }
    setActiveDropdownId(null);
  };

  const handleExport = () => {
    let csvContent = "data:text/csv;charset=utf-8,ID,Name,Email,Location,Orders,Amount Spent\n";
    customers.forEach(c => {
      csvContent += `${c.id},"${c.name}","${c.email}","${c.location}",${c.orders || 0},${c.amountSpent}\n`;
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
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split("\n");
      const importedCustomers: Customer[] = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const columns = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        if (columns.length >= 4) {
          importedCustomers.push({
            id: Date.now().toString() + i,
            name: columns[1]?.replace(/"/g, '').trim() || 'Unknown',
            email: columns[2]?.replace(/"/g, '').trim() || 'N/A',
            location: columns[3]?.replace(/"/g, '').trim() || 'N/A',
            orders: columns[4] ? parseInt(columns[4]) : 0,
            amountSpent: columns[5] ? parseFloat(columns[5]) : 0.0
          });
        }
      }

      if (importedCustomers.length > 0) {
        setCustomers([...importedCustomers, ...customers]);
        alert(`Successfully imported ${importedCustomers.length} records into this tenant space.`);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleFormSubmit = (formData: { name: string; email: string; location: string }) => {
    if (editingCustomer) {
      setCustomers(customers.map(c => 
        c.id === editingCustomer.id 
          ? { ...c, name: formData.name, email: formData.email, location: formData.location }
          : c
      ));
      setEditingCustomer(null);
    } else {
      const newCustomer: Customer = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        location: formData.location || 'N/A',
        orders: 0,
        amountSpent: 0.00
      };
      setCustomers([newCustomer, ...customers]);
      setShowForm(false);
    }
  };

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <CustomerDetails customer={viewingCustomer} />
        </div>
      ) : (
        <>
          <div className="customer-header">
            <div>
              <h2>Customers</h2>
              <p className="subtitle">
                BusinessOS - Multi-Tenant ERP SaaS Platform: Manage isolated global client domains, cross-tenant subscription states, and revenue analytics.
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
            <span className="kpi-percentage"><strong>100%</strong> of active tenant base</span>
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
            <div className="filter-actions">
              <button className="btn-filter">Add filter ⬇</button>
              <button className="btn-icon">↕</button>
              <button className="btn-icon">•••</button>
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
                    {/* Made the customer name cell clickable */}
                    <td 
                      className="customer-name-cell clickable-name" 
                      onClick={() => setViewingCustomer(customer)}
                      title={`View ${customer.name}'s profile`}
                    >
                      {customer.name}
                    </td>
                    <td className="customer-email-cell">{customer.email}</td>
                    <td>{customer.location}</td>
                    <td>{customer.orders !== null ? `${customer.orders} Orders` : '0 Orders'}</td>
                    <td>${customer.amountSpent.toFixed(2)}</td>
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
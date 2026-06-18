import React, { useState, useRef, useEffect } from 'react';
import CustomerForm from './CustomerForm';
import CustomerDetails from './CustomerDetails';
import * as customerService from '../../services/customerService';
import './CustomerList.css';
import { Search } from "lucide-react";

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
  tax_rule?: string | null;
  billing_address?: string | null;
  shipping_address?: string | null;
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

  const editingCustomerData = editingCustomer
    ? { 
        ...editingCustomer, 
        tax_rule: editingCustomer.tax_rule ?? '',
        billing_address: editingCustomer.billing_address ?? '',
        shipping_address: editingCustomer.shipping_address ?? '',
        phone_work: editingCustomer.phone_work ?? '',
        phone_mobile: editingCustomer.phone_mobile ?? '',
      }
    : undefined;

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
            initialData={editingCustomerData}
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
  <Search size={16} className="search-icon" />
  <input
    type="text"
    placeholder="Search customers"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>
          </div>

          <div className="table-responsive">
            <table className="customer-table">
              <thead>
              <tr>
                <th>Customer Name</th>
                <th>Company Name</th>
                <th>Mobile Number</th>
                <th>Email Address</th>
                <th>Receivables</th>
                <th>Location</th>
                <th>Action</th>
                </tr>
              </thead>
              {/* <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td 
                      className="customer-name-cell clickable-name" 
                      onClick={() => setViewingCustomer(customer)}
                    >
                      {customer.display_name || customer.name}
                    </td>
                    <td className="customer-email-cell">{customer.email}</td>
                    <td>{customer.location || '—'}</td>
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
              </tbody> */}
              <tbody>
  {filteredCustomers.map((customer) => (
    <tr key={customer.id}>
      <td
        className="customer-name-cell clickable-name"
        onClick={() => setViewingCustomer(customer)}
      >
        {customer.display_name}
      </td>

      <td>{customer.company_name || "-"}</td>

      <td>
        {customer.phone_mobile ||
          customer.phone_work ||
          "-"}
      </td>

      <td>{customer.email}</td>

      <td>
        ₹ {Number(customer.amountSpent || 0).toFixed(2)}
      </td>

      <td>{customer.location || "-"}</td>

     <td style={{ textAlign: "center" }} className="action-cell">
  <button
    className="btn-dots"
    onClick={() => toggleDropdown(customer.id)}
  >
    •••
  </button>

  {activeDropdownId === customer.id && (
    <div className="action-dropdown">
      <button
        className="dropdown-item"
        onClick={() => {
          setViewingCustomer(customer);
          setActiveDropdownId(null);
        }}
      >
        👁 View
      </button>

      <button
        className="dropdown-item"
        onClick={() => {
          setEditingCustomer(customer);
          setActiveDropdownId(null);
        }}
      >
        ✏ Edit
      </button>

      <button
        className="dropdown-item delete-item"
        onClick={() => handleDelete(customer.id)}
      >
        🗑 Delete
      </button>
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
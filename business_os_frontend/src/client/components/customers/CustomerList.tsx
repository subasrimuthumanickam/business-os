import React, { useState, useRef, useEffect } from 'react';
import CustomerForm from './CustomerForm';
import CustomerDetails from './CustomerDetails';
import * as customerService from '../../services/customerService';
import { Search } from "lucide-react";
import { useParams, useNavigate } from 'react-router-dom';

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

// Shared Tailwind fragments (theme: primary #6342e8, hover #5130d4)
const btnPrimary =
  "bg-[#6342e8] hover:bg-[#5130d4] text-white border-none px-4 py-2 rounded-lg font-medium text-sm cursor-pointer transition-colors";
const btnSecondary =
  "bg-transparent text-[#1a1d20] border border-[#ededee] px-3.5 py-2 rounded-lg text-sm cursor-pointer hover:bg-[#f9fafb] transition-colors";

export const CustomerList: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load customers ONCE on mount
  useEffect(() => {
    loadCustomers();
  }, []);

  // Sync viewingCustomer with URL id, whenever id or customers list changes
  useEffect(() => {
    if (id && customers.length > 0) {
      const found = customers.find((c) => c.id === Number(id));
      if (found) {
        setViewingCustomer((prev) => (prev?.id === found.id ? prev : found));
      }
    } else if (!id) {
      setViewingCustomer(null);
    }
  }, [id, customers]);

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
    return (
      <div className="p-4 sm:p-6 bg-white font-serif text-[#1a1d20]">
        <h3 className="text-base font-medium">Loading tenant records from database...</h3>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-white font-serif text-[#1a1d20]">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".csv"
        onChange={handleFileImport}
      />

      {showForm || editingCustomer ? (
        <div>
          <button
            className={`${btnSecondary} mb-5`}
            onClick={() => { setShowForm(false); setEditingCustomer(null); }}
          >
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
          <button
            className={`${btnSecondary} mb-5`}
            onClick={() => {
              setViewingCustomer(null);
              navigate('/client/customers');
            }}
          >
            ← Back to Registry Table
          </button>
          <CustomerDetails
            customer={{
              ...viewingCustomer,
              id: viewingCustomer.id.toString(),
              name: viewingCustomer.display_name || viewingCustomer.name || ""
            } as any}
            onEdit={() => {
              setEditingCustomer(viewingCustomer);
              setViewingCustomer(null);
            }}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-2">
            <div>
              <h2 className="text-2xl font-semibold m-0 mb-1.5">Customers</h2>
              <p className="text-[#71777d] text-sm m-0 max-w-[750px] leading-snug">
                BusinessOS - Multi-Tenant ERP SaaS Platform: Manage isolated domains.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button className={btnSecondary} onClick={triggerImportClick}>⬇ Import CSV</button>
              <button className={btnSecondary} onClick={handleExport}>⬆ Export CSV</button>
              <button className={btnPrimary} onClick={() => setShowForm(true)}>Add Customers</button>
            </div>
          </div>

          <div className="flex gap-4 border-b border-[#ededee] py-4 text-[15px]">
            <span className="border-b-2 border-[#1a1d20] pb-3.5 -mb-[17px]">
              <strong>{filteredCustomers.length}</strong> customer{filteredCustomers.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex justify-between items-center my-6">
            <div className="relative w-full sm:w-[260px]">
              <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#71777d]" />
              <input
                type="text"
                placeholder="Search customers"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-2 py-2 border border-[#ededee] rounded-lg text-sm font-serif outline-none focus:border-[#6342e8]"
              />
            </div>
          </div>

          <div className="overflow-x-auto border border-[#ededee] rounded-xl">
            <table className="w-full min-w-[820px] border-collapse text-left text-[15px]">
              <thead>
                <tr>
                  <th className="bg-[#f9fafb] text-[#71777d] font-medium px-4 py-3 border-b border-[#ededee]">Customer Name</th>
                  <th className="bg-[#f9fafb] text-[#71777d] font-medium px-4 py-3 border-b border-[#ededee]">Company Name</th>
                  <th className="bg-[#f9fafb] text-[#71777d] font-medium px-4 py-3 border-b border-[#ededee]">Mobile Number</th>
                  <th className="bg-[#f9fafb] text-[#71777d] font-medium px-4 py-3 border-b border-[#ededee]">Email Address</th>
                  <th className="bg-[#f9fafb] text-[#71777d] font-medium px-4 py-3 border-b border-[#ededee]">Receivables</th>
                  <th className="bg-[#f9fafb] text-[#71777d] font-medium px-4 py-3 border-b border-[#ededee]">Location</th>
                  <th className="bg-[#f9fafb] text-[#71777d] font-medium px-4 py-3 border-b border-[#ededee]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-[#f9fafb]">
                    <td
                      className="px-4 py-3.5 border-b border-[#ededee] align-middle font-bold text-[#1a1d20] cursor-pointer !text-[#4b5563] transition-colors hover:!text-[#5130d4]"
                      onClick={() => setViewingCustomer(customer)}
                    >
                      {customer.display_name}
                    </td>

                    <td className="px-4 py-3.5 border-b border-[#ededee] align-middle">{customer.company_name || "-"}</td>

                    <td className="px-4 py-3.5 border-b border-[#ededee] align-middle">
                      {customer.phone_mobile || customer.phone_work || "-"}
                    </td>

                    <td className="px-4 py-3.5 border-b border-[#ededee] align-middle text-[#4b5563]">{customer.email}</td>

                    <td className="px-4 py-3.5 border-b border-[#ededee] align-middle">
                      ₹ {Number(customer.amountSpent || 0).toFixed(2)}
                    </td>

                    <td className="px-4 py-3.5 border-b border-[#ededee] align-middle">{customer.location || "-"}</td>

                    <td style={{ textAlign: "center" }} className="px-4 py-3.5 border-b border-[#ededee] align-middle relative">
                      <button
                        className="bg-transparent border-none cursor-pointer text-base text-[#71777d] px-2 py-1"
                        onClick={() => toggleDropdown(customer.id)}
                      >
                        •••
                      </button>

                      {activeDropdownId === customer.id && (
                        <div className="absolute right-4 top-10 bg-white border border-[#ededee] rounded-md shadow-lg z-[100] flex flex-col w-[100px]">
                          <button
                            className="bg-transparent border-none px-3 py-2 text-left cursor-pointer font-serif text-[13px] hover:bg-[#f9fafb]"
                            onClick={() => {
                              setViewingCustomer(customer);
                              setActiveDropdownId(null);
                            }}
                          >
                            👁 View
                          </button>

                          <button
                            className="bg-transparent border-none px-3 py-2 text-left cursor-pointer font-serif text-[13px] hover:bg-[#f9fafb]"
                            onClick={() => {
                              setEditingCustomer(customer);
                              setActiveDropdownId(null);
                            }}
                          >
                            ✏ Edit
                          </button>

                          <button
                            className="bg-transparent border-none px-3 py-2 text-left cursor-pointer font-serif text-[13px] hover:bg-[#f9fafb] text-red-500"
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
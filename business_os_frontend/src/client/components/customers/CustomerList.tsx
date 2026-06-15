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
import React, { useState, useEffect } from 'react';
import {
  Users, Search, Mail, Phone, MapPin, MoreVertical, 
  Eye, CheckCircle, XCircle, AlertCircle, UserPlus, Download,
  Filter, ChevronLeft, ChevronRight, Edit, Trash2, X,
  Building2, DollarSign, Calendar
} from 'lucide-react';

// Types
interface Customer {
  id: string;
  customerCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  country: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
}

// Initial Mock Data
const initialCustomers: Customer[] = [
  { id: '1', customerCode: 'CUST001', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '+1234567890', company: 'Tech Corp', address: '123 Main St', city: 'New York', country: 'USA', status: 'active', joinDate: '2023-01-15', totalOrders: 45, totalSpent: 12500 },
  { id: '2', customerCode: 'CUST002', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '+1234567891', company: 'Design Studio', address: '456 Oak Ave', city: 'Los Angeles', country: 'USA', status: 'active', joinDate: '2023-02-20', totalOrders: 32, totalSpent: 8900 },
  { id: '3', customerCode: 'CUST003', firstName: 'Robert', lastName: 'Johnson', email: 'robert.j@example.com', phone: '+1234567892', company: 'Johnson Industries', address: '789 Pine Rd', city: 'Chicago', country: 'USA', status: 'inactive', joinDate: '2023-03-10', totalOrders: 12, totalSpent: 3400 },
  { id: '4', customerCode: 'CUST004', firstName: 'Maria', lastName: 'Garcia', email: 'maria.g@example.com', phone: '+1234567893', company: 'Garcia Enterprises', address: '321 Elm St', city: 'Houston', country: 'USA', status: 'active', joinDate: '2023-04-05', totalOrders: 67, totalSpent: 21500 },
  { id: '5', customerCode: 'CUST005', firstName: 'David', lastName: 'Kim', email: 'david.kim@example.com', phone: '+1234567894', company: 'Kim Trading', address: '654 Maple Dr', city: 'Phoenix', country: 'USA', status: 'pending', joinDate: '2023-05-12', totalOrders: 3, totalSpent: 450 },
];

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<Partial<Customer>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    country: '',
    status: 'active'
  });
  
  const itemsPerPage = 5;

  // FIXED: Added safe navigation with optional chaining and null checks
  const getFilteredCustomers = () => {
    let filtered = customers.filter(customer => customer != null); // Filter out null/undefined
    
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(customer => {
        // Safe navigation using optional chaining and null checks
        const fullName = `${customer?.firstName || ''} ${customer?.lastName || ''}`.toLowerCase();
        const email = (customer?.email || '').toLowerCase();
        const company = (customer?.company || '').toLowerCase();
        const customerCode = (customer?.customerCode || '').toLowerCase();
        
        return fullName.includes(query) || 
               email.includes(query) || 
               company.includes(query) || 
               customerCode.includes(query);
      });
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(customer => customer?.status === filterStatus);
    }
    
    return filtered;
  };

  const filteredCustomers = getFilteredCustomers();
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c?.status === 'active').length;
  const pendingCustomers = customers.filter(c => c?.status === 'pending').length;
  const totalRevenue = customers.reduce((sum, c) => sum + (c?.totalSpent || 0), 0);

  const getStatusBadge = (status: Customer['status']) => {
    if (!status) return null;
    
    const config = {
      active: 'bg-green-50 text-green-700 border-green-200',
      inactive: 'bg-gray-50 text-gray-700 border-gray-200',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    };
    const icons = { active: CheckCircle, inactive: XCircle, pending: AlertCircle };
    const Icon = icons[status];
    const labels = { active: 'Active', inactive: 'Inactive', pending: 'Pending' };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config[status]} transition-all duration-200 hover:scale-105`}>
        <Icon className="w-3 h-3" />
        {labels[status]}
      </span>
    );
  };

  const handleAddCustomer = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Please fill all required fields');
      return;
    }

    const newCustomer: Customer = {
      id: Date.now().toString(),
      customerCode: `CUST${String(customers.length + 1).padStart(3, '0')}`,
      firstName: formData.firstName!,
      lastName: formData.lastName!,
      email: formData.email!,
      phone: formData.phone || '',
      company: formData.company || '',
      address: formData.address || '',
      city: formData.city || '',
      country: formData.country || '',
      status: (formData.status as 'active' | 'inactive' | 'pending') || 'active',
      joinDate: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalSpent: 0
    };

    setCustomers([...customers, newCustomer]);
    resetModal();
  };

  const handleUpdateCustomer = () => {
    if (!editingCustomer) return;
    
    const updatedCustomers = customers.map(cust => 
      cust?.id === editingCustomer.id 
        ? { ...cust, ...formData as Partial<Customer> }
        : cust
    );
    setCustomers(updatedCustomers);
    resetModal();
  };

  const handleDeleteCustomer = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(cust => cust?.id !== id));
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      city: '',
      country: '',
      status: 'active'
    });
  };

  const handleExportCSV = () => {
    const headers = ['Customer Code', 'Name', 'Email', 'Phone', 'Company', 'Status', 'Join Date', 'Total Orders', 'Total Spent'];
    const rows = filteredCustomers.map(cust => [
      cust?.customerCode || '',
      `${cust?.firstName || ''} ${cust?.lastName || ''}`,
      cust?.email || '',
      cust?.phone || '',
      cust?.company || '',
      cust?.status || '',
      cust?.joinDate || '',
      cust?.totalOrders || 0,
      cust?.totalSpent || 0
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage and view all customer information</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>
                <p className="text-2xl font-bold text-gray-800">{totalCustomers}</p>
              </div>
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Customers</p>
                <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCustomers}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-600">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email or company..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 bg-white"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleExportCSV}
                  className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 flex items-center gap-1 border border-gray-200 bg-white hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 shadow-sm hover:scale-105"
                >
                  <UserPlus className="w-4 h-4" />
                  Add Customer
                </button>
              </div>
            </div>
          </div>

          {/* Customer Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedCustomers.map((customer) => (
                  <tr key={customer?.id} className="hover:bg-gray-50 transition-all duration-200">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{customer?.firstName} {customer?.lastName}</p>
                        <p className="text-xs text-gray-400">{customer?.customerCode}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm text-gray-600">{customer?.email}</p>
                        <p className="text-xs text-gray-400">{customer?.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{customer?.company || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{customer?.city || '-'}, {customer?.country || '-'}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">{customer?.totalOrders || 0}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-green-600">${(customer?.totalSpent || 0).toLocaleString()}</td>
                    <td className="px-4 py-3">{getStatusBadge(customer?.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => setSelectedCustomer(customer)}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                        >
                          <Eye className="w-4 h-4 text-gray-400 hover:text-indigo-600" />
                        </button>
                        <button 
                          onClick={() => {
                            setEditingCustomer(customer);
                            setFormData(customer);
                            setIsModalOpen(true);
                          }}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                        >
                          <Edit className="w-4 h-4 text-gray-400 hover:text-indigo-600" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCustomer(customer?.id)}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} customers
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600">
              <h3 className="text-lg font-semibold text-white">
                {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
              </h3>
              <button onClick={resetModal} className="p-1 hover:bg-white/20 rounded-lg">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">First Name *</label>
                  <input type="text" value={formData.firstName || ''} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Last Name *</label>
                  <input type="text" value={formData.lastName || ''} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                <input type="text" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
                <input type="text" value={formData.company || ''} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                  <input type="text" value={formData.city || ''} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Country</label>
                  <input type="text" value={formData.country || ''} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select value={formData.status || 'active'} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
              <button onClick={resetModal} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={editingCustomer ? handleUpdateCustomer : handleAddCustomer} className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                {editingCustomer ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
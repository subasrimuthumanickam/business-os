// import React, { useState, useEffect } from 'react';
// import CustomerForm from './CustomerForm';
// import CustomerDetails from './CustomerDetails';

// interface Customer {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   gstNumber?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   pincode?: string;
//   status: 'active' | 'inactive';
//   totalPurchases: number;
//   createdAt: string;
// }

// const CustomerList: React.FC = () => {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
//   const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       const response = await fetch('/api/customers', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setCustomers(data.data || data);
//       } else {
//         setMockCustomers();
//       }
//     } catch (error) {
//       setMockCustomers();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const setMockCustomers = () => {
//     setCustomers([
//       { id: '1', name: 'ABC Corporation', email: 'contact@abc.com', phone: '9876543210', gstNumber: '22AAAAA0000A1Z', address: 'Mumbai', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', status: 'active', totalPurchases: 125000, createdAt: '2024-01-15' },
//       { id: '2', name: 'XYZ Enterprises', email: 'info@xyz.com', phone: '8765432109', gstNumber: '22BBBBB0000B2Z', address: 'Delhi', city: 'Delhi', state: 'Delhi', pincode: '110001', status: 'active', totalPurchases: 75000, createdAt: '2024-02-20' },
//       { id: '3', name: 'PQR Pvt Ltd', email: 'sales@pqr.com', phone: '7654321098', address: 'Bangalore', city: 'Bangalore', state: 'Karnataka', pincode: '560001', status: 'inactive', totalPurchases: 25000, createdAt: '2024-03-10' },
//       { id: '4', name: 'LMN Industries', email: 'contact@lmn.com', phone: '6543210987', gstNumber: '22CCCCC0000C3Z', address: 'Chennai', city: 'Chennai', state: 'Tamil Nadu', pincode: '600001', status: 'active', totalPurchases: 45000, createdAt: '2024-04-05' },
//     ]);
//   };

//   const handleDelete = async (id: string) => {
//     if (window.confirm('Are you sure you want to delete this customer?')) {
//       try {
//         await fetch(`/api/customers/${id}`, {
//           method: 'DELETE',
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setCustomers(customers.filter(c => c.id !== id));
//         alert('Customer deleted successfully!');
//       } catch (error) {
//         setCustomers(customers.filter(c => c.id !== id));
//         alert('Customer deleted successfully!');
//       }
//     }
//   };

//   const handleEdit = (customer: Customer) => {
//     setEditingCustomer(customer);
//     setShowModal(true);
//   };

//   const handleSave = (customerData: any) => {
//     if (editingCustomer) {
//       setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...c, ...customerData } : c));
//       alert('Customer updated successfully!');
//     } else {
//       const newCustomer = { ...customerData, id: Date.now().toString(), totalPurchases: 0, createdAt: new Date().toISOString().slice(0, 10) };
//       setCustomers([...customers, newCustomer]);
//       alert('Customer added successfully!');
//     }
//     setShowModal(false);
//     setEditingCustomer(null);
//   };

//   const getStatusClass = (status: string) => {
//     return status === 'active' ? 'status-active' : 'status-inactive';
//   };

//   const filteredCustomers = customers.filter(customer => {
//     const matchSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                         customer.phone.includes(searchTerm);
//     const matchStatus = statusFilter === 'all' || customer.status === statusFilter;
//     return matchSearch && matchStatus;
//   });

//   if (loading) {
//     return <div className="loading">Loading customers...</div>;
//   }

//   return (
//     <div className="customer-list">
//       <div className="list-header">
//         <h2>Customers</h2>
//         <button className="btn-primary" onClick={() => { setEditingCustomer(null); setShowModal(true); }}>
//           + Add Customer
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="filters-bar">
//         <input
//           type="text"
//           placeholder="🔍 Search customers..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
//         <select 
//           value={statusFilter} 
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="filter-select"
//         >
//           <option value="all">All Status</option>
//           <option value="active">Active</option>
//           <option value="inactive">Inactive</option>
//         </select>
//       </div>

//       {/* Stats Cards */}
//       <div className="customer-stats">
//         <div className="stat-card">
//           <div className="stat-label">Total Customers</div>
//           <div className="stat-value">{customers.length}</div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-label">Active</div>
//           <div className="stat-value">{customers.filter(c => c.status === 'active').length}</div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-label">Inactive</div>
//           <div className="stat-value">{customers.filter(c => c.status === 'inactive').length}</div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-label">Total Purchases</div>
//           <div className="stat-value">₹{customers.reduce((sum, c) => sum + c.totalPurchases, 0).toLocaleString()}</div>
//         </div>
//       </div>

//       {/* Customers Table */}
//       <div className="table-container">
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>NAME</th>
//               <th>EMAIL</th>
//               <th>PHONE</th>
//               <th>GST NUMBER</th>
//               <th>CITY</th>
//               <th>STATUS</th>
//               <th>TOTAL PURCHASES</th>
//               <th>ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCustomers.map(customer => (
//               <tr key={customer.id}>
//                 <td className="customer-name-cell">{customer.name}</td>
//                 <td className="customer-email-cell">{customer.email}</td>
//                 <td className="customer-phone-cell">{customer.phone}</td>
//                 <td className="customer-gst-cell">{customer.gstNumber || '-'}</td>
//                 <td className="customer-city-cell">{customer.city || '-'}</td>
//                 <td>
//                   <span className={`status-badge ${getStatusClass(customer.status)}`}>
//                     {customer.status}
//                   </span>
//                 </td>
//                 <td className="customer-purchases-cell">₹{customer.totalPurchases.toLocaleString()}</td>
//                 <td className="actions-cell">
//                   <button className="action-btn view" onClick={() => setSelectedCustomer(customer)} title="View">
//                     👁️
//                   </button>
//                   <button className="action-btn edit" onClick={() => handleEdit(customer)} title="Edit">
//                     ✏️
//                   </button>
//                   <button className="action-btn delete" onClick={() => handleDelete(customer.id)} title="Delete">
//                     🗑️
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Customer Details Modal */}
//       {selectedCustomer && (
//         <CustomerDetails 
//           customer={selectedCustomer}
//           onClose={() => setSelectedCustomer(null)}
//         />
//       )}

//       {/* Customer Form Modal */}
//       {showModal && (
//         <CustomerForm 
//           customer={editingCustomer}
//           onClose={() => { setShowModal(false); setEditingCustomer(null); }}
//           onSave={handleSave}
//         />
//       )}
//     </div>
//   );
// };

// export default CustomerList;
import React, { useState } from 'react';
import './CustomerList.css';

interface Customer {
  id: string;
  name: string;
  avatar: string;
  emailSubscription: 'Subscribed' | 'Not subscribed' | 'Pending';
  location: string;
  orders: number | null;
  amountSpent: number;
}

// Mock Data based on your UI model
const initialCustomers: Customer[] = [
  { id: '1', name: 'Esther Howard', avatar: 'https://i.pravatar.cc/150?img=1', emailSubscription: 'Subscribed', location: 'Great Falls, Maryland', orders: 2, amountSpent: 250.00 },
  { id: '2', name: 'Leslie Alexander', avatar: 'https://i.pravatar.cc/150?img=2', emailSubscription: 'Not subscribed', location: 'Pasadena, Oklahoma', orders: 3, amountSpent: 350.00 },
  { id: '3', name: 'Guy Hawkins', avatar: 'https://i.pravatar.cc/150?img=3', emailSubscription: 'Pending', location: 'Corona, Michigan', orders: null, amountSpent: 0.00 },
  { id: '4', name: 'Savannah Nguyen', avatar: 'https://i.pravatar.cc/150?img=4', emailSubscription: 'Subscribed', location: 'Syracuse, Connecticut', orders: null, amountSpent: 0.00 },
  { id: '5', name: 'Bessie Cooper', avatar: 'https://i.pravatar.cc/150?img=5', emailSubscription: 'Not subscribed', location: 'Lansing, Illinois', orders: 1, amountSpent: 470.00 },
  { id: '6', name: 'Ronald Richards', avatar: 'https://i.pravatar.cc/150?img=6', emailSubscription: 'Pending', location: 'Great Falls, Maryland', orders: 2, amountSpent: 250.00 },
  { id: '7', name: 'Marvin McKinney', avatar: 'https://i.pravatar.cc/150?img=7', emailSubscription: 'Subscribed', location: 'Coppell, Virginia', orders: 2, amountSpent: 150.00 },
];

export const CustomerList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Subscribed': return 'status-subscribed';
      case 'Not subscribed': return 'status-unsubscribed';
      case 'Pending': return 'status-pending';
      default: return '';
    }
  };

  return (
    <div className="customer-container">
      {/* Top Header Section */}
      <div className="customer-header">
        <div>
          <h2>Customers</h2>
          <p className="subtitle">As a new ShopZen member, get ready for an exciting shopping journey with perks.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">⬇ Import</button>
          <button className="btn-secondary">⬆ Export</button>
          <button className="btn-primary">Add Customers</button>
        </div>
      </div>

      {/* KPI Base Info */}
      <div className="customer-kpi">
        <span className="kpi-count"><strong>1</strong> customer</span>
        <span className="kpi-percentage"><strong>100%</strong> of your customer base</span>
      </div>

      {/* Search and Filters Bar */}
      <div className="filter-bar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search customer" 
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

      {/* Data Table */}
      <div className="table-responsive">
        <table className="customer-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}><input type="checkbox" /></th>
              <th>Customers</th>
              <th>Email Subscription</th>
              <th>Location</th>
              <th>Orders</th>
              <th>Amount Spent</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {initialCustomers.map((customer) => (
              <tr key={customer.id}>
                <td><input type="checkbox" /></td>
                <td className="customer-profile-cell">
                  <img src={customer.avatar} alt={customer.name} className="avatar" />
                  <span className="customer-name">{customer.name}</span>
                </td>
                <td>
                  <span className={`status-badge ${getStatusClass(customer.emailSubscription)}`}>
                    • {customer.emailSubscription}
                  </span>
                </td>
                <td>{customer.location}</td>
                <td>{customer.orders !== null ? `${customer.orders} Orders` : 'N/A'}</td>
                <td>${customer.amountSpent.toFixed(2)}</td>
                <td style={{ textAlign: 'center' }} className="action-cell">•••</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="customer-footer">
        <p>Learn more about <a href="#customers">customers</a></p>
      </div>
    </div>
  );
};

export default CustomerList;
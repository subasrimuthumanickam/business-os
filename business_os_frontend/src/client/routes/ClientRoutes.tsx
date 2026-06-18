import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClientLayout from '../components/layout/ClientLayout';

// Import all Views
import ClientDashboardView from '../views/ClientDashboardView';
import CustomerView from '../views/CustomerView';
// import InventoryView from '../views/InventoryView'; 
import InventoryView from '../views/InventoryView';
import BillingView from '../views/BillingView';
import HRMSView from '../views/HRMSView';
import ProjectView from '../views/ProjectView';
import ReportView from '../views/ReportView';
import SettingsView from '../views/SettingsView';

const ClientRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<ClientLayout><Navigate to="dashboard" replace /></ClientLayout>} />
      
      
      {/* Dashboard */}
      <Route path="dashboard" element={<ClientLayout><ClientDashboardView /></ClientLayout>} />
      
      {/* Customers */}
      <Route path="customers" element={<ClientLayout><CustomerView /></ClientLayout>} />
      <Route path="customers/:id" element={<ClientLayout><CustomerView /></ClientLayout>} />
      
      {/* Inventory */}
      {/* <Route path="inventory" element={<ClientLayout><InventoryView /></ClientLayout>} />
      <Route path="inventory/products" element={<ClientLayout><InventoryView /></ClientLayout>} />
      <Route path="inventory/categories" element={<ClientLayout><InventoryView /></ClientLayout>} /> */}
         <Route path="inventory" element={<ClientLayout><InventoryView /></ClientLayout>} />
      {/* Billing */}
      <Route path="billing" element={<ClientLayout><BillingView /></ClientLayout>} />
      <Route path="billing/invoices" element={<ClientLayout><BillingView /></ClientLayout>} />
      <Route path="billing/payments" element={<ClientLayout><BillingView /></ClientLayout>} />
      <Route path="billing/expenses" element={<ClientLayout><BillingView /></ClientLayout>} />
      
      {/* HRMS - Working correctly */}
      <Route path="hrms" element={<ClientLayout><HRMSView /></ClientLayout>} />
      <Route path="hrms/employees" element={<ClientLayout><HRMSView /></ClientLayout>} />
      <Route path="hrms/attendance" element={<ClientLayout><HRMSView /></ClientLayout>} />
      <Route path="hrms/leaves" element={<ClientLayout><HRMSView /></ClientLayout>} />
      
      {/* Projects - Working correctly */}
      <Route path="projects" element={<ClientLayout><ProjectView /></ClientLayout>} />
      <Route path="projects/list" element={<ClientLayout><ProjectView /></ClientLayout>} />
      <Route path="projects/tasks" element={<ClientLayout><ProjectView /></ClientLayout>} />
      <Route path="projects/time-tracker" element={<ClientLayout><ProjectView /></ClientLayout>} />
      
      {/* Reports */}
      <Route path="reports" element={<ClientLayout><ReportView /></ClientLayout>} />
      <Route path="reports/sales" element={<ClientLayout><ReportView /></ClientLayout>} />
      <Route path="reports/inventory" element={<ClientLayout><ReportView /></ClientLayout>} />
      <Route path="reports/employee" element={<ClientLayout><ReportView /></ClientLayout>} />
      
      {/* Settings - NOW FIXED - Same as Projects/HRMS */}
      <Route path="settings" element={<ClientLayout><SettingsView /></ClientLayout>} />
      
      {/* Profile */}
      <Route path="profile" element={<ClientLayout><div>Profile Page - Coming Soon</div></ClientLayout>} />
      
      {/* 404 */}
     
    </Routes>
  );
};

export default ClientRoutes;
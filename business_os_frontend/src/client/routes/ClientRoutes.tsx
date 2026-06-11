import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClientLayout from '../components/layout/ClientLayout';

// Import all Views
import ClientDashboardView from '../views/ClientDashboardView';
import CustomerView from '../views/CustomerView';
import InventoryView from '../views/InventoryView';
import BillingView from '../views/BillingView';
import HRMSView from '../views/HRMSView';
import ProjectView from '../views/ProjectView';
import ReportView from '../views/ReportView';

const ClientRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Wrap each route with ClientLayout and pass children properly */}
      <Route path="/" element={<ClientLayout><Navigate to="dashboard" replace /></ClientLayout>} />
      
      <Route path="dashboard" element={<ClientLayout><ClientDashboardView /></ClientLayout>} />
      
      <Route path="customers" element={<ClientLayout><CustomerView /></ClientLayout>} />
      <Route path="customers/:id" element={<ClientLayout><CustomerView /></ClientLayout>} />
      
      <Route path="inventory" element={<ClientLayout><InventoryView /></ClientLayout>} />
      <Route path="inventory/products" element={<ClientLayout><InventoryView /></ClientLayout>} />
      <Route path="inventory/categories" element={<ClientLayout><InventoryView /></ClientLayout>} />
      
      <Route path="billing" element={<ClientLayout><BillingView /></ClientLayout>} />
      <Route path="billing/invoices" element={<ClientLayout><BillingView /></ClientLayout>} />
      <Route path="billing/payments" element={<ClientLayout><BillingView /></ClientLayout>} />
      <Route path="billing/expenses" element={<ClientLayout><BillingView /></ClientLayout>} />
      
      <Route path="hrms" element={<ClientLayout><HRMSView /></ClientLayout>} />
      <Route path="hrms/employees" element={<ClientLayout><HRMSView /></ClientLayout>} />
      <Route path="hrms/attendance" element={<ClientLayout><HRMSView /></ClientLayout>} />
      <Route path="hrms/leaves" element={<ClientLayout><HRMSView /></ClientLayout>} />
      
      <Route path="projects" element={<ClientLayout><ProjectView /></ClientLayout>} />
      <Route path="projects/list" element={<ClientLayout><ProjectView /></ClientLayout>} />
      <Route path="projects/tasks" element={<ClientLayout><ProjectView /></ClientLayout>} />
      <Route path="projects/time-tracker" element={<ClientLayout><ProjectView /></ClientLayout>} />
      
      <Route path="reports" element={<ClientLayout><ReportView /></ClientLayout>} />
      <Route path="reports/sales" element={<ClientLayout><ReportView /></ClientLayout>} />
      <Route path="reports/inventory" element={<ClientLayout><ReportView /></ClientLayout>} />
      <Route path="reports/employee" element={<ClientLayout><ReportView /></ClientLayout>} />
      
      <Route path="settings" element={<ClientLayout><div>Settings Page - Coming Soon</div></ClientLayout>} />
      <Route path="profile" element={<ClientLayout><div>Profile Page - Coming Soon</div></ClientLayout>} />
      
      <Route path="*" element={<ClientLayout><div>404 - Page Not Found</div></ClientLayout>} />
    </Routes>
  );
};

export default ClientRoutes;
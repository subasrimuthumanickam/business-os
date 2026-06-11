import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './views/login';
import Layout from './components/layout/Layout';
import SuperAdminDashboard from './components/dashboard/SuperAdminDashboard';
import CompaniesPage from './components/dashboard/CompaniesPage';
import RevenuePage from './components/dashboard/RevenuePage';
import SettingsPage from './components/dashboard/SettingsPage';

// Import Client Routes
import ClientRoutes from './client/routes/ClientRoutes';

// Import Client CSS
import './client/styles/client.css';
import './index.css';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<Login />} />
          
          {/* Super Admin Routes */}
          <Route path="/dashboard" element={<Layout><SuperAdminDashboard /></Layout>} />
          <Route path="/companies" element={<Layout><CompaniesPage /></Layout>} />
          <Route path="/revenue" element={<Layout><RevenuePage /></Layout>} />
          <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
          
          {/* Client Routes - All client features under /client/* */}
          <Route path="/client/*" element={<ClientRoutes />} />
          
          {/* Client Login (optional) */}
          <Route path="/client-login" element={<div>Client Login Page</div>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
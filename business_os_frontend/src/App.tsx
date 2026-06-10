import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './views/login';
import Layout from './components/layout/Layout';
import SuperAdminDashboard from './components/dashboard/SuperAdminDashboard';
import CompaniesPage from './components/dashboard/CompaniesPage';
import RevenuePage from './components/dashboard/RevenuePage';
import SettingsPage from './components/dashboard/SettingsPage';
import './index.css';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Always show login page at root */}
          <Route path="/" element={<Login />} />
          
          {/* Dashboard routes - protected */}
          <Route path="/dashboard" element={
            <Layout>
              <SuperAdminDashboard />
            </Layout>
          } />
          
          <Route path="/companies" element={
            <Layout>
              <CompaniesPage />
            </Layout>
          } />
          
          <Route path="/revenue" element={
            <Layout>
              <RevenuePage />
            </Layout>
          } />
          
          <Route path="/settings" element={
            <Layout>
              <SettingsPage />
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
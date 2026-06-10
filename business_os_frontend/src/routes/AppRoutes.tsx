// src/routes/AppRoutes.tsx - Simplified version
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../views/login';
import Layout from '../components/layout/Layout';
import SuperAdminDashboard from '../components/dashboard/SuperAdminDashboard';

const AppRoutes = () => {
  const token = localStorage.getItem('token');
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={
          token ? (
            <Layout>
              <SuperAdminDashboard />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
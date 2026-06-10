 // views/SettingsView.tsx
import React from 'react';
import Layout from '../components/layout/Layout'; 

const SettingsView: React.FC = () => {
  return (
    <Layout>
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">System Settings</h2>
        <p>Application settings and configurations will be managed here.</p>
      </div>
    </Layout>
  );
};

export default SettingsView;

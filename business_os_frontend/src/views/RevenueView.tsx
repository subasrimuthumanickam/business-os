 // views/RevenueView.tsx
import React from 'react';
import Layout from '../components/layout/Layout'; 

const RevenueView: React.FC = () => {
  return (
    <Layout>
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
        <p>Revenue analytics and metrics will be displayed here.</p>
      </div>
    </Layout>
  );
};

export default RevenueView;

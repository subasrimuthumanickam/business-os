import React, { useState } from 'react';
import SalesReport from '../components/reports/SalesReport';
import EmployeeReport from '../components/reports/EmployeeReport';
import InventoryReport from '../components/reports/InventoryReport';

const ReportView: React.FC = () => {
  const [activeReport, setActiveReport] = useState<'sales' | 'employee' | 'inventory'>('sales');

  return (
    <div className="report-view">
      <div className="report-tabs">
        <button 
          className={`report-tab ${activeReport === 'sales' ? 'active' : ''}`}
          onClick={() => setActiveReport('sales')}
        >
          📊 Sales Report
        </button>
        <button 
          className={`report-tab ${activeReport === 'employee' ? 'active' : ''}`}
          onClick={() => setActiveReport('employee')}
        >
          👥 Employee Report
        </button>
        <button 
          className={`report-tab ${activeReport === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveReport('inventory')}
        >
          📦 Inventory Report
        </button>
      </div>
      
      <div className="report-content">
        {activeReport === 'sales' && <SalesReport />}
        {activeReport === 'employee' && <EmployeeReport />}
        {activeReport === 'inventory' && <InventoryReport />}
      </div>
    </div>
  );
};

export default ReportView;
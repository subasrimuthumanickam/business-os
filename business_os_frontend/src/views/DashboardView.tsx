 // views/DashboardView.tsx
import React from 'react';
import { DashboardStats, Company } from '../models/CompanyModel';
import StatsCards from '../components/dashboard/StatsCards';
import CompanyTable from '../components/CompanyTable';

import HeroSection from '../components/HeroSection';

interface DashboardViewProps {
  stats: DashboardStats;
  companies: Company[];
  onSearch: (query: string) => void;
  onOpenModal: () => void;
  onCompanyClick?: (company: Company) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  companies,
  onSearch,
  onOpenModal,
  onCompanyClick
}) => {
  return (
    <section className="dashboard-shell">
      <HeroSection onOpenModal={onOpenModal} />
      <StatsCards stats={stats} />
      <CompanyTable
        companies={companies}
        onSearch={onSearch}
        onAddClick={onOpenModal}
        onCompanyClick={onCompanyClick}
      />
    </section>
  );
};

export default DashboardView;

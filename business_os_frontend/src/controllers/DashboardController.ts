 // controllers/DashboardController.ts
import React, { useState, useEffect, useCallback } from 'react';
import CompanyModel, { Company, DashboardStats } from '../models/CompanyModel';
import UserModel from '../models/UserModel';
import DashboardView from '../views/DashboardView';

class DashboardController {
  private companyModel: CompanyModel;
  private userModel: UserModel;
  private setCompanies: React.Dispatch<React.SetStateAction<Company[]>> | null = null;
  private setStats: React.Dispatch<React.SetStateAction<DashboardStats>> | null = null;
  private setModalOpen: React.Dispatch<React.SetStateAction<boolean>> | null = null;

  constructor() {
    this.companyModel = new CompanyModel();
    this.userModel = new UserModel();
  }

  initialize(
    setCompanies: React.Dispatch<React.SetStateAction<Company[]>>,
    setStats: React.Dispatch<React.SetStateAction<DashboardStats>>,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  ): void {
    this.setCompanies = setCompanies;
    this.setStats = setStats;
    this.setModalOpen = setModalOpen;
    this.loadData();
  }

  private loadData(): void {
    if (this.setCompanies) {
      this.setCompanies(this.companyModel.getCompanies());
    }
    if (this.setStats) {
      this.setStats(this.companyModel.getStats());
    }
  }

  handleSearch = (query: string): void => {
    if (this.setCompanies) {
      const filtered = this.companyModel.searchCompanies(query);
      this.setCompanies(filtered);
    }
  };

  handleOpenModal = (): void => {
    if (this.setModalOpen) {
      this.setModalOpen(true);
    }
  };

  handleCloseModal = (): void => {
    if (this.setModalOpen) {
      this.setModalOpen(false);
    }
  };

  handleCompanyCreated = (companyData: { name: string; email: string; plan: Company['plan'] }): void => {
    const newCompany = this.companyModel.addCompany(companyData);
    
    if (this.setCompanies && this.setStats) {
      this.setCompanies(this.companyModel.getCompanies());
      this.setStats(this.companyModel.getStats());
    }
    
    this.handleCloseModal();
  };

  getUserInfo() {
    return this.userModel.getUser();
  }
}

// React Hook for using the controller
export const useDashboardController = () => {
  const [controller] = useState(() => new DashboardController());
  const [companies, setCompanies] = useState<Company[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalCompanies: 0,
    activeCompanies: 0,
    trialCompanies: 0,
    revenue: 0
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    controller.initialize(setCompanies, setStats, setShowModal);
  }, []);

  return {
    companies,
    stats,
    showModal,
    handleSearch: controller.handleSearch,
    handleOpenModal: controller.handleOpenModal,
    handleCloseModal: () => setShowModal(false),
    handleCompanyCreated: controller.handleCompanyCreated,
    getUserInfo: () => controller.getUserInfo()
  };
};

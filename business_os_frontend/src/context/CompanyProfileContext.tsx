import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CompanyProfileContextType {
  showCompanyProfile: boolean;
  openCompanyProfile: () => void;
  closeCompanyProfile: () => void;
}

const CompanyProfileContext = createContext<CompanyProfileContextType | undefined>(undefined);

export const CompanyProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showCompanyProfile, setShowCompanyProfile] = useState(false);

  const openCompanyProfile = () => setShowCompanyProfile(true);
  const closeCompanyProfile = () => setShowCompanyProfile(false);

  return (
    <CompanyProfileContext.Provider value={{ showCompanyProfile, openCompanyProfile, closeCompanyProfile }}>
      {children}
    </CompanyProfileContext.Provider>
  );
};

export const useCompanyProfileView = () => {
  const ctx = useContext(CompanyProfileContext);
  if (!ctx) {
    throw new Error('useCompanyProfileView must be used within a CompanyProfileProvider');
  }
  return ctx;
};
 // models/CompanyModel.ts
export interface Company {
  id: number;
  name: string;
  email: string;
  plan: 'starter' | 'business' | 'enterprise';
  status: 'active' | 'inactive' | 'trial';
  createdAt: string;
}

export interface DashboardStats {
  totalCompanies: number;
  activeCompanies: number;
  trialCompanies: number;
  revenue: number;
}

export interface CompanyFormData {
  name: string;
  email: string;
  plan: Company['plan'];
}

class CompanyModel {
  private companies: Company[];
  private stats: DashboardStats;

  constructor() {
    this.companies = [
      { id: 1, name: 'Acme Corp', email: 'admin@acme.com', plan: 'business', status: 'active', createdAt: '2024-01-15' },
      { id: 2, name: 'TechStart', email: 'hello@techstart.com', plan: 'starter', status: 'active', createdAt: '2024-02-03' },
      { id: 3, name: 'Global Inc', email: 'info@global.com', plan: 'enterprise', status: 'active', createdAt: '2024-03-22' }
    ];
    
    this.stats = {
      totalCompanies: 247,
      activeCompanies: 198,
      trialCompanies: 32,
      revenue: 24500
    };
  }

  getCompanies(): Company[] {
    return [...this.companies];
  }

  getStats(): DashboardStats {
    return { ...this.stats };
  }

  addCompany(companyData: CompanyFormData): Company {
    const newCompany: Company = {
      id: Date.now(),
      ...companyData,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    this.companies = [newCompany, ...this.companies];
    this.updateStats();
    return newCompany;
  }

  searchCompanies(query: string): Company[] {
    if (!query) return this.getCompanies();
    
    const lowerQuery = query.toLowerCase();
    return this.companies.filter(company =>
      company.name.toLowerCase().includes(lowerQuery) ||
      company.email.toLowerCase().includes(lowerQuery)
    );
  }

  private updateStats(): void {
    this.stats = {
      ...this.stats,
      totalCompanies: this.stats.totalCompanies + 1,
      activeCompanies: this.stats.activeCompanies + 1
    };
  }
}

export default CompanyModel;

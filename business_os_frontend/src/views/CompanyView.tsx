 // views/CompanyView.tsx (CompaniesPage)
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import CompanyModel, { Company } from '../models/CompanyModel';

const CompanyView: React.FC = () => {
  const [model] = useState(() => new CompanyModel());
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = () => {
    setCompanies(model.getCompanies());
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = model.searchCompanies(query);
    setCompanies(filtered);
  };

  return (
    <Layout>
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Companies Management</h2>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search companies..."
            className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-950/90 text-gray-300">
              <tr>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="border-t border-gray-800 hover:bg-gray-800/40">
                  <td className="px-4 py-4">
                    <p className="font-semibold text-white">{company.name}</p>
                    <p className="text-xs text-gray-400">{company.email}</p>
                  </td>
                  <td className="px-4 py-4 capitalize">{company.plan}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                      {company.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-400">
                    {new Date(company.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CompanyView;

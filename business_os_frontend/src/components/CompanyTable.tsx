 // components/CompanyTable.tsx
import React, { useState } from 'react';
import { Company } from '../models/CompanyModel';
import Card from './ui/Card';  
import { Button } from './ui/Button'; 

interface CompanyTableProps {
  companies: Company[];
  onSearch: (query: string) => void;
  onAddClick: () => void;
  onCompanyClick?: (company: Company) => void;
}

const CompanyTable: React.FC<CompanyTableProps> = ({
  companies,
  onSearch,
  onAddClick,
  onCompanyClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <Card title="Companies Management">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <input
          type="text"
          placeholder="Search companies..."
          className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500 lg:max-w-sm"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button onClick={onAddClick}>+ New Company</Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-950/90 text-gray-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Company</th>
              <th className="px-4 py-3 font-semibold">Plan</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Created</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr
                key={company.id}
                className="border-t border-gray-800 text-gray-200 hover:bg-gray-800/40 cursor-pointer"
                onClick={() => onCompanyClick?.(company)}
              >
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
    </Card>
  );
};

export default CompanyTable;

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextValue {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

/**
 * Wraps the app (in ClientLayout) so the top navbar search bar and any
 * page that wants to filter by it (Inventory, Customers, Billing, etc.)
 * share the same search term. The navbar input writes to this; pages
 * read from it via useSearch() and apply it to their own list filtering.
 *
 * Each page decides what to *do* with searchTerm (e.g. Inventory filters
 * products by name/SKU) — this context only holds the shared string.
 */
export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextValue => {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return ctx;
};
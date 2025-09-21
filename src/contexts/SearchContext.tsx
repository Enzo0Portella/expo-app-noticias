import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SearchContextData {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  executeSearch: (query: string) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
}

const SearchContext = createContext<SearchContextData>({} as SearchContextData);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const executeSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, executeSearch, isSearching, setIsSearching }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};

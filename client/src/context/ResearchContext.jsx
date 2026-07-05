import { createContext, useContext, useState, useCallback } from 'react';

const ResearchContext = createContext(null);

/**
 * Provides research state management across pages.
 * Stores the current research results so they persist during navigation.
 */
export function ResearchProvider({ children }) {
  const [results, setResults] = useState(null);
  const [companyName, setCompanyName] = useState('');

  const saveResults = useCallback((company, data) => {
    setCompanyName(company);
    setResults(data);
  }, []);

  const clearResults = useCallback(() => {
    setCompanyName('');
    setResults(null);
  }, []);

  return (
    <ResearchContext.Provider
      value={{ results, companyName, saveResults, clearResults }}
    >
      {children}
    </ResearchContext.Provider>
  );
}

/**
 * Hook to access research context.
 */
export function useResearchContext() {
  const context = useContext(ResearchContext);
  if (!context) {
    throw new Error('useResearchContext must be used within a ResearchProvider');
  }
  return context;
}

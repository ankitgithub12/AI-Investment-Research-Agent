import React, { createContext, useState, useContext } from 'react';

const ResearchContext = createContext();

/**
 * Context Provider to store and share the research report data between routes.
 */
export function ResearchProvider({ children }) {
  const [researchData, setResearchData] = useState(null);

  return (
    <ResearchContext.Provider value={{ researchData, setResearchData }}>
      {children}
    </ResearchContext.Provider>
  );
}

export function useResearchData() {
  const context = useContext(ResearchContext);
  if (!context) {
    throw new Error('useResearchData must be used within a ResearchProvider');
  }
  return context;
}

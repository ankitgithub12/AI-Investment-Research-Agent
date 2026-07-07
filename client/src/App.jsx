import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ResearchProvider } from './context/ResearchContext.jsx';
import Home from './pages/Home.jsx';
import Results from './pages/Results.jsx';

// Create React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ResearchProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </Router>
      </ResearchProvider>
    </QueryClientProvider>
  );
}

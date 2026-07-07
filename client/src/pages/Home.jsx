import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResearch } from '../hooks/useResearch.js';
import { useResearchData } from '../context/ResearchContext.jsx';
import { Search, Loader2, ArrowRight, BarChart3, AlertCircle } from 'lucide-react';

const LOADING_STEPS = [
  'Resolving company name and stock ticker...',
  'Fetching real-time quotes & key financials via Yahoo Finance...',
  'Gathering recent news & media articles using Tavily Search...',
  'Analyzing business model & fundamental competitive advantage...',
  'Calculating financial score, growth, margins, and debt metrics...',
  'Gauging market sentiment & reading analyst consensus...',
  'Conducting SWOT analysis & assessing regulatory risks...',
  'Synthesizing recommendation and packaging final report...'
];

export default function Home() {
  const [companyInput, setCompanyInput] = useState('');
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [validationError, setValidationError] = useState('');
  
  const navigate = useNavigate();
  const { setResearchData } = useResearchData();
  const researchMutation = useResearch();

  // Cycle through loading steps to keep the user engaged
  useEffect(() => {
    let interval;
    if (researchMutation.isPending) {
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 5000);
    } else {
      setLoadingStepIdx(0);
    }
    return () => clearInterval(interval);
  }, [researchMutation.isPending]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');
    
    const trimmed = companyInput.trim();
    if (!trimmed) {
      setValidationError('Please enter a company name.');
      return;
    }
    if (trimmed.length < 2) {
      setValidationError('Company name must be at least 2 characters.');
      return;
    }

    researchMutation.mutate(trimmed, {
      onSuccess: (response) => {
        if (response.success && response.data) {
          setResearchData(response.data);
          navigate('/results');
        } else {
          setValidationError(response.error || 'Failed to complete research.');
        }
      },
      onError: (err) => {
        const errMsg = err.response?.data?.message || err.message || 'An unexpected error occurred. Please try again.';
        setValidationError(errMsg);
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-[#0A0A0B]">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-2xl text-center z-10 animate-fade-in">
        {/* Logo/Icon */}
        <div className="inline-flex items-center justify-center p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6">
          <BarChart3 className="h-7 w-7" />
        </div>

        {/* Title */}
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-[#F4F4F5]">
          AI Investment Research Agent
        </h1>
        
        {/* Description */}
        <p className="mt-4 text-sm sm:text-base text-dark-text-secondary max-w-xl mx-auto leading-relaxed">
          Instantly research any public company. Get a comprehensive, multi-step fundamental analysis, real-time financial health scores, news sentiment, and a clear Invest/Pass recommendation.
        </p>

        {/* Form */}
        {!researchMutation.isPending ? (
          <form onSubmit={handleSubmit} className="mt-10 relative">
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-text-muted" />
                <input
                  type="text"
                  placeholder="Enter company name (e.g., Apple, Tesla, Nvidia)"
                  value={companyInput}
                  onChange={(e) => setCompanyInput(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-dark-input border border-dark-border rounded-xl text-dark-text-primary placeholder-dark-text-muted focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/60 transition-all font-medium text-sm"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-brand hover:bg-brand-dark active:scale-[0.98] text-white font-medium rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand/10 shrink-0"
              >
                Start Research
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Error Message */}
            {validationError && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg flex items-center gap-2 text-xs text-left animate-fade-in">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}
          </form>
        ) : (
          /* Loading / Pipeline State */
          <div className="mt-12 p-8 bg-dark-card border border-dark-border rounded-2xl flex flex-col items-center animate-fade-in">
            <Loader2 className="h-10 w-10 text-brand animate-spin mb-4" />
            <h3 className="font-display font-semibold text-lg text-dark-text-primary">
              Analyzing {companyInput}...
            </h3>
            
            <p className="mt-2 text-xs text-dark-text-muted max-w-sm h-10 flex items-center justify-center">
              {LOADING_STEPS[loadingStepIdx]}
            </p>

            {/* Simulated progress checklist */}
            <div className="mt-6 w-full max-w-md space-y-2.5 text-left border-t border-dark-border/40 pt-5">
              <div className="flex items-center gap-3 text-xs">
                <div className={`h-2 w-2 rounded-full ${loadingStepIdx > 0 ? 'bg-emerald-500' : 'bg-brand animate-ping'}`} />
                <span className={loadingStepIdx > 0 ? 'text-dark-text-muted line-through' : 'text-dark-text-primary'}>
                  1. Gather Company overview & financials
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className={`h-2 w-2 rounded-full ${loadingStepIdx > 2 ? 'bg-emerald-500' : loadingStepIdx > 0 ? 'bg-brand animate-ping' : 'bg-zinc-800'}`} />
                <span className={loadingStepIdx > 2 ? 'text-dark-text-muted line-through' : loadingStepIdx > 0 ? 'text-dark-text-primary' : 'text-dark-text-muted'}>
                  2. Aggregate search results & news articles
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className={`h-2 w-2 rounded-full ${loadingStepIdx > 6 ? 'bg-emerald-500' : loadingStepIdx > 2 ? 'bg-brand animate-ping' : 'bg-zinc-800'}`} />
                <span className={loadingStepIdx > 6 ? 'text-dark-text-muted line-through' : loadingStepIdx > 2 ? 'text-dark-text-primary' : 'text-dark-text-muted'}>
                  3. Execute multi-chain LLM analyses
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className={`h-2 w-2 rounded-full ${loadingStepIdx === 7 ? 'bg-brand animate-ping' : 'bg-zinc-800'}`} />
                <span className={loadingStepIdx === 7 ? 'text-dark-text-primary' : 'text-dark-text-muted'}>
                  4. Synthesize final recommendation JSON
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer/Quick Info */}
        {!researchMutation.isPending && (
          <div className="mt-16 flex items-center justify-center gap-8 text-[11px] text-dark-text-muted font-medium tracking-wide uppercase">
            <span>⚡ Configured for Gemini 2.0</span>
            <span className="h-3 w-[1px] bg-zinc-800"></span>
            <span>📊 Real-time Stock Metrics</span>
            <span className="h-3 w-[1px] bg-zinc-800"></span>
            <span>🔍 Comprehensive Web Search</span>
          </div>
        )}
      </div>
    </div>
  );
}

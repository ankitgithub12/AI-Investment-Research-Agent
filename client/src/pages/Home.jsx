import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResearch } from '../hooks/useResearch.js';
import { useResearchData } from '../context/ResearchContext.jsx';
import { Search, Loader2, ArrowRight, BarChart3, AlertCircle, Zap, Globe, TrendingUp, Shield, Brain, Sparkles } from 'lucide-react';

const LOADING_STEPS = [
  'Resolving company name and stock ticker...',
  'Fetching real-time quotes & key financials via Financial Modeling Prep...',
  'Gathering recent news & media articles using Tavily Search...',
  'Analyzing business model & fundamental competitive advantage...',
  'Calculating financial score, growth, margins, and debt metrics...',
  'Gauging market sentiment & reading analyst consensus...',
  'Conducting SWOT analysis & assessing regulatory risks...',
  'Synthesizing recommendation and packaging final report...'
];

const FEATURES = [
  { icon: TrendingUp, label: 'Real-time Financials', color: 'text-accent-emerald' },
  { icon: Brain, label: 'AI-Powered Analysis', color: 'text-brand' },
  { icon: Shield, label: 'Risk Assessment', color: 'text-accent-amber' },
  { icon: Globe, label: 'News Sentiment', color: 'text-accent-cyan' },
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden bg-dark-bg">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 bg-mesh pointer-events-none" />
      
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-100/30 blur-[100px] pointer-events-none animate-float delay-300" />

      <div className="w-full max-w-2xl text-center z-10 py-12">
        {/* Logo/Icon */}
        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-white border border-slate-200/80 text-brand mb-8 animate-fade-in shadow-premium shadow-glow-indigo/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Sparkles className="h-9 w-9 relative z-10 animate-pulse text-brand" />
        </div>

        {/* Title */}
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
            AI Investment Research
          </span>
        </h1>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-text-primary mt-2 animate-fade-in delay-100">
          Agent
        </h2>
        
        {/* Description */}
        <p className="mt-6 text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed animate-fade-in delay-200">
          Instantly research any public company. Get a comprehensive AI-driven fundamental analysis, real-time financial health scores, news sentiment, and a clear Invest/Pass recommendation.
        </p>

        {/* Feature Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-in delay-300">
          {FEATURES.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="pill bg-white border border-slate-200/80 text-text-secondary hover:border-brand/30 hover:text-text-primary shadow-sm hover:shadow transition-smooth cursor-default"
            >
              <Icon className={`h-4 w-4 ${color}`} />
              <span className="font-medium text-xs tracking-wide">{label}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        {!researchMutation.isPending ? (
          <form onSubmit={handleSubmit} className="mt-10 relative animate-fade-in delay-400">
            <div className="glass-card rounded-2xl p-2 sm:p-2.5 shadow-xl shadow-indigo-100/50 border border-slate-200/60 focus-within:border-brand/40 focus-within:ring-4 focus-within:ring-brand/5 transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                  <input
                    id="company-search-input"
                    type="text"
                    placeholder="Enter company name (e.g., Apple, Tesla, Nvidia)"
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-brand/50 transition-all font-medium text-sm"
                    autoFocus
                  />
                </div>
                <button
                  id="start-research-btn"
                  type="submit"
                  className="px-7 py-3.5 btn-premium-gradient hover:scale-[1.02] active:scale-[0.98] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 shrink-0"
                >
                  Start Research
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {validationError && (
              <div className="mt-4 p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center gap-2.5 text-xs text-left animate-fade-in shadow-sm">
                <AlertCircle className="h-4.5 w-4.5 shrink-0 text-rose-500" />
                <span className="font-medium">{validationError}</span>
              </div>
            )}
          </form>
        ) : (
          /* Loading / Pipeline State */
          <div className="mt-12 glass-card rounded-3xl p-8 sm:p-10 flex flex-col items-center animate-fade-in-scale shadow-xl shadow-indigo-100/30 border border-slate-200/50">
            <div className="relative flex items-center justify-center h-20 w-20 mb-4">
              <div className="absolute inset-0 bg-brand/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute inset-0 border-2 border-brand/20 border-t-brand rounded-full animate-spin" />
              <Loader2 className="h-7 w-7 text-brand animate-spin absolute" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-text-primary mt-4">
              Analyzing <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">{companyInput}</span>
            </h3>
            
            <p className="mt-3 text-xs text-text-secondary font-medium tracking-wide max-w-sm h-10 flex items-center justify-center text-center transition-all duration-500 bg-slate-50 px-4 rounded-lg border border-slate-100">
              {LOADING_STEPS[loadingStepIdx]}
            </p>

            {/* Progress bar */}
            <div className="w-full max-w-md mt-6 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
              <div 
                className="h-full bg-gradient-to-r from-brand to-accent-cyan rounded-full transition-all duration-[5000ms] ease-linear"
                style={{ width: `${Math.min(((loadingStepIdx + 1) / LOADING_STEPS.length) * 100, 95)}%` }}
              />
            </div>

            {/* Simulated progress checklist */}
            <div className="mt-8 w-full max-w-md space-y-3.5 text-left border-t border-slate-100 pt-6">
              {[
                { label: 'Gather company overview & financials', threshold: 0 },
                { label: 'Aggregate search results & news articles', threshold: 2 },
                { label: 'Execute multi-chain LLM analyses', threshold: 4 },
                { label: 'Synthesize final recommendation', threshold: 7 },
              ].map(({ label, threshold }, i) => {
                const isComplete = loadingStepIdx > threshold + 1;
                const isActive = loadingStepIdx >= threshold && !isComplete;
                return (
                  <div key={i} className="flex items-center gap-3.5 text-xs font-medium">
                    <div className={`h-3.5 w-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isComplete 
                        ? 'bg-accent-emerald text-white shadow-[0_0_8px_rgba(16,185,129,0.3)]' 
                        : isActive 
                        ? 'bg-brand text-white animate-pulse scale-110 shadow-[0_0_8px_rgba(99,102,241,0.3)]' 
                        : 'bg-slate-200'
                    }`}>
                      {isComplete && (
                        <svg className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`transition-colors duration-300 ${
                      isComplete 
                        ? 'text-text-muted line-through font-normal' 
                        : isActive 
                        ? 'text-brand font-bold' 
                        : 'text-text-secondary'
                    }`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer/Quick Info */}
        {!researchMutation.isPending && (
          <div className="mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-text-muted font-bold tracking-wider uppercase animate-fade-in delay-500">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200/60 rounded-xl shadow-sm">
              <Zap className="h-3.5 w-3.5 text-accent-amber" /> Gemini 2.0 Flash
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200/60 rounded-xl shadow-sm">
              <BarChart3 className="h-3.5 w-3.5 text-brand" /> Real-time Metrics
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200/60 rounded-xl shadow-sm">
              <Globe className="h-3.5 w-3.5 text-accent-cyan" /> Web-Scale Search
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

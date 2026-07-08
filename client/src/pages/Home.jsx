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
  { icon: Brain, label: 'AI-Powered Analysis', color: 'text-brand-light' },
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
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-brand/8 blur-[100px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent-cyan/6 blur-[80px] pointer-events-none animate-float delay-300" />

      <div className="w-full max-w-2xl text-center z-10">
        {/* Logo/Icon */}
        <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-brand/10 border border-brand/20 text-brand-light mb-8 animate-fade-in glow-brand">
          <Sparkles className="h-8 w-8" />
        </div>

        {/* Title */}
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gradient animate-fade-in">
          AI Investment Research
        </h1>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-text-primary mt-1 animate-fade-in delay-100">
          Agent
        </h2>
        
        {/* Description */}
        <p className="mt-5 text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed animate-fade-in delay-200">
          Instantly research any public company. Get a comprehensive AI-driven fundamental analysis, real-time financial health scores, news sentiment, and a clear Invest/Pass recommendation.
        </p>

        {/* Feature Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-in delay-300">
          {FEATURES.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="pill bg-dark-card border border-dark-border text-text-secondary hover:border-dark-border-hover transition-smooth"
            >
              <Icon className={`h-3.5 w-3.5 ${color}`} />
              {label}
            </div>
          ))}
        </div>

        {/* Form */}
        {!researchMutation.isPending ? (
          <form onSubmit={handleSubmit} className="mt-10 relative animate-fade-in delay-400">
            <div className="glass-card rounded-2xl p-2 sm:p-2.5">
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                  <input
                    id="company-search-input"
                    type="text"
                    placeholder="Enter company name (e.g., Apple, Tesla, Nvidia)"
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-dark-input border border-dark-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/30 transition-all font-medium text-sm"
                    autoFocus
                  />
                </div>
                <button
                  id="start-research-btn"
                  type="submit"
                  className="px-7 py-3.5 bg-gradient-to-r from-brand to-brand-dark hover:from-brand-light hover:to-brand active:scale-[0.97] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand/20 shrink-0"
                >
                  Start Research
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {validationError && (
              <div className="mt-4 p-3 bg-accent-rose/10 border border-accent-rose/20 text-accent-rose rounded-lg flex items-center gap-2 text-xs text-left animate-fade-in">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}
          </form>
        ) : (
          /* Loading / Pipeline State */
          <div className="mt-12 glass-card rounded-2xl p-8 flex flex-col items-center animate-fade-in-scale">
            <div className="relative">
              <div className="absolute inset-0 bg-brand/20 rounded-full blur-xl animate-pulse" />
              <Loader2 className="h-12 w-12 text-brand-light animate-spin relative" />
            </div>
            <h3 className="font-display font-bold text-xl text-text-primary mt-6">
              Analyzing <span className="text-gradient">{companyInput}</span>
            </h3>
            
            <p className="mt-3 text-xs text-text-muted max-w-sm h-10 flex items-center justify-center text-center transition-all duration-500">
              {LOADING_STEPS[loadingStepIdx]}
            </p>

            {/* Progress bar */}
            <div className="w-full max-w-md mt-6 h-1 bg-dark-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand to-accent-cyan rounded-full transition-all duration-[5000ms] ease-linear"
                style={{ width: `${Math.min(((loadingStepIdx + 1) / LOADING_STEPS.length) * 100, 95)}%` }}
              />
            </div>

            {/* Simulated progress checklist */}
            <div className="mt-6 w-full max-w-md space-y-3 text-left border-t border-dark-border/60 pt-5">
              {[
                { label: 'Gather company overview & financials', threshold: 0 },
                { label: 'Aggregate search results & news articles', threshold: 2 },
                { label: 'Execute multi-chain LLM analyses', threshold: 4 },
                { label: 'Synthesize final recommendation', threshold: 7 },
              ].map(({ label, threshold }, i) => {
                const isComplete = loadingStepIdx > threshold + 1;
                const isActive = loadingStepIdx >= threshold && !isComplete;
                return (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <div className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                      isComplete 
                        ? 'bg-accent-emerald shadow-[0_0_8px_rgba(52,211,153,0.4)]' 
                        : isActive 
                        ? 'bg-brand-light animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.4)]' 
                        : 'bg-dark-border'
                    }`} />
                    <span className={`transition-colors duration-300 ${
                      isComplete 
                        ? 'text-text-muted line-through' 
                        : isActive 
                        ? 'text-text-primary' 
                        : 'text-text-muted'
                    }`}>
                      {i + 1}. {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer/Quick Info */}
        {!researchMutation.isPending && (
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[11px] text-text-muted font-semibold tracking-wider uppercase animate-fade-in delay-500">
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-accent-amber" /> Gemini 2.0 Flash
            </span>
            <span className="hidden sm:block h-3 w-[1px] bg-dark-border" />
            <span className="flex items-center gap-1.5">
              <BarChart3 className="h-3.5 w-3.5 text-brand-light" /> Real-time Metrics
            </span>
            <span className="hidden sm:block h-3 w-[1px] bg-dark-border" />
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-accent-cyan" /> Web-Scale Search
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

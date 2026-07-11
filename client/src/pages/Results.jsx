import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResearchData } from '../context/ResearchContext.jsx';
import RecommendationBadge from '../components/RecommendationBadge.jsx';
import FinancialHealthCard from '../components/FinancialHealthCard.jsx';
import SentimentGauge from '../components/SentimentGauge.jsx';
import ScoreRadarChart from '../components/ScoreRadarChart.jsx';
import RiskOpportunityList from '../components/RiskOpportunityList.jsx';
import { ArrowLeft, RefreshCw, BarChart2, Award, FileText, ListOrdered, Calendar, Clock } from 'lucide-react';

export default function Results() {
  const { researchData } = useResearchData();
  const navigate = useNavigate();

  // Redirect to home if no research data is loaded
  useEffect(() => {
    if (!researchData) {
      navigate('/');
    }
  }, [researchData, navigate]);

  if (!researchData) {
    return null;
  }

  const {
    company,
    ticker,
    recommendation,
    confidence,
    investmentScore,
    risk,
    marketSentiment,
    summary,
    businessOverview,
    financialHealth,
    risks,
    opportunities,
    reasoning,
    processingTime
  } = researchData;

  const handleReset = () => {
    navigate('/');
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary px-4 py-8 sm:px-6 lg:px-8 relative">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh pointer-events-none" />

      {/* Dashboard Max Width Wrapper */}
      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 animate-fade-in border-b border-slate-200/50">
          <div className="flex items-center gap-3.5">
            <button
              id="back-btn"
              onClick={handleReset}
              className="p-3 bg-white border border-slate-200 shadow-sm text-text-secondary hover:text-brand hover:border-brand/40 rounded-xl transition-smooth shrink-0 hover:shadow"
              title="Research another company"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-gradient">
                  {company}
                </h1>
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-brand/10 border border-brand/20 text-brand text-[11px] font-bold rounded-lg relative overflow-hidden">
                  <span className="h-1.5 w-1.5 bg-brand rounded-full animate-ping" />
                  <span>{ticker}</span>
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-text-muted font-semibold">
                <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 border border-slate-200/50 rounded-lg shadow-sm">
                  <Calendar className="h-3.5 w-3.5 text-brand" />
                  {formattedDate}
                </span>
                {processingTime && (
                  <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 border border-slate-200/50 rounded-lg shadow-sm">
                    <Clock className="h-3.5 w-3.5 text-accent-cyan" />
                    Completed in {processingTime}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 self-start sm:self-center">
            <RecommendationBadge recommendation={recommendation} confidence={confidence} />
            <button
              id="new-research-btn"
              onClick={handleReset}
              className="px-4.5 py-2.5 bg-white border border-slate-200 shadow-sm text-text-primary hover:text-brand hover:border-brand/40 text-xs font-bold rounded-xl transition-smooth flex items-center gap-2 hover:shadow"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              New Research
            </button>
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Executive Summary */}
            <div className="glass-card rounded-2xl p-6 sm:p-7 card-hover animate-fade-in delay-100 relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-brand before:rounded-l-2xl">
              <div className="flex items-center gap-2.5 mb-4 pl-2">
                <div className="p-2 bg-brand/10 rounded-xl text-brand">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Executive Summary
                </h2>
              </div>
              <p className="text-sm font-medium text-text-primary leading-relaxed pl-2 whitespace-pre-line">
                {summary}
              </p>
            </div>

            {/* Business Overview */}
            <div className="glass-card rounded-2xl p-6 sm:p-7 card-hover animate-fade-in delay-200 relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-accent-cyan before:rounded-l-2xl">
              <div className="flex items-center gap-2.5 mb-4 pl-2">
                <div className="p-2 bg-accent-cyan/10 rounded-xl text-accent-cyan">
                  <BarChart2 className="h-4.5 w-4.5" />
                </div>
                <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Business Operations & Moat
                </h2>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed pl-2 whitespace-pre-line">
                {businessOverview}
              </p>
            </div>

            {/* Financial Health Component */}
            <div className="animate-fade-in delay-300">
              <FinancialHealthCard financialHealth={financialHealth} />
            </div>

            {/* Risks & Opportunities Component */}
            <div className="animate-fade-in delay-400">
              <RiskOpportunityList risks={risks} opportunities={opportunities} />
            </div>

            {/* Analytical Reasoning Steps */}
            <div className="glass-card rounded-2xl p-6 sm:p-7 card-hover animate-fade-in delay-500">
              <div className="flex items-center gap-2.5 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-accent-violet/10 rounded-xl text-accent-violet">
                  <ListOrdered className="h-4.5 w-4.5" />
                </div>
                <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Investment Decision Reasoning
                </h2>
              </div>
              <div className="space-y-6 pl-1 relative">
                {Array.isArray(reasoning) && reasoning.map((item, idx) => (
                  <div key={idx} className="timeline-item flex gap-4">
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-br from-brand to-accent-cyan text-white text-xs font-extrabold shadow-sm shrink-0 z-10 relative">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-text-secondary leading-relaxed pt-0.5 animate-fade-in">
                      {item}
                    </p>
                  </div>
                ))}
                {(!Array.isArray(reasoning) || reasoning.length === 0) && (
                  <p className="text-sm text-text-muted italic">No reasoning breakdown available.</p>
                )}
              </div>
            </div>

          </div>

          {/* Sidebar Column (1/3 width) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Metrics Summary Widget */}
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-center gap-5 card-hover animate-fade-in delay-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand/5 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-2.5 pb-3.5 border-b border-slate-100 relative z-10">
                <div className="p-2 bg-accent-amber/10 rounded-xl text-accent-amber">
                  <Award className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Investment Index
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-200/50 hover:bg-slate-50 transition-smooth">
                  <span className="text-[10px] text-text-muted font-extrabold uppercase tracking-wider block">
                    Score
                  </span>
                  <div className="text-3xl font-black text-gradient mt-1.5 font-display flex items-baseline">
                    {investmentScore}
                    <span className="text-xs text-text-muted font-bold ml-1">/100</span>
                  </div>
                </div>
                <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-200/50 hover:bg-slate-50 transition-smooth">
                  <span className="text-[10px] text-text-muted font-extrabold uppercase tracking-wider block">
                    Risk Level
                  </span>
                  <div className={`text-2xl font-black mt-1.5 font-display ${
                    risk?.toLowerCase() === 'low' 
                      ? 'text-accent-emerald' 
                      : risk?.toLowerCase() === 'medium'
                      ? 'text-accent-amber'
                      : 'text-accent-rose'
                  }`}>
                    {risk || 'Medium'}
                  </div>
                </div>
              </div>
            </div>

            {/* Sentiment Indicator Widget */}
            <div className="animate-fade-in delay-200">
              <SentimentGauge sentiment={marketSentiment} />
            </div>

            {/* Recharts Radar Score Widget */}
            <div className="animate-fade-in delay-300">
              <ScoreRadarChart 
                investmentScore={investmentScore} 
                financialScore={financialHealth?.score} 
                confidence={confidence} 
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

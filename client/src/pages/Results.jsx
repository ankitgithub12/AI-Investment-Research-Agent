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
    <div className="min-h-screen bg-dark-bg text-text-primary px-4 py-6 sm:px-6 lg:px-8 relative">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh pointer-events-none" />

      {/* Dashboard Max Width Wrapper */}
      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 animate-fade-in">
          <div className="flex items-center gap-3">
            <button
              id="back-btn"
              onClick={handleReset}
              className="p-2.5 glass-card hover:border-brand/30 text-text-secondary hover:text-text-primary rounded-xl transition-smooth shrink-0"
              title="Research another company"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-gradient">
                  {company}
                </h1>
                <span className="px-2.5 py-1 bg-brand/10 border border-brand/20 text-brand-light text-[11px] font-bold rounded-lg">
                  {ticker}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1.5 text-xs text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  {formattedDate}
                </span>
                {processingTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
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
              className="px-4 py-2.5 glass-card hover:border-brand/30 text-text-primary text-xs font-semibold rounded-xl transition-smooth flex items-center gap-2"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              New Research
            </button>
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Main Content Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-5">
            
            {/* Executive Summary */}
            <div className="glass-card gradient-border rounded-xl p-6 card-hover animate-fade-in delay-100">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-1.5 bg-brand/10 rounded-lg">
                  <FileText className="h-4 w-4 text-brand-light" />
                </div>
                <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Executive Summary
                </h2>
              </div>
              <p className="text-sm font-medium text-text-primary leading-relaxed">
                {summary}
              </p>
            </div>

            {/* Business Overview */}
            <div className="glass-card gradient-border rounded-xl p-6 card-hover animate-fade-in delay-200">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-1.5 bg-accent-cyan/10 rounded-lg">
                  <BarChart2 className="h-4 w-4 text-accent-cyan" />
                </div>
                <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Business Operations & Moat
                </h2>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
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
            <div className="glass-card gradient-border rounded-xl p-6 card-hover animate-fade-in delay-500">
              <div className="flex items-center gap-2.5 mb-4 border-b border-dark-border/60 pb-3">
                <div className="p-1.5 bg-accent-violet/10 rounded-lg">
                  <ListOrdered className="h-4 w-4 text-accent-violet" />
                </div>
                <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Investment Decision Reasoning
                </h2>
              </div>
              <ol className="space-y-4">
                {Array.isArray(reasoning) && reasoning.map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex items-center justify-center h-6 w-6 rounded-lg bg-gradient-to-br from-brand/20 to-accent-cyan/10 border border-brand/20 text-brand-light text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-text-secondary leading-relaxed pt-0.5">
                      {item}
                    </p>
                  </li>
                ))}
                {(!Array.isArray(reasoning) || reasoning.length === 0) && (
                  <p className="text-sm text-text-muted italic">No reasoning breakdown available.</p>
                )}
              </ol>
            </div>

          </div>

          {/* Sidebar Column (1/3 width) */}
          <div className="lg:col-span-1 space-y-5">
            
            {/* Quick Metrics Summary Widget */}
            <div className="glass-card gradient-border rounded-xl p-6 flex flex-col justify-center gap-4 card-hover animate-fade-in delay-100">
              <div className="flex items-center gap-2.5 pb-3 border-b border-dark-border/60">
                <div className="p-1.5 bg-accent-amber/10 rounded-lg">
                  <Award className="h-4 w-4 text-accent-amber" />
                </div>
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Investment Index
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
                    Score
                  </span>
                  <div className="text-3xl font-extrabold text-gradient mt-1 font-display">
                    {investmentScore}<span className="text-lg text-text-muted">/100</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
                    Risk Level
                  </span>
                  <div className={`text-2xl font-extrabold mt-1 font-display ${
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

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResearchData } from '../context/ResearchContext.jsx';
import RecommendationBadge from '../components/RecommendationBadge.jsx';
import FinancialHealthCard from '../components/FinancialHealthCard.jsx';
import SentimentGauge from '../components/SentimentGauge.jsx';
import ScoreRadarChart from '../components/ScoreRadarChart.jsx';
import RiskOpportunityList from '../components/RiskOpportunityList.jsx';
import { ArrowLeft, RefreshCw, BarChart2, ShieldAlert, Award, FileText, ListOrdered, Calendar } from 'lucide-react';

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
    reasoning
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
    <div className="min-h-screen bg-[#FAFAFB] text-light-text-primary px-4 py-8 sm:px-6 lg:px-8">
      {/* Dashboard Max Width Wrapper */}
      <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-light-border/60 pb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="p-2 bg-light-card border border-light-border hover:border-brand/40 text-light-text-secondary hover:text-light-text-primary rounded-lg transition-all shrink-0 shadow-sm"
              title="Research another company"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-extrabold text-2xl tracking-tight text-light-text-primary">
                  {company}
                </h1>
                <span className="px-2 py-0.5 bg-zinc-100 border border-zinc-200 text-light-text-secondary text-[11px] font-bold rounded">
                  {ticker}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-light-text-muted">
                <Calendar className="h-3 w-3" />
                <span>Analysis Generated on {formattedDate}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 self-start sm:self-center">
            <RecommendationBadge recommendation={recommendation} confidence={confidence} />
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-light-input hover:bg-zinc-100 border border-light-border hover:border-zinc-300 text-light-text-primary text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm"
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
            <div className="bg-light-card border border-light-border rounded-xl p-6 card-hover shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4.5 w-4.5 text-brand" />
                <h2 className="text-xs font-bold text-light-text-muted uppercase tracking-wider">
                  Executive Summary
                </h2>
              </div>
              <p className="text-sm font-medium text-light-text-primary leading-relaxed">
                {summary}
              </p>
            </div>

            {/* Business Overview */}
            <div className="bg-light-card border border-light-border rounded-xl p-6 card-hover shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <BarChart2 className="h-4.5 w-4.5 text-brand" />
                <h2 className="text-xs font-bold text-light-text-muted uppercase tracking-wider">
                  Business Operations & Moat
                </h2>
              </div>
              <p className="text-sm text-light-text-secondary leading-relaxed whitespace-pre-line">
                {businessOverview}
              </p>
            </div>

            {/* Financial Health Component */}
            <FinancialHealthCard financialHealth={financialHealth} />

            {/* Risks & Opportunities Component */}
            <RiskOpportunityList risks={risks} opportunities={opportunities} />

            {/* Analytical Reasoning Steps */}
            <div className="bg-light-card border border-light-border rounded-xl p-6 card-hover shadow-sm">
              <div className="flex items-center gap-2 mb-4 border-b border-light-border/60 pb-3">
                <ListOrdered className="h-4.5 w-4.5 text-brand" />
                <h2 className="text-xs font-bold text-light-text-muted uppercase tracking-wider">
                  Investment Decision Reasoning
                </h2>
              </div>
              <ol className="space-y-4">
                {Array.isArray(reasoning) && reasoning.map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex items-center justify-center h-6 w-6 rounded-md bg-brand/10 border border-brand/20 text-brand text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-light-text-secondary leading-relaxed pt-0.5">
                      {item}
                    </p>
                  </li>
                ))}
                {(!Array.isArray(reasoning) || reasoning.length === 0) && (
                  <p className="text-sm text-light-text-muted italic">No reasoning breakdown available.</p>
                )}
              </ol>
            </div>

          </div>

          {/* Sidebar Column (1/3 width) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Metrics Summary Widget */}
            <div className="bg-light-card border border-light-border rounded-xl p-6 flex flex-col justify-center gap-4 card-hover shadow-sm">
              <div className="flex items-center gap-2 pb-2 border-b border-light-border/60">
                <Award className="h-4.5 w-4.5 text-brand" />
                <h3 className="text-xs font-bold text-light-text-muted uppercase tracking-wider">
                  Investment Index
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-light-text-muted font-bold uppercase tracking-wider">
                    Score
                  </span>
                  <div className="text-2xl font-extrabold text-brand mt-1 font-display">
                    {investmentScore}/100
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-light-text-muted font-bold uppercase tracking-wider">
                    Risk Assessment
                  </span>
                  <div className={`text-2xl font-extrabold mt-1 font-display ${
                    risk?.toLowerCase() === 'low' 
                      ? 'text-emerald-600' 
                      : risk?.toLowerCase() === 'medium'
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}>
                    {risk || 'Medium'}
                  </div>
                </div>
              </div>
            </div>

            {/* Sentiment Indicator Widget */}
            <SentimentGauge sentiment={marketSentiment} />

            {/* Recharts Radar Score Widget */}
            <ScoreRadarChart 
              investmentScore={investmentScore} 
              financialScore={financialHealth?.score} 
              confidence={confidence} 
            />

          </div>

        </div>

      </div>
    </div>
  );
}

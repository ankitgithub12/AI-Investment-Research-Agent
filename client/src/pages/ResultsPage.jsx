import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Target, Gauge, AlertTriangle, TrendingUp,
  Building2, Heart, Sprout, Swords, DollarSign, Newspaper, Clock,
} from 'lucide-react';
import { useResearchContext } from '@/context/ResearchContext';
import RecommendationBadge from '@/components/RecommendationBadge';
import ScoreCard from '@/components/ScoreCard';
import InfoCard, { InfoRow } from '@/components/InfoCard';
import NewsCard from '@/components/NewsCard';
import ChartSection from '@/components/ChartSection';
import RiskList from '@/components/RiskList';
import OpportunitiesList from '@/components/OpportunitiesList';
import ReasoningSection from '@/components/ReasoningSection';
import { RISK_COLORS, SENTIMENT_COLORS } from '@/utils/constants';

/**
 * Results page displaying the full investment research dashboard.
 */
export default function ResultsPage() {
  const navigate = useNavigate();
  const { results, companyName } = useResearchContext();

  // Redirect to home if no results
  useEffect(() => {
    if (!results) {
      navigate('/');
    }
  }, [results, navigate]);

  if (!results) return null;

  const data = results;
  const riskStyle = RISK_COLORS[data.risk] || RISK_COLORS.Medium;
  const sentimentStyle = SENTIMENT_COLORS[data.marketSentiment] || SENTIMENT_COLORS.Neutral;

  return (
    <div className="flex-1 pb-12">
      {/* Top Bar */}
      <div className="border-b border-slate-100 bg-white sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} />
            New Research
          </Link>
          {data.processingTime && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-400">
              <Clock size={12} />
              Completed in {data.processingTime}
            </span>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* ── Company Header ───────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 animate-fade-in-up">
          {/* Company Icon */}
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <Building2 size={28} />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.company || companyName}
            </h1>
            {data.ticker && (
              <span className="text-sm text-slate-400 font-mono">{data.ticker}</span>
            )}
          </div>

          <RecommendationBadge recommendation={data.recommendation} />
        </div>

        {/* ── Score Cards ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <ScoreCard
            title="Confidence"
            value={data.confidence}
            icon={Target}
            type="score"
            subtitle="How certain the AI is"
          />
          <ScoreCard
            title="Investment Score"
            value={data.investmentScore}
            icon={Gauge}
            type="score"
            subtitle="Overall attractiveness"
          />
          <ScoreCard
            title="Risk Level"
            value={data.risk}
            icon={AlertTriangle}
            type="label"
            subtitle={
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${riskStyle.bg} ${riskStyle.text}`}>
                {data.risk}
              </span>
            }
          />
          <ScoreCard
            title="Sentiment"
            value={data.marketSentiment}
            icon={TrendingUp}
            type="label"
            subtitle={
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${sentimentStyle.bg} ${sentimentStyle.text}`}>
                {data.marketSentiment}
              </span>
            }
          />
        </div>

        {/* ── Summary ──────────────────────────────────────────────── */}
        {data.summary && (
          <div className="mb-8 p-6 rounded-xl bg-emerald-50/50 border border-emerald-100 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-sm font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              Executive Summary
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* ── Charts ───────────────────────────────────────────────── */}
        <div className="mb-8">
          <ChartSection chartData={data.chartData} />
        </div>

        {/* ── Detail Cards Grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Business Overview */}
          {data.businessOverview && (
            <InfoCard title="Business Overview" icon={Building2} delay={100}>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {data.businessOverview}
              </p>
            </InfoCard>
          )}

          {/* Financial Health */}
          {data.financialHealth && (
            <InfoCard title="Financial Health" icon={Heart} delay={200}>
              <div className="space-y-0">
                <InfoRow label="Revenue Growth" value={data.financialHealth.revenueGrowth} />
                <InfoRow label="Profit Margin" value={data.financialHealth.profitMargin} />
                <InfoRow label="Cash Flow" value={data.financialHealth.cashFlow} />
                <InfoRow label="Debt Level" value={data.financialHealth.debtLevel} />
                <InfoRow label="Valuation" value={data.financialHealth.valuation} />
                {data.financialHealth.score && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Health Score</span>
                      <span className="font-bold text-emerald-600">{data.financialHealth.score}/100</span>
                    </div>
                  </div>
                )}
              </div>
            </InfoCard>
          )}

          {/* Growth Potential */}
          {data.growth && (
            <InfoCard title="Growth Potential" icon={Sprout} delay={300}>
              <div className="space-y-0">
                <InfoRow label="Revenue Growth Rate" value={data.growth.revenueGrowthRate} />
                <InfoRow label="Earnings Growth" value={data.growth.earningsGrowth} />
                <InfoRow label="Market Expansion" value={data.growth.marketExpansion} />
                <InfoRow label="Innovation Pipeline" value={data.growth.innovationPipeline} />
                {data.growth.score && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Growth Score</span>
                      <span className="font-bold text-emerald-600">{data.growth.score}/100</span>
                    </div>
                  </div>
                )}
              </div>
            </InfoCard>
          )}

          {/* Competitive Position */}
          {data.competitivePosition && (
            <InfoCard title="Competitive Position" icon={Swords} delay={350}>
              <div className="space-y-3">
                <InfoRow label="Market Position" value={data.competitivePosition.marketPosition} />
                {data.competitivePosition.competitiveAdvantages && (
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Advantages</p>
                    <ul className="space-y-1.5">
                      {data.competitivePosition.competitiveAdvantages.map((adv, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                          {adv}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.competitivePosition.threats && (
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Threats</p>
                    <ul className="space-y-1.5">
                      {data.competitivePosition.threats.map((threat, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                          {threat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.competitivePosition.score && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Position Score</span>
                      <span className="font-bold text-emerald-600">{data.competitivePosition.score}/100</span>
                    </div>
                  </div>
                )}
              </div>
            </InfoCard>
          )}

          {/* Valuation */}
          {data.valuation && (
            <InfoCard title="Valuation" icon={DollarSign} delay={400}>
              <div className="space-y-0">
                <InfoRow label="Market Cap" value={data.valuation.marketCap} />
                <InfoRow label="P/E Ratio" value={data.valuation.peRatio} />
                <InfoRow label="Forward P/E" value={data.valuation.forwardPE} />
                <InfoRow label="PEG Ratio" value={data.valuation.pegRatio} />
                <InfoRow label="Price to Book" value={data.valuation.priceToBook} />
                {data.valuation.assessment && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Assessment</span>
                      <span className={`font-semibold ${
                        data.valuation.assessment === 'Undervalued'
                          ? 'text-emerald-600'
                          : data.valuation.assessment === 'Overvalued'
                            ? 'text-red-600'
                            : 'text-amber-600'
                      }`}>
                        {data.valuation.assessment}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </InfoCard>
          )}

          {/* Recent News */}
          {data.recentNews && data.recentNews.length > 0 && (
            <InfoCard title="Recent News" icon={Newspaper} delay={450}>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {data.recentNews.map((news, index) => (
                  <NewsCard key={index} news={news} index={index} />
                ))}
              </div>
            </InfoCard>
          )}
        </div>

        {/* ── Risks & Opportunities ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RiskList risks={data.risks} />
          <OpportunitiesList opportunities={data.opportunities} />
        </div>

        {/* ── AI Reasoning ─────────────────────────────────────────── */}
        <div className="mb-8">
          <ReasoningSection reasoning={data.reasoning} />
        </div>

        {/* ── Final Recommendation ─────────────────────────────────── */}
        <div className="text-center py-10 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          <p className="text-sm text-slate-400 uppercase tracking-wider font-medium mb-4">
            Final Recommendation
          </p>
          <RecommendationBadge recommendation={data.recommendation} />
          <p className="mt-4 text-sm text-slate-500 max-w-md mx-auto">
            This analysis is AI-generated for educational purposes.
            Always conduct your own due diligence before investing.
          </p>
        </div>
      </div>
    </div>
  );
}

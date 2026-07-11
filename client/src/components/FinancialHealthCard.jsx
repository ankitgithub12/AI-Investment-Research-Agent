import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, Percent, DollarSign, AlertCircle } from 'lucide-react';

/**
 * Renders key financial health information (revenue, margins, cash flow, debt)
 * along with a visual ring gauge showing the overall financial score.
 */
export default function FinancialHealthCard({ financialHealth }) {
  const { score, revenueGrowth, profitMargin, cashFlow, debtLevel } = financialHealth || {};

  // Recharts Ring Gauge Data
  const cleanScore = Math.max(0, Math.min(100, Number(score) || 0));
  const chartData = [
    { value: cleanScore },
    { value: 100 - cleanScore }
  ];

  const metrics = [
    {
      icon: TrendingUp,
      label: 'Revenue Growth',
      value: revenueGrowth,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      icon: Percent,
      label: 'Profit Margin',
      value: profitMargin,
      iconBg: 'bg-indigo-50 text-indigo-600',
    },
    {
      icon: DollarSign,
      label: 'Cash Flow',
      value: cashFlow,
      iconBg: 'bg-cyan-50 text-cyan-600',
    },
    {
      icon: AlertCircle,
      label: 'Debt & Solvency',
      value: debtLevel,
      iconBg: 'bg-rose-50 text-rose-600',
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 card-hover shadow-lg shadow-indigo-100/10 border border-slate-200/50">
      {/* Gauge Visual */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-8">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-5">Financial Score</h3>
        <div className="w-36 h-36 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <linearGradient id="financialScoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={54}
                outerRadius={64}
                startAngle={90}
                endAngle={-270}
                paddingAngle={0}
                dataKey="value"
              >
                <Cell fill="url(#financialScoreGrad)" stroke="none" />
                <Cell fill="#F1F5F9" stroke="none" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center">
            <span className="font-display font-extrabold text-3xl text-gradient">
              {cleanScore}
            </span>
            <span className="text-[9px] text-text-muted font-bold uppercase tracking-widest mt-1">
              Score
            </span>
          </div>
        </div>
      </div>

      {/* Structured Metrics Grid */}
      <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map(({ icon: Icon, label, value, iconBg }) => (
          <div key={label} className="bg-white border border-slate-200/60 p-4.5 rounded-2xl flex items-start gap-4 transition-smooth hover:border-brand/40 shadow-sm hover:shadow-md">
            <div className={`p-2.5 ${iconBg} rounded-xl mt-0.5 flex-shrink-0`}>
              <Icon className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] text-text-muted font-extrabold uppercase tracking-wider">{label}</h4>
              <p className="text-sm font-semibold text-text-primary mt-1.5 leading-relaxed">
                {value || 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

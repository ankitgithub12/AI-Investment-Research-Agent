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

  const COLORS = ['#6366F1', '#E2E8F0'];

  const metrics = [
    {
      icon: TrendingUp,
      label: 'Revenue Growth',
      value: revenueGrowth,
      iconBg: 'bg-accent-emerald/10',
      iconColor: 'text-accent-emerald',
    },
    {
      icon: Percent,
      label: 'Profit Margin',
      value: profitMargin,
      iconBg: 'bg-brand/10',
      iconColor: 'text-brand-light',
    },
    {
      icon: DollarSign,
      label: 'Cash Flow',
      value: cashFlow,
      iconBg: 'bg-accent-cyan/10',
      iconColor: 'text-accent-cyan',
    },
    {
      icon: AlertCircle,
      label: 'Debt & Solvency',
      value: debtLevel,
      iconBg: 'bg-accent-rose/10',
      iconColor: 'text-accent-rose',
    },
  ];

  return (
    <div className="glass-card gradient-border rounded-xl p-6 flex flex-col md:flex-row items-center gap-8 card-hover">
      {/* Gauge Visual */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Financial Score</h3>
        <div className="w-36 h-36 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={64}
                startAngle={90}
                endAngle={-270}
                paddingAngle={0}
                dataKey="value"
              >
                <Cell fill={COLORS[0]} stroke="none" />
                <Cell fill={COLORS[1]} stroke="none" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center">
            <span className="font-display font-extrabold text-3xl text-gradient">
              {cleanScore}
            </span>
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-0.5">
              Score
            </span>
          </div>
        </div>
      </div>

      {/* Structured Metrics Grid */}
      <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {metrics.map(({ icon: Icon, label, value, iconBg, iconColor }) => (
          <div key={label} className="bg-dark-surface/60 border border-dark-border/50 p-4 rounded-xl flex items-start gap-3 transition-smooth hover:border-dark-border-hover">
            <div className={`p-2 ${iconBg} rounded-lg mt-0.5`}>
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] text-text-muted font-bold uppercase tracking-wider">{label}</h4>
              <p className="text-sm font-medium text-text-primary mt-1 leading-relaxed">
                {value || 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

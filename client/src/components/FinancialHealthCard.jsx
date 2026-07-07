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

  // Slate theme colors
  const COLORS = ['#4F46E5', '#1E1E22'];

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6 flex flex-col md:flex-row items-center gap-8 card-hover">
      {/* Gauge Visual */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
        <h3 className="text-xs font-bold text-dark-text-muted uppercase tracking-wider mb-4">Financial Score</h3>
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
            <span className="font-display font-extrabold text-3xl text-dark-text-primary">
              {cleanScore}
            </span>
            <span className="text-[10px] text-dark-text-muted font-bold uppercase tracking-widest mt-0.5">
              Score
            </span>
          </div>
        </div>
      </div>

      {/* Structured Metrics Grid */}
      <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Metric: Revenue Growth */}
        <div className="bg-dark-input border border-dark-border p-4 rounded-lg flex items-start gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-md text-indigo-400 mt-0.5">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-[11px] text-dark-text-muted font-bold uppercase tracking-wider">Revenue Growth</h4>
            <p className="text-sm font-medium text-dark-text-primary mt-1 leading-relaxed">
              {revenueGrowth || 'N/A'}
            </p>
          </div>
        </div>

        {/* Metric: Profit Margin */}
        <div className="bg-dark-input border border-dark-border p-4 rounded-lg flex items-start gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-md text-emerald-400 mt-0.5">
            <Percent className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-[11px] text-dark-text-muted font-bold uppercase tracking-wider">Profit Margin</h4>
            <p className="text-sm font-medium text-dark-text-primary mt-1 leading-relaxed">
              {profitMargin || 'N/A'}
            </p>
          </div>
        </div>

        {/* Metric: Cash Flow */}
        <div className="bg-dark-input border border-dark-border p-4 rounded-lg flex items-start gap-3">
          <div className="p-2 bg-blue-500/10 rounded-md text-blue-400 mt-0.5">
            <DollarSign className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-[11px] text-dark-text-muted font-bold uppercase tracking-wider">Cash Flow</h4>
            <p className="text-sm font-medium text-dark-text-primary mt-1 leading-relaxed">
              {cashFlow || 'N/A'}
            </p>
          </div>
        </div>

        {/* Metric: Debt Level */}
        <div className="bg-dark-input border border-dark-border p-4 rounded-lg flex items-start gap-3">
          <div className="p-2 bg-red-500/10 rounded-md text-red-400 mt-0.5">
            <AlertCircle className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-[11px] text-dark-text-muted font-bold uppercase tracking-wider">Debt & Solvency</h4>
            <p className="text-sm font-medium text-dark-text-primary mt-1 leading-relaxed">
              {debtLevel || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

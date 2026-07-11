import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

/**
 * Lists the major investment risks and opportunities side-by-side.
 */
export default function RiskOpportunityList({ risks, opportunities }) {
  const safeRisks = Array.isArray(risks) ? risks : [];
  const safeOpportunities = Array.isArray(opportunities) ? opportunities : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Opportunities (Bullish triggers) */}
      <div className="glass-card rounded-2xl p-6 card-hover shadow-lg shadow-indigo-100/10 border border-slate-200/50 relative overflow-hidden bg-emerald-50/10">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none" />
        <div className="flex items-center gap-2.5 mb-5 border-b border-slate-100 pb-3 relative z-10">
          <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
            <TrendingUp className="h-4.5 w-4.5" />
          </div>
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Growth Opportunities
          </h3>
        </div>
        <ul className="space-y-4 relative z-10">
          {safeOpportunities.map((op, index) => (
            <li key={index} className="flex items-start gap-3.5 text-sm text-text-secondary leading-relaxed font-medium">
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{op}</span>
            </li>
          ))}
          {safeOpportunities.length === 0 && (
            <li className="text-sm text-text-muted italic">No growth opportunities analyzed.</li>
          )}
        </ul>
      </div>

      {/* Risks (Bearish triggers) */}
      <div className="glass-card rounded-2xl p-6 card-hover shadow-lg shadow-indigo-100/10 border border-slate-200/50 relative overflow-hidden bg-rose-50/10">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-500/5 to-transparent rounded-bl-full pointer-events-none" />
        <div className="flex items-center gap-2.5 mb-5 border-b border-slate-100 pb-3 relative z-10">
          <div className="p-2 bg-rose-50 rounded-xl text-rose-600 animate-pulse">
            <AlertTriangle className="h-4.5 w-4.5" />
          </div>
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Key Risks & Headwinds
          </h3>
        </div>
        <ul className="space-y-4 relative z-10">
          {safeRisks.map((risk, index) => (
            <li key={index} className="flex items-start gap-3.5 text-sm text-text-secondary leading-relaxed font-medium">
              <AlertTriangle className="h-4.5 w-4.5 text-rose-500 shrink-0 mt-0.5" />
              <span>{risk}</span>
            </li>
          ))}
          {safeRisks.length === 0 && (
            <li className="text-sm text-text-muted italic">No immediate risks analyzed.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

import React from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';

/**
 * Lists the major investment risks and opportunities side-by-side.
 */
export default function RiskOpportunityList({ risks, opportunities }) {
  const safeRisks = Array.isArray(risks) ? risks : [];
  const safeOpportunities = Array.isArray(opportunities) ? opportunities : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
      {/* Opportunities (Bullish triggers) */}
      <div className="glass-card gradient-border rounded-xl p-6 card-hover">
        <div className="flex items-center gap-2.5 mb-4 border-b border-dark-border/60 pb-3">
          <div className="p-1.5 bg-accent-emerald/10 rounded-lg">
            <TrendingUp className="h-4 w-4 text-accent-emerald" />
          </div>
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Growth Opportunities
          </h3>
        </div>
        <ul className="space-y-3.5">
          {safeOpportunities.map((op, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
              <span className="flex items-center justify-center h-5 w-5 rounded-md bg-accent-emerald/10 text-accent-emerald text-[10px] font-bold shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span>{op}</span>
            </li>
          ))}
          {safeOpportunities.length === 0 && (
            <li className="text-sm text-text-muted italic">No growth opportunities analyzed.</li>
          )}
        </ul>
      </div>

      {/* Risks (Bearish triggers) */}
      <div className="glass-card gradient-border rounded-xl p-6 card-hover">
        <div className="flex items-center gap-2.5 mb-4 border-b border-dark-border/60 pb-3">
          <div className="p-1.5 bg-accent-rose/10 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-accent-rose" />
          </div>
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Key Risks & Headwinds
          </h3>
        </div>
        <ul className="space-y-3.5">
          {safeRisks.map((risk, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
              <span className="flex items-center justify-center h-5 w-5 rounded-md bg-accent-rose/10 text-accent-rose text-[10px] font-bold shrink-0 mt-0.5">
                {index + 1}
              </span>
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

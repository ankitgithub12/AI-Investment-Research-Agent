import React from 'react';
import { AlertTriangle, PlusCircle } from 'lucide-react';

/**
 * Lists the major investment risks and opportunities side-by-side.
 * Uses AlertTriangle and PlusCircle icons for high-quality visual representation.
 */
export default function RiskOpportunityList({ risks, opportunities }) {
  const safeRisks = Array.isArray(risks) ? risks : [];
  const safeOpportunities = Array.isArray(opportunities) ? opportunities : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Opportunities (Bullish triggers) */}
      <div className="bg-light-card border border-light-border rounded-xl p-6 card-hover shadow-sm">
        <div className="flex items-center gap-2.5 mb-4 border-b border-light-border/60 pb-3">
          <PlusCircle className="h-4.5 w-4.5 text-emerald-600" />
          <h3 className="text-xs font-bold text-light-text-muted uppercase tracking-wider">
            Growth Opportunities
          </h3>
        </div>
        <ul className="space-y-3.5">
          {safeOpportunities.map((op, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-light-text-primary leading-relaxed">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
              <span>{op}</span>
            </li>
          ))}
          {safeOpportunities.length === 0 && (
            <li className="text-sm text-light-text-muted italic">No growth opportunities analyzed.</li>
          )}
        </ul>
      </div>

      {/* Risks (Bearish triggers) */}
      <div className="bg-light-card border border-light-border rounded-xl p-6 card-hover shadow-sm">
        <div className="flex items-center gap-2.5 mb-4 border-b border-light-border/60 pb-3">
          <AlertTriangle className="h-4.5 w-4.5 text-red-600" />
          <h3 className="text-xs font-bold text-light-text-muted uppercase tracking-wider">
            Key Risks & Headwinds
          </h3>
        </div>
        <ul className="space-y-3.5">
          {safeRisks.map((risk, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-light-text-primary leading-relaxed">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
              <span>{risk}</span>
            </li>
          ))}
          {safeRisks.length === 0 && (
            <li className="text-sm text-light-text-muted italic">No immediate risks analyzed.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

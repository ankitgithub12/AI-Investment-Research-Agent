import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

/**
 * Displays an Invest/Pass recommendation badge with confidence scores.
 */
export default function RecommendationBadge({ recommendation, confidence }) {
  const isInvest = recommendation?.toLowerCase() === 'invest';

  return (
    <div className={`flex items-center gap-3 px-5 py-2.5 rounded-full border animate-fade-in ${
      isInvest 
        ? 'bg-accent-emerald/10 border-accent-emerald/30 text-accent-emerald glow-emerald' 
        : 'bg-accent-rose/10 border-accent-rose/30 text-accent-rose glow-rose'
    }`}>
      {isInvest ? (
        <CheckCircle2 className="h-5 w-5 animate-pulse" />
      ) : (
        <AlertTriangle className="h-5 w-5" />
      )}
      <span className="font-display font-bold tracking-wide text-sm uppercase">
        {isInvest ? 'INVEST' : 'PASS'}
      </span>
      <span className="h-4 w-[1px] bg-dark-border" />
      <span className="text-sm font-medium text-text-secondary">
        {confidence}%
      </span>
    </div>
  );
}

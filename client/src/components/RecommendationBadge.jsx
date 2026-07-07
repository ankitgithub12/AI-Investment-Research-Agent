import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

/**
 * Displays an Invest/Pass recommendation badge with confidence scores.
 */
export default function RecommendationBadge({ recommendation, confidence }) {
  const isInvest = recommendation?.toLowerCase() === 'invest';

  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-full border ${
      isInvest 
        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
        : 'bg-red-500/10 border-red-500/30 text-red-400'
    } animate-fade-in`}>
      {isInvest ? (
        <CheckCircle2 className="h-5 w-5 animate-pulse text-emerald-400" />
      ) : (
        <AlertTriangle className="h-5 w-5 text-red-400" />
      )}
      <span className="font-display font-bold tracking-wide text-sm uppercase">
        {isInvest ? 'INVEST' : 'PASS'}
      </span>
      <span className="h-4 w-[1px] bg-zinc-800"></span>
      <span className="text-sm font-medium text-dark-text-secondary">
        {confidence}% Confidence
      </span>
    </div>
  );
}

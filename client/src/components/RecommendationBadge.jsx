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
        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm' 
        : 'bg-red-50 border-red-200 text-red-700 shadow-sm'
    } animate-fade-in`}>
      {isInvest ? (
        <CheckCircle2 className="h-5 w-5 animate-pulse text-emerald-600" />
      ) : (
        <AlertTriangle className="h-5 w-5 text-red-600" />
      )}
      <span className="font-display font-bold tracking-wide text-sm uppercase">
        {isInvest ? 'INVEST' : 'PASS'}
      </span>
      <span className="h-4 w-[1px] bg-zinc-200"></span>
      <span className="text-sm font-medium text-light-text-secondary">
        {confidence}% Confidence
      </span>
    </div>
  );
}

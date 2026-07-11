import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

/**
 * Displays an Invest/Pass recommendation badge with confidence scores.
 */
export default function RecommendationBadge({ recommendation, confidence }) {
  const isInvest = recommendation?.toLowerCase() === 'invest';

  return (
    <div className={`flex items-center gap-2.5 px-4.5 py-2 rounded-full border shadow-sm animate-fade-in font-display ${
      isInvest 
        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-emerald-100/50 glow-emerald' 
        : 'bg-rose-50 border-rose-200 text-rose-700 shadow-rose-100/50 glow-rose'
    }`}>
      {isInvest ? (
        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 animate-pulse" />
      ) : (
        <AlertTriangle className="h-4.5 w-4.5 text-rose-600 animate-bounce" />
      )}
      <span className="font-extrabold tracking-wider text-xs uppercase">
        {isInvest ? 'INVEST' : 'PASS'}
      </span>
      <span className="h-3.5 w-[1.5px] bg-slate-300/60" />
      <span className="text-xs font-bold text-text-secondary">
        {confidence}% Confidence
      </span>
    </div>
  );
}

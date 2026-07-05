import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Displays the INVEST ✅ or PASS ❌ recommendation badge.
 */
export default function RecommendationBadge({ recommendation }) {
  const isInvest = recommendation?.toLowerCase() === 'invest';

  return (
    <div
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 animate-scale-in ${
        isInvest
          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm shadow-emerald-100'
          : 'bg-red-100 text-red-700 border border-red-200 shadow-sm shadow-red-100'
      }`}
      id="recommendation-badge"
    >
      {isInvest ? (
        <>
          <TrendingUp size={18} strokeWidth={2.5} />
          <span>INVEST</span>
          <span>✅</span>
        </>
      ) : (
        <>
          <TrendingDown size={18} strokeWidth={2.5} />
          <span>PASS</span>
          <span>❌</span>
        </>
      )}
    </div>
  );
}

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * Renders the market sentiment (Bullish, Bearish, or Neutral) with matching visual indicators,
 * descriptions, icons, and a horizontal progress gauge.
 */
export default function SentimentGauge({ sentiment }) {
  const displaySentiment = sentiment || 'Neutral';
  
  const getSentimentConfig = () => {
    switch (displaySentiment.toLowerCase()) {
      case 'bullish':
        return {
          containerClass: 'bg-emerald-50/60 border-emerald-100 text-emerald-800',
          icon: <TrendingUp className="h-5 w-5 text-emerald-600 animate-bounce" />,
          label: 'Bullish',
          labelColor: 'text-emerald-700',
          desc: 'Recent news narratives suggest strong momentum and high investor confidence.',
          barWidth: '83%',
          barColor: 'from-emerald-500 via-teal-500 to-cyan-500',
        };
      case 'bearish':
        return {
          containerClass: 'bg-rose-50/60 border-rose-100 text-rose-800',
          icon: <TrendingDown className="h-5 w-5 text-rose-600 animate-bounce" />,
          label: 'Bearish',
          labelColor: 'text-rose-700',
          desc: 'Headwinds and concerns dominate the current news cycle, putting pressure on growth.',
          barWidth: '17%',
          barColor: 'from-rose-500 via-orange-500 to-amber-500',
        };
      case 'neutral':
      default:
        return {
          containerClass: 'bg-slate-50/80 border-slate-200/60 text-slate-800',
          icon: <Minus className="h-5 w-5 text-slate-500" />,
          label: 'Neutral',
          labelColor: 'text-slate-700',
          desc: 'Positive developments are balanced out by macroeconomic or regulatory risks.',
          barWidth: '50%',
          barColor: 'from-indigo-500 to-cyan-500',
        };
    }
  };

  const config = getSentimentConfig();

  return (
    <div className="glass-card rounded-2xl p-6 card-hover flex flex-col justify-between h-full shadow-lg shadow-indigo-100/10 border border-slate-200/50">
      <div>
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Market Sentiment</h3>
        <div className={`flex items-start gap-3 p-4 rounded-xl border ${config.containerClass}`}>
          <div className="mt-0.5 p-1 bg-white rounded-lg shadow-sm border border-black/5">{config.icon}</div>
          <div>
            <span className={`font-display font-extrabold text-base leading-none block ${config.labelColor}`}>
              {config.label}
            </span>
            <p className="text-xs text-text-secondary mt-1.5 leading-relaxed font-medium">
              {config.desc}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between text-[9px] font-bold text-text-muted uppercase tracking-widest mb-2.5">
          <span>Bearish</span>
          <span>Neutral</span>
          <span>Bullish</span>
        </div>
        <div className="h-2 w-full bg-slate-100 border border-slate-200/30 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${config.barColor} rounded-full transition-all duration-700 ease-out`}
            style={{ width: config.barWidth }}
          />
        </div>
      </div>
    </div>
  );
}

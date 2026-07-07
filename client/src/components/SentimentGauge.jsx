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
          color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
          icon: <TrendingUp className="h-5 w-5 text-emerald-400" />,
          label: 'Bullish',
          desc: 'Recent news narratives suggest strong momentum and high investor confidence.',
          barWidth: 'w-5/6 bg-emerald-500'
        };
      case 'bearish':
        return {
          color: 'text-red-400 border-red-500/20 bg-red-500/5',
          icon: <TrendingDown className="h-5 w-5 text-red-400" />,
          label: 'Bearish',
          desc: 'Headwinds and concerns dominate the current news cycle, putting pressure on growth.',
          barWidth: 'w-1/6 bg-red-500'
        };
      case 'neutral':
      default:
        return {
          color: 'text-zinc-400 border-zinc-500/20 bg-zinc-500/5',
          icon: <Minus className="h-5 w-5 text-zinc-400" />,
          label: 'Neutral',
          desc: 'Positive developments are balanced out by macroeconomic or regulatory risks.',
          barWidth: 'w-1/2 bg-zinc-500'
        };
    }
  };

  const config = getSentimentConfig();

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6 card-hover flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xs font-bold text-dark-text-muted uppercase tracking-wider mb-4">Market Sentiment</h3>
        <div className={`flex items-start gap-3 p-4 rounded-lg border ${config.color}`}>
          <div className="mt-0.5">{config.icon}</div>
          <div>
            <span className="font-display font-bold text-base leading-none">{config.label}</span>
            <p className="text-xs text-dark-text-secondary mt-1.5 leading-relaxed">
              {config.desc}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between text-[9px] font-bold text-dark-text-muted uppercase tracking-widest mb-2.5">
          <span>Bearish</span>
          <span>Neutral</span>
          <span>Bullish</span>
        </div>
        <div className="h-1.5 w-full bg-dark-input rounded-full overflow-hidden">
          <div className={`h-full ${config.barWidth} transition-all duration-500 rounded-full`} />
        </div>
      </div>
    </div>
  );
}

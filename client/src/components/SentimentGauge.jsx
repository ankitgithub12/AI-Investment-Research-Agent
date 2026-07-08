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
          containerClass: 'bg-accent-emerald/8 border-accent-emerald/20',
          icon: <TrendingUp className="h-5 w-5 text-accent-emerald" />,
          label: 'Bullish',
          labelColor: 'text-accent-emerald',
          desc: 'Recent news narratives suggest strong momentum and high investor confidence.',
          barWidth: '83%',
          barColor: 'from-accent-emerald to-accent-cyan',
        };
      case 'bearish':
        return {
          containerClass: 'bg-accent-rose/8 border-accent-rose/20',
          icon: <TrendingDown className="h-5 w-5 text-accent-rose" />,
          label: 'Bearish',
          labelColor: 'text-accent-rose',
          desc: 'Headwinds and concerns dominate the current news cycle, putting pressure on growth.',
          barWidth: '17%',
          barColor: 'from-accent-rose to-accent-amber',
        };
      case 'neutral':
      default:
        return {
          containerClass: 'bg-text-muted/8 border-text-muted/20',
          icon: <Minus className="h-5 w-5 text-text-muted" />,
          label: 'Neutral',
          labelColor: 'text-text-secondary',
          desc: 'Positive developments are balanced out by macroeconomic or regulatory risks.',
          barWidth: '50%',
          barColor: 'from-brand to-accent-violet',
        };
    }
  };

  const config = getSentimentConfig();

  return (
    <div className="glass-card gradient-border rounded-xl p-6 card-hover flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Market Sentiment</h3>
        <div className={`flex items-start gap-3 p-4 rounded-xl border ${config.containerClass}`}>
          <div className="mt-0.5">{config.icon}</div>
          <div>
            <span className={`font-display font-bold text-base leading-none ${config.labelColor}`}>
              {config.label}
            </span>
            <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
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
        <div className="h-2 w-full bg-dark-surface rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${config.barColor} rounded-full transition-all duration-700 ease-out`}
            style={{ width: config.barWidth }}
          />
        </div>
      </div>
    </div>
  );
}

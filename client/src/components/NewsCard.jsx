import { ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const SENTIMENT_ICONS = {
  positive: { icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  neutral: { icon: Minus, color: 'text-slate-500', bg: 'bg-slate-50' },
  negative: { icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50' },
};

/**
 * Individual news item card showing title, summary, sentiment, and impact.
 */
export default function NewsCard({ news, index }) {
  const sentiment = SENTIMENT_ICONS[news.sentiment] || SENTIMENT_ICONS.neutral;
  const SentimentIcon = sentiment.icon;

  return (
    <div
      className="group p-4 rounded-lg border border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-200 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-3">
        {/* Sentiment Icon */}
        <div
          className={`flex-shrink-0 h-8 w-8 rounded-lg ${sentiment.bg} flex items-center justify-center mt-0.5`}
        >
          <SentimentIcon size={14} className={sentiment.color} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h4 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors duration-200 line-clamp-2">
            {news.title}
          </h4>

          {/* Summary */}
          {news.summary && (
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              {news.summary}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 mt-2">
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                news.sentiment === 'positive'
                  ? 'bg-emerald-50 text-emerald-700'
                  : news.sentiment === 'negative'
                    ? 'bg-red-50 text-red-700'
                    : 'bg-slate-50 text-slate-600'
              }`}
            >
              {news.sentiment}
            </span>

            {news.impact && (
              <span className="text-xs text-slate-400">
                Impact: <span className="font-medium text-slate-600">{news.impact}</span>
              </span>
            )}

            {news.url && (
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-xs text-slate-400 hover:text-emerald-600 transition-colors"
              >
                <ExternalLink size={10} />
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

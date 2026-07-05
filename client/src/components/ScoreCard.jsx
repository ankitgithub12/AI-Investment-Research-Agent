import clsx from 'clsx';
import { getScoreColor, getScoreBgColor } from '@/utils/formatters';

/**
 * Score card component used for Confidence, Investment Score, Risk Level, etc.
 */
export default function ScoreCard({ title, value, subtitle, icon: Icon, type = 'score' }) {
  const isScore = type === 'score';
  const numericValue = isScore ? parseInt(value, 10) : null;

  return (
    <div className="group relative bg-white rounded-xl border border-slate-200 p-5 transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5">
      {/* Icon */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-colors duration-200">
            <Icon size={16} />
          </div>
        )}
      </div>

      {/* Value */}
      <div className="flex items-end gap-2">
        <span
          className={clsx(
            'text-3xl font-bold tracking-tight',
            isScore ? getScoreColor(numericValue) : 'text-slate-900'
          )}
        >
          {value}
          {isScore && <span className="text-lg text-slate-300 font-normal">/100</span>}
        </span>
      </div>

      {/* Subtitle / Progress Bar */}
      {subtitle && (
        <p className="text-xs text-slate-500 mt-2">{subtitle}</p>
      )}

      {isScore && numericValue !== null && (
        <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className={clsx(
              'h-full rounded-full transition-all duration-700 ease-out',
              getScoreBgColor(numericValue)
            )}
            style={{ width: `${numericValue}%` }}
          />
        </div>
      )}
    </div>
  );
}

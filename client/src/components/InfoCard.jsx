import clsx from 'clsx';

/**
 * Reusable card component for displaying information sections
 * (Business Overview, Financial Health, Growth, Valuation, etc.)
 */
export default function InfoCard({ title, icon: Icon, children, className, delay = 0 }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-slate-300 animate-fade-in-up',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100 bg-slate-50/30">
        {Icon && (
          <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Icon size={16} />
          </div>
        )}
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>

      {/* Content */}
      <div className="p-6">{children}</div>
    </div>
  );
}

/**
 * Key-value pair row used inside InfoCards.
 */
export function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-slate-50 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900 text-right max-w-[60%]">
        {value || 'N/A'}
      </span>
    </div>
  );
}

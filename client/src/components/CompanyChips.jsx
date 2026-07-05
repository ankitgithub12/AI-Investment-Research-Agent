import { EXAMPLE_COMPANIES } from '@/utils/constants';

/**
 * Example company chips for quick selection.
 */
export default function CompanyChips({ onSelect, disabled }) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5 mt-6">
      {EXAMPLE_COMPANIES.map(({ name, icon }) => (
        <button
          key={name}
          onClick={() => !disabled && onSelect(name)}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-full transition-all duration-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 hover:shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:text-slate-600 disabled:hover:bg-white"
          id={`chip-${name.toLowerCase()}`}
        >
          <span>{icon}</span>
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
}

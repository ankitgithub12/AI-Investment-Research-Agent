import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

/**
 * Search bar with company name input and research button.
 */
export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-emerald-500"
            size={20}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter company name..."
            disabled={isLoading}
            className="w-full h-14 pl-12 pr-4 text-base text-slate-900 bg-white border-2 border-slate-200 rounded-2xl outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-60 disabled:cursor-not-allowed hover:border-slate-300"
            id="company-search-input"
          />
        </div>

        {/* Research Button */}
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="h-14 px-8 text-base font-semibold text-white bg-emerald-600 rounded-2xl transition-all duration-200 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center gap-2 whitespace-nowrap"
          id="research-button"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Researching...</span>
            </>
          ) : (
            <>
              <Search size={18} />
              <span>Research</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

import { useNavigate } from 'react-router-dom';
import { TrendingUp, Sparkles, BarChart3, Shield, Newspaper, Brain } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import CompanyChips from '@/components/CompanyChips';
import ProgressPanel from '@/components/ProgressPanel';
import { useResearch } from '@/hooks/useResearch';
import { useResearchContext } from '@/context/ResearchContext';

const FEATURES = [
  { icon: BarChart3, title: 'Financial Analysis', desc: 'Revenue, margins, and valuation metrics' },
  { icon: Newspaper, title: 'News Sentiment', desc: 'Latest market news and sentiment analysis' },
  { icon: Shield, title: 'Risk Assessment', desc: 'SWOT analysis and risk evaluation' },
  { icon: Brain, title: 'AI Recommendation', desc: 'Invest or Pass with confidence score' },
];

/**
 * Home page with hero section, search bar, and progress panel.
 */
export default function HomePage() {
  const navigate = useNavigate();
  const { saveResults } = useResearchContext();
  const { mutate, isPending, isError, error } = useResearch();

  const handleSearch = (company) => {
    mutate(company, {
      onSuccess: (response) => {
        saveResults(company, response.data);
        navigate('/results');
      },
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24 gradient-bg">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium mb-6">
            <Sparkles size={12} />
            Powered by AI
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
            AI Investment{' '}
            <span className="gradient-text">Research Agent</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-lg sm:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
            Research any public company using AI. Get financial analysis,
            news sentiment, and investment recommendations in seconds.
          </p>

          {/* Search Bar */}
          <div className="mt-10">
            <SearchBar onSearch={handleSearch} isLoading={isPending} />
          </div>

          {/* Company Chips */}
          <CompanyChips onSelect={handleSearch} disabled={isPending} />

          {/* Error Message */}
          {isError && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 animate-fade-in-down max-w-lg mx-auto">
              <p className="font-medium">Research failed</p>
              <p className="mt-1 text-red-600">
                {error?.response?.data?.message || error?.message || 'An unexpected error occurred. Please try again.'}
              </p>
            </div>
          )}

          {/* Progress Panel */}
          <ProgressPanel isActive={isPending} />
        </div>
      </section>

      {/* Features Section */}
      {!isPending && (
        <section className="py-16 px-4 border-t border-slate-100 animate-fade-in">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-10">
              What you&apos;ll get
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className="group text-center p-6 rounded-xl border border-slate-100 bg-white hover:border-emerald-200 hover:shadow-md transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="mx-auto h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors duration-200 mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

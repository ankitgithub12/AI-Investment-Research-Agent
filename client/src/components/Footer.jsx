import { TrendingUp } from 'lucide-react';

/**
 * Footer with branding and disclaimer.
 */
export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-slate-50/50 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">InvestAI Research Agent</span>
          </div>
          <p className="text-xs text-slate-400 text-center max-w-md">
            This tool provides AI-generated analysis for educational purposes only.
            It does not constitute financial advice. Always consult a qualified
            financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}

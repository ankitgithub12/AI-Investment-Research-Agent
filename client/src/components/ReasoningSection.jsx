import { MessageSquare, ChevronRight } from 'lucide-react';
import InfoCard from './InfoCard';

/**
 * Displays the AI's reasoning behind the investment recommendation.
 */
export default function ReasoningSection({ reasoning }) {
  if (!reasoning || reasoning.length === 0) return null;

  return (
    <InfoCard title="AI Reasoning" icon={MessageSquare} delay={700}>
      <div className="space-y-3">
        {reasoning.map((reason, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/50 border border-slate-100 animate-fade-in-up"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="flex-shrink-0 mt-0.5">
              <div className="h-6 w-6 rounded-md bg-emerald-100 flex items-center justify-center">
                <ChevronRight size={12} className="text-emerald-600" />
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{reason}</p>
          </div>
        ))}
      </div>
    </InfoCard>
  );
}

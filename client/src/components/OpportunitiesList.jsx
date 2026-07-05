import { Lightbulb } from 'lucide-react';
import InfoCard from './InfoCard';

/**
 * Displays a list of investment opportunities.
 */
export default function OpportunitiesList({ opportunities }) {
  if (!opportunities || opportunities.length === 0) return null;

  return (
    <InfoCard title="Opportunities" icon={Lightbulb} delay={600}>
      <ul className="space-y-3">
        {opportunities.map((opportunity, index) => (
          <li
            key={index}
            className="flex items-start gap-3 animate-fade-in-up"
            style={{ animationDelay: `${(index + 1) * 80}ms` }}
          >
            <div className="flex-shrink-0 mt-1.5 h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-sm text-slate-700 leading-relaxed">
              {opportunity}
            </span>
          </li>
        ))}
      </ul>
    </InfoCard>
  );
}

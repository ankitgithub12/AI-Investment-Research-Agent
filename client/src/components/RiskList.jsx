import { AlertTriangle } from 'lucide-react';
import InfoCard from './InfoCard';

/**
 * Displays a list of investment risk factors.
 */
export default function RiskList({ risks }) {
  if (!risks || risks.length === 0) return null;

  return (
    <InfoCard title="Risk Factors" icon={AlertTriangle} delay={500}>
      <ul className="space-y-3">
        {risks.map((risk, index) => (
          <li
            key={index}
            className="flex items-start gap-3 animate-fade-in-up"
            style={{ animationDelay: `${(index + 1) * 80}ms` }}
          >
            <div className="flex-shrink-0 mt-1.5 h-2 w-2 rounded-full bg-red-400" />
            <span className="text-sm text-slate-700 leading-relaxed">{risk}</span>
          </li>
        ))}
      </ul>
    </InfoCard>
  );
}

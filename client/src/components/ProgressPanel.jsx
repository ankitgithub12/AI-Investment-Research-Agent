import { useEffect, useState } from 'react';
import { Check, Loader2, CircleDot } from 'lucide-react';
import { RESEARCH_STEPS } from '@/utils/constants';

/**
 * Animated progress panel shown while research is being conducted.
 * Simulates step-by-step progress with smooth animations.
 */
export default function ProgressPanel({ isActive }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      return;
    }

    // Simulate progress through steps
    const intervals = RESEARCH_STEPS.map((_, index) => {
      const delay = (index + 1) * 3500; // ~3.5 seconds per step
      return setTimeout(() => {
        setCurrentStep(index + 1);
      }, delay);
    });

    return () => intervals.forEach(clearTimeout);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="w-full max-w-lg mx-auto mt-10 animate-fade-in-up">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Loader2 size={16} className="text-emerald-600 animate-spin" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Researching Company
              </h3>
              <p className="text-xs text-slate-500">
                AI is analyzing multiple data sources...
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="p-6 space-y-3">
          {RESEARCH_STEPS.map((step, index) => {
            const isCompleted = currentStep > index;
            const isCurrent = currentStep === index;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 py-1.5 transition-all duration-300 ${
                  isCompleted
                    ? 'opacity-100'
                    : isCurrent
                      ? 'opacity-100'
                      : 'opacity-40'
                }`}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  {isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center animate-check">
                      <Check
                        size={14}
                        className="text-emerald-600"
                        strokeWidth={3}
                      />
                    </div>
                  ) : isCurrent ? (
                    <CircleDot
                      size={20}
                      className="text-emerald-500 animate-pulse-soft"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200" />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-sm transition-colors duration-200 ${
                    isCompleted
                      ? 'text-slate-700 font-medium'
                      : isCurrent
                        ? 'text-emerald-700 font-medium'
                        : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="px-6 pb-5">
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${(currentStep / RESEARCH_STEPS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

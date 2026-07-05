/**
 * Example companies displayed as quick-select chips on the home page.
 */
export const EXAMPLE_COMPANIES = [
  { name: 'Apple', icon: '🍎' },
  { name: 'Tesla', icon: '⚡' },
  { name: 'Microsoft', icon: '💻' },
  { name: 'Netflix', icon: '🎬' },
  { name: 'Amazon', icon: '📦' },
  { name: 'Nvidia', icon: '🎮' },
  { name: 'Google', icon: '🔍' },
  { name: 'Meta', icon: '👤' },
];

/**
 * Research progress steps shown during the loading state.
 */
export const RESEARCH_STEPS = [
  { id: 1, label: 'Searching company information' },
  { id: 2, label: 'Company information gathered' },
  { id: 3, label: 'Fetching financial data' },
  { id: 4, label: 'Financial data collected' },
  { id: 5, label: 'Analyzing business fundamentals' },
  { id: 6, label: 'Analyzing financial health' },
  { id: 7, label: 'Reading latest news' },
  { id: 8, label: 'Evaluating investment risks' },
  { id: 9, label: 'Generating investment recommendation' },
  { id: 10, label: 'Research complete' },
];

/**
 * Risk level color mapping.
 */
export const RISK_COLORS = {
  Low: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  Medium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  High: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};

/**
 * Sentiment color mapping.
 */
export const SENTIMENT_COLORS = {
  Bullish: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  Neutral: { bg: 'bg-slate-50', text: 'text-slate-700' },
  Bearish: { bg: 'bg-red-50', text: 'text-red-700' },
};

/**
 * Chart color palette.
 */
export const CHART_COLORS = {
  emerald: '#10b981',
  blue: '#3b82f6',
  amber: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
  slate: '#64748b',
  cyan: '#06b6d4',
  pink: '#ec4899',
};

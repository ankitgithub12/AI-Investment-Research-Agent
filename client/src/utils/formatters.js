/**
 * Formats large financial figures (e.g., billions, trillions) into readable currency formats.
 */
export function formatCurrency(value) {
  if (value === null || value === undefined || isNaN(Number(value))) return 'N/A';
  
  const num = Number(value);
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    maximumFractionDigits: 2 
  }).format(num);
}

/**
 * Formats a decimal ratio or raw percentage value into a formatted percentage string.
 */
export function formatPercent(value) {
  if (value === null || value === undefined || isNaN(Number(value))) return 'N/A';
  
  const num = Number(value);
  // If the absolute value is <= 1, assume it's a ratio (e.g., 0.253 -> 25.30%)
  const percentage = Math.abs(num) <= 1 ? num * 100 : num;
  
  return `${percentage.toFixed(2)}%`;
}

/**
 * Formats standard numbers with thousand separators.
 */
export function formatNumber(value) {
  if (value === null || value === undefined || isNaN(Number(value))) return 'N/A';
  return new Intl.NumberFormat('en-US').format(Number(value));
}

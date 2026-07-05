/**
 * Formats a large number into a readable string with suffix (K, M, B, T).
 * @param {number} num - The number to format
 * @returns {string} Formatted string
 */
export function formatLargeNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return 'N/A';

  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (absNum >= 1e12) return `${sign}$${(absNum / 1e12).toFixed(2)}T`;
  if (absNum >= 1e9) return `${sign}$${(absNum / 1e9).toFixed(2)}B`;
  if (absNum >= 1e6) return `${sign}$${(absNum / 1e6).toFixed(2)}M`;
  if (absNum >= 1e3) return `${sign}$${(absNum / 1e3).toFixed(1)}K`;
  return `${sign}$${absNum.toFixed(2)}`;
}

/**
 * Formats a decimal as a percentage string.
 * @param {number} value - Decimal value (e.g., 0.25 for 25%)
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export function formatPercentage(value, decimals = 1) {
  if (value === null || value === undefined || isNaN(value)) return 'N/A';
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Formats a number as a currency string.
 * @param {number} value
 * @param {string} currency - Currency code
 * @returns {string}
 */
export function formatCurrency(value, currency = 'USD') {
  if (value === null || value === undefined || isNaN(value)) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formats a number with commas.
 * @param {number} value
 * @returns {string}
 */
export function formatNumber(value) {
  if (value === null || value === undefined || isNaN(value)) return 'N/A';
  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Returns a score color based on the value (0-100).
 */
export function getScoreColor(score) {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-blue-600';
  if (score >= 40) return 'text-amber-600';
  return 'text-red-600';
}

/**
 * Returns a background color class based on score.
 */
export function getScoreBgColor(score) {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-blue-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-red-500';
}

/**
 * Truncates text to a given length.
 */
export function truncate(text, maxLength = 150) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

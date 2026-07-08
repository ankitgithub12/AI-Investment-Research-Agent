import config from '../../config/index.js';
import logger from '../../utils/logger.js';

/**
 * Safely fetches resources from the financial API.
 * Validates that response is ok and contains JSON content type before parsing.
 * Logs API failures in a structured format and throws descriptive errors.
 *
 * @param {string} url - Request target URL
 * @param {Object} options - Request options
 * @returns {Promise<*>} Parsed JSON payload
 */
async function safeFetch(url, options = {}) {
  const timeout = config.financial.requestTimeout;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);

    if (!response.ok) {
      let bodyText = '';
      try {
        bodyText = await response.text();
      } catch (e) {
        bodyText = '(Unable to read response body)';
      }

      logger.error(
        `Financial API Error\n\nStatus: ${response.status}\n\nMessage: ${bodyText || response.statusText}`
      );

      const err = new Error(bodyText || response.statusText || `HTTP ${response.status}`);
      err.status = response.status;
      throw err;
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const bodyText = await response.text();
      logger.error(
        `Financial API Error\n\nStatus: ${response.status}\n\nMessage: Expected JSON response but received ${contentType}. Body: ${bodyText}`
      );
      const err = new Error(`Expected JSON but received ${contentType}`);
      err.status = 502; // Bad Gateway / Invalid response format
      throw err;
    }

    return await response.json();
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      const err = new Error('Request timeout');
      err.status = 408; // Request Timeout
      throw err;
    }
    throw error;
  }
}

/**
 * FmpProvider handles communication with the Financial Modeling Prep API.
 */
export class FmpProvider {
  constructor() {
    this.apiKey = config.financial.fmpApiKey;
    this.baseUrl = 'https://financialmodelingprep.com/stable';
  }

  /**
   * Fetches the general company profile.
   * @param {string} symbol - Ticker symbol
   */
  async getCompanyProfile(symbol) {
    const url = `${this.baseUrl}/profile?symbol=${symbol.toUpperCase()}&apikey=${this.apiKey}`;
    return safeFetch(url);
  }

  /**
   * Fetches real-time stock price and volume quotes.
   * @param {string} symbol - Ticker symbol
   */
  async getQuote(symbol) {
    const url = `${this.baseUrl}/quote?symbol=${symbol.toUpperCase()}&apikey=${this.apiKey}`;
    return safeFetch(url);
  }

  /**
   * Fetches income statements, balance sheets, and cash flow statements.
   * @param {string} symbol - Ticker symbol
   */
  async getFinancialStatements(symbol) {
    const sym = symbol.toUpperCase();
    const [income, balance, cashFlow] = await Promise.all([
      safeFetch(`${this.baseUrl}/income-statement?symbol=${sym}&limit=5&apikey=${this.apiKey}`),
      safeFetch(`${this.baseUrl}/balance-sheet-statement?symbol=${sym}&limit=5&apikey=${this.apiKey}`),
      safeFetch(`${this.baseUrl}/cash-flow-statement?symbol=${sym}&limit=5&apikey=${this.apiKey}`),
    ]);
    return { income, balance, cashFlow };
  }

  /**
   * Fetches trailing twelve-month (TTM) key metrics and ratios.
   * @param {string} symbol - Ticker symbol
   */
  async getKeyMetrics(symbol) {
    const sym = symbol.toUpperCase();
    const [metrics, ratios] = await Promise.all([
      safeFetch(`${this.baseUrl}/key-metrics-ttm?symbol=${sym}&apikey=${this.apiKey}`),
      safeFetch(`${this.baseUrl}/ratios-ttm?symbol=${sym}&apikey=${this.apiKey}`),
    ]);
    return { metrics, ratios };
  }

  /**
   * Fetches historical stock price information.
   * @param {string} symbol - Ticker symbol
   */
  async getHistoricalPrices(symbol) {
    const url = `${this.baseUrl}/historical-price-eod/light?symbol=${symbol.toUpperCase()}&apikey=${this.apiKey}`;
    return safeFetch(url);
  }

  /**
   * Search for stock tickers matching a query.
   * @param {string} query - Company name or keyword
   */
  async searchTicker(query) {
    const url = `${this.baseUrl}/search-symbol?query=${encodeURIComponent(query)}&apikey=${this.apiKey}`;
    return safeFetch(url);
  }
}

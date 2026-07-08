import { FmpProvider } from './providers/fmpProvider.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';
import { ValidationError } from '../utils/errors.js';

// Hardcoded common company-name-to-ticker mappings
const COMMON_TICKERS = {
  apple: 'AAPL',
  microsoft: 'MSFT',
  google: 'GOOGL',
  alphabet: 'GOOGL',
  amazon: 'AMZN',
  meta: 'META',
  facebook: 'META',
  tesla: 'TSLA',
  nvidia: 'NVDA',
  netflix: 'NFLX',
  disney: 'DIS',
  intel: 'INTC',
  amd: 'AMD',
  ibm: 'IBM',
  oracle: 'ORCL',
  salesforce: 'CRM',
  adobe: 'ADBE',
  paypal: 'PYPL',
  spotify: 'SPOT',
  uber: 'UBER',
  airbnb: 'ABNB',
  snap: 'SNAP',
  twitter: 'TWTR',
  shopify: 'SHOP',
  zoom: 'ZM',
  palantir: 'PLTR',
  coinbase: 'COIN',
  rivian: 'RIVN',
  lucid: 'LCID',
  samsung: '005930.KS',
  sony: 'SONY',
  toyota: 'TM',
  nike: 'NKE',
  coca: 'KO',
  'coca-cola': 'KO',
  'coca cola': 'KO',
  pepsi: 'PEP',
  pepsico: 'PEP',
  walmart: 'WMT',
  costco: 'COST',
  starbucks: 'SBUX',
  mcdonald: 'MCD',
  mcdonalds: 'MCD',
  "mcdonald's": 'MCD',
  boeing: 'BA',
  visa: 'V',
  mastercard: 'MA',
  jpmorgan: 'JPM',
  'jp morgan': 'JPM',
  'goldman sachs': 'GS',
  'bank of america': 'BAC',
  morgan: 'MS',
  'morgan stanley': 'MS',
  citigroup: 'C',
  wells: 'WFC',
  'wells fargo': 'WFC',
  berkshire: 'BRK-B',
  'berkshire hathaway': 'BRK-B',
  johnson: 'JNJ',
  'johnson & johnson': 'JNJ',
  pfizer: 'PFE',
  moderna: 'MRNA',
  unitedhealth: 'UNH',
  qualcomm: 'QCOM',
  broadcom: 'AVGO',
  tcs: 'TCS.NS',
  infosys: 'INFY',
  reliance: 'RELIANCE.NS',
  wipro: 'WIPRO.NS',
  hdfc: 'HDFCBANK.NS',
  tata: 'TATAMOTORS.NS',
};

// Instantiate the configured provider
let activeProvider;
if (config.financial.provider === 'fmp') {
  activeProvider = new FmpProvider();
} else {
  throw new Error(`Unsupported financial provider: ${config.financial.provider}`);
}

// In-memory cache map
const cache = new Map();

/**
 * Gets a value from cache or fetches it using the retry & fallback mechanism.
 * @param {string} symbol - Ticker symbol
 */
export async function getAggregatedFinancialData(symbol) {
  const ticker = symbol.toUpperCase();
  const cacheKey = ticker;
  
  const cacheDurationMs = config.financial.cacheDuration * 1000;
  const cachedVal = cache.get(cacheKey);
  
  if (cachedVal && (Date.now() - cachedVal.timestamp < cacheDurationMs)) {
    logger.success(`Financial data loaded from cache.\n\nCache:\nHIT`);
    return cachedVal.data;
  }

  const startTime = Date.now();
  const providerLabel = config.financial.provider === 'fmp' ? 'Financial Modeling Prep' : config.financial.provider;
  const maxRetries = config.financial.maxRetries;
  
  let attempt = 1;
  while (attempt <= maxRetries + 1) {
    logger.info(
      `Fetching financial data...\n\nProvider:\n${providerLabel}\n\nTicker:\n${ticker}\n\nAttempt:\n${attempt}\n\nCache:\nMISS`
    );

    try {
      // Fetch in parallel
      const [profileRes, quoteRes, statementsRes, metricsRes] = await Promise.all([
        activeProvider.getCompanyProfile(ticker),
        activeProvider.getQuote(ticker),
        activeProvider.getFinancialStatements(ticker),
        activeProvider.getKeyMetrics(ticker),
      ]);

      const data = mapProviderDataToUnified(ticker, {
        profileRes,
        quoteRes,
        statementsRes,
        metricsRes,
      });

      const elapsed = Date.now() - startTime;
      logger.success(
        `Financial data fetched successfully.\n\nProvider:\n${providerLabel}\n\nResponse Time:\n${elapsed}ms\n\nCache:\nMISS`
      );

      // Save to cache
      cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      return data;
    } catch (error) {
      const status = error.status;
      const isTransient = [429, 500, 502, 503, 504].includes(status);

      if (attempt === maxRetries + 1 || !isTransient) {
        throw error;
      }

      const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s, 8s
      logger.warn(
        `Financial API transient error (${status || 'unknown'}) for ${ticker} (attempt ${attempt}/${maxRetries + 1}). Retrying in ${delay}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempt++;
    }
  }
}

/**
 * Resolves a company name to its stock ticker symbol.
 * Throws ValidationError if not resolved.
 * @param {string} companyName - Name of the company
 */
export async function resolveTicker(companyName) {
  const normalizedName = companyName.trim().toLowerCase();

  // 1. Instant check in the common map
  if (COMMON_TICKERS[normalizedName]) {
    const ticker = COMMON_TICKERS[normalizedName];
    logger.info(`Resolved "${companyName}" to ticker via lookup: ${ticker}`);
    return ticker;
  }

  // 2. Call provider search with retry (using ticker = companyName for logging context)
  try {
    const maxRetries = config.financial.maxRetries;
    let attempt = 1;
    let results;
    
    while (attempt <= maxRetries + 1) {
      try {
        results = await activeProvider.searchTicker(companyName);
        break;
      } catch (error) {
        const status = error.status;
        const isTransient = [429, 500, 502, 503, 504].includes(status);
        if (attempt === maxRetries + 1 || !isTransient) {
          throw error;
        }
        const delay = Math.pow(2, attempt - 1) * 1000;
        logger.warn(`Ticker search transient error (${status || 'unknown'}) for "${companyName}" (attempt ${attempt}/${maxRetries + 1}). Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        attempt++;
      }
    }

    if (results && results.length > 0) {
      const match = results[0];
      logger.info(`Resolved "${companyName}" to ticker: ${match.symbol}`);
      return match.symbol;
    }
  } catch (error) {
    logger.error(`Ticker resolution failed for "${companyName}": ${error.message}`);
  }

  // 3. Try partial matching against common tickers map
  const partial = Object.entries(COMMON_TICKERS).find(
    ([key]) => normalizedName.includes(key) || key.includes(normalizedName)
  );
  if (partial) {
    logger.info(`Resolved "${companyName}" via partial match: ${partial[1]}`);
    return partial[1];
  }

  // 4. Return clear error if no ticker is resolved
  throw new ValidationError(`Unable to resolve ticker symbol for company "${companyName}".`);
}

/**
 * Maps raw provider results into the unified schema.
 */
function mapProviderDataToUnified(symbol, { profileRes, quoteRes, statementsRes, metricsRes }) {
  const profile = (profileRes && profileRes[0]) || {};
  const quote = (quoteRes && quoteRes[0]) || {};
  const metrics = (metricsRes?.metrics && metricsRes.metrics[0]) || {};
  const ratios = (metricsRes?.ratios && metricsRes.ratios[0]) || {};
  const income = (statementsRes?.income && statementsRes.income[0]) || {};
  const prevIncome = (statementsRes?.income && statementsRes.income[1]) || {};
  const balance = (statementsRes?.balance && statementsRes.balance[0]) || {};
  const cashFlow = (statementsRes?.cashFlow && statementsRes.cashFlow[0]) || {};

  const shortTermDebt = balance.shortTermDebt || 0;
  const longTermDebt = balance.longTermDebt || 0;
  const computedTotalDebt = balance.totalDebt || (shortTermDebt + longTermDebt) || null;

  let revenueGrowth = null;
  if (income.revenue !== undefined && prevIncome.revenue !== undefined && prevIncome.revenue !== 0) {
    revenueGrowth = (income.revenue - prevIncome.revenue) / prevIncome.revenue;
  }

  let earningsGrowth = null;
  if (income.netIncome !== undefined && prevIncome.netIncome !== undefined && prevIncome.netIncome !== 0) {
    earningsGrowth = (income.netIncome - prevIncome.netIncome) / Math.abs(prevIncome.netIncome);
  }

  return {
    symbol: symbol.toUpperCase(),
    companyName: profile.companyName || quote.name || symbol,
    currentPrice: quote.price || profile.price || null,
    currency: profile.currency || quote.currency || 'USD',
    marketCap: quote.marketCap || profile.mktCap || null,
    peRatio: quote.pe || metrics.peRatioTTM || ratios.priceEarningsRatioTTM || null,
    forwardPE: null,
    priceToBook: ratios.priceToBookRatioTTM || metrics.priceToBookRatioTTM || null,
    fiftyTwoWeekHigh: quote.yearHigh || null,
    fiftyTwoWeekLow: quote.yearLow || null,
    dividendYield: ratios.dividendYieldTTM || null,
    volume: quote.volume || null,
    averageVolume: quote.avgVolume || profile.volAvg || null,
    dayChange: quote.changesPercentage || null,

    // From asset profile
    sector: profile.sector || 'N/A',
    industry: profile.industry || 'N/A',
    employees: profile.fullTimeEmployees || 'N/A',
    website: profile.website || 'N/A',
    description: profile.description || '',

    // From financial data
    totalRevenue: income.revenue || null,
    revenueGrowth,
    grossMargin: ratios.grossProfitMarginTTM || null,
    operatingMargin: ratios.operatingProfitMarginTTM || null,
    profitMargin: ratios.netProfitMarginTTM || null,
    returnOnEquity: ratios.returnOnEquityTTM || metrics.roeTTM || null,
    debtToEquity: ratios.debtToEquityTTM || metrics.debtToEquityTTM || null,
    currentRatio: ratios.currentRatioTTM || metrics.currentRatioTTM || null,
    freeCashFlow: cashFlow.freeCashFlow || null,
    operatingCashFlow: cashFlow.operatingCashFlow || cashFlow.netCashProvidedByOperatingActivities || null,
    totalDebt: computedTotalDebt,
    totalCash: balance.cashAndCashEquivalents || balance.cashAndShortTermInvestments || null,
    earningsGrowth,
    revenuePerShare: metrics.revenuePerShareTTM || null,
    targetMeanPrice: null,
    recommendationMean: null,
    recommendationKey: null,

    // Key statistics
    beta: profile.beta || null,
    enterpriseValue: metrics.enterpriseValueTTM || null,
    pegRatio: ratios.pegRatioTTM || metrics.pegRatioTTM || null,
    shortRatio: null,
  };
}

// Expose individual client-facing API functions requested
export async function getCompanyProfile(symbol) {
  return activeProvider.getCompanyProfile(symbol);
}

export async function getQuote(symbol) {
  return activeProvider.getQuote(symbol);
}

export async function getFinancialStatements(symbol) {
  return activeProvider.getFinancialStatements(symbol);
}

export async function getKeyMetrics(symbol) {
  return activeProvider.getKeyMetrics(symbol);
}

export async function getHistoricalPrices(symbol) {
  return activeProvider.getHistoricalPrices(symbol);
}

// Helper to clear cache for testing/debugging
export function clearCache() {
  cache.clear();
}

import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  google: {
    apiKey: process.env.GOOGLE_API_KEY,
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
  },
  openRouter: {
    apiKey: process.env.OPENROUTER_API_KEY,
    model: process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash',
  },
  tavily: {
    apiKey: process.env.TAVILY_API_KEY,
  },
  newsApi: {
    apiKey: process.env.NEWS_API_KEY,
  },
  financial: {
    provider: process.env.FINANCIAL_PROVIDER || 'fmp',
    fmpApiKey: process.env.FMP_API_KEY,
    cacheDuration: parseInt(process.env.CACHE_DURATION, 10) || 600,
    maxRetries: parseInt(process.env.MAX_RETRIES, 10) || 4,
    requestTimeout: parseInt(process.env.REQUEST_TIMEOUT, 10) || 10000,
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // default 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 50, // default 50 requests per windowMs
  },
};

/**
 * Validates that all required environment variables are set.
 * Throws an error if any required keys are missing.
 */
export function validateConfig() {
  // Validate Tavily
  if (!config.tavily.apiKey) {
    throw new Error('Missing required environment variable: TAVILY_API_KEY. Please check your .env file.');
  }

  // Validate Financial Provider
  if (config.financial.provider === 'fmp' && !config.financial.fmpApiKey) {
    throw new Error('Missing required environment variable: FMP_API_KEY. Please check your .env file.');
  }

  // Validate LLM Keys (At least one is required: Google Gemini or OpenRouter)
  const hasGoogleKey = config.google.apiKey && config.google.apiKey !== 'your-gemini-api-key-here';
  const hasOpenRouterKey = !!config.openRouter.apiKey;

  if (!hasGoogleKey && !hasOpenRouterKey) {
    throw new Error(
      'Missing required LLM configuration. Please provide either GOOGLE_API_KEY or OPENROUTER_API_KEY in server/.env.'
    );
  }
}



export default config;

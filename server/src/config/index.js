import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4.1',
  },
  tavily: {
    apiKey: process.env.TAVILY_API_KEY,
  },
  newsApi: {
    apiKey: process.env.NEWS_API_KEY,
  },
};

/**
 * Validates that all required environment variables are set.
 * Throws an error if any required keys are missing.
 */
export function validateConfig() {
  const required = [
    ['OPENAI_API_KEY', config.openai.apiKey],
    ['TAVILY_API_KEY', config.tavily.apiKey],
  ];

  const missing = required
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
      'Please check your .env file.'
    );
  }
}

export default config;

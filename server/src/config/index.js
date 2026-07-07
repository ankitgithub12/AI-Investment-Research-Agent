import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  google: {
    apiKey: process.env.GOOGLE_API_KEY,
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
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
    ['GOOGLE_API_KEY', config.google.apiKey],
    ['TAVILY_API_KEY', config.tavily.apiKey],
  ];

  if (config.google.apiKey === 'your-gemini-api-key-here') {
    throw new Error(
      'GOOGLE_API_KEY is set to the default placeholder. ' +
      'Please replace it with your actual Gemini API key from Google AI Studio in server/.env.'
    );
  }

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

import app from './app.js';
import config, { validateConfig } from './config/index.js';
import logger from './utils/logger.js';

/**
 * Server entry point.
 * Validates configuration, then starts Express.
 */
async function start() {
  try {
    // Validate required environment variables
    validateConfig();

    app.listen(config.port, () => {
      logger.success(`Server running on http://localhost:${config.port}`);
      logger.info(`Environment: ${config.nodeEnv}`);
      logger.info(`LLM Model: ${config.google.model}`);
      logger.info('API Endpoints:');
      logger.info('  POST /api/research  — Run investment research');
      logger.info('  GET  /api/health    — Health check');
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
}

start();

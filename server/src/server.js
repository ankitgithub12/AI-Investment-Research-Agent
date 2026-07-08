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

    const server = app.listen(config.port, () => {
      logger.success(`Server running on http://localhost:${config.port}`);
      logger.info(`Environment: ${config.nodeEnv}`);
      logger.info(`LLM Model: ${config.google.model}`);
      logger.info('API Endpoints:');
      logger.info('  POST /api/research  — Run investment research');
      logger.info('  GET  /api/health    — Health check');
    });

    // Allow long-running research requests (3 minutes)
    server.timeout = 180000;
    server.keepAliveTimeout = 180000;
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
}

// Prevent unhandled errors from crashing the server
process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Promise Rejection: ${reason?.message || reason}`);
});

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  // Don't exit — allow the server to keep running
});

start();

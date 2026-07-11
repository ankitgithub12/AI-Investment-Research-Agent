import rateLimit from 'express-rate-limit';
import config from '../config/index.js';
import logger from '../utils/logger.js';

/**
 * Express middleware to rate limit API requests.
 * Uses config values from the environment or defaults to 50 requests per 15 minutes.
 */
export const apiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    error: 'TooManyRequests',
    message: 'Too many requests from this IP, please try again later.',
  },
  handler: (req, res, next, options) => {
    const ip = req.ip || req.headers['x-forwarded-for'];
    logger.warn(`Rate limit exceeded for IP: ${ip} on path: ${req.path}`);
    res.status(options.statusCode).json(options.message);
  },
});

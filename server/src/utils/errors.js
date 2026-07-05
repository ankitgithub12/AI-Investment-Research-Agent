/**
 * Base application error with status code support.
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}

/**
 * Validation error for invalid user input.
 */
export class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

/**
 * Error for when an external API fails.
 */
export class ExternalApiError extends AppError {
  constructor(service, message) {
    super(`${service} API error: ${message}`, 502);
    this.name = 'ExternalApiError';
    this.service = service;
  }
}

/**
 * Error for missing or invalid API keys.
 */
export class ConfigurationError extends AppError {
  constructor(message) {
    super(message, 500);
    this.name = 'ConfigurationError';
  }
}

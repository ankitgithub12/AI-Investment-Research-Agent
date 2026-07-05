import { conductResearch } from '../services/researchService.js';
import { ValidationError } from '../utils/errors.js';
import logger from '../utils/logger.js';

/**
 * Handles POST /api/research requests.
 * Validates the company name, runs the research pipeline, and returns results.
 */
export async function researchCompany(req, res, next) {
  try {
    const { company } = req.body;

    // ── Validation ──────────────────────────────────────────────────
    if (!company || typeof company !== 'string') {
      throw new ValidationError('Company name is required. Please provide a valid company name.');
    }

    const companyName = company.trim();
    if (companyName.length < 2) {
      throw new ValidationError('Company name must be at least 2 characters long.');
    }

    if (companyName.length > 100) {
      throw new ValidationError('Company name must be less than 100 characters.');
    }

    logger.info(`Research request received for: ${companyName}`);

    // ── Run Research Pipeline ───────────────────────────────────────
    const result = await conductResearch(companyName);

    // ── Return Response ─────────────────────────────────────────────
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handles GET /api/health for health checks.
 */
export function healthCheck(req, res) {
  res.status(200).json({
    status: 'healthy',
    service: 'AI Investment Research Agent',
    timestamp: new Date().toISOString(),
  });
}

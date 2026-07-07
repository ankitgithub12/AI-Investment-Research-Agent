import { z } from 'zod';
import { conductResearch } from '../services/researchService.js';
import { ValidationError } from '../utils/errors.js';
import logger from '../utils/logger.js';

const researchSchema = z.object({
  company: z.string({
    required_error: 'Company name is required.',
    invalid_type_error: 'Company name must be a string.',
  })
  .trim()
  .min(2, 'Company name must be at least 2 characters long.')
  .max(100, 'Company name must be less than 100 characters.'),
});

/**
 * Handles POST /api/research requests.
 * Validates the company name, runs the research pipeline, and returns results.
 */
export async function researchCompany(req, res, next) {
  try {
    const validationResult = researchSchema.safeParse(req.body);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]?.message || 'Invalid company name.';
      throw new ValidationError(firstError);
    }

    const companyName = validationResult.data.company;
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

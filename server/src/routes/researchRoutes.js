import { Router } from 'express';
import { researchCompany, healthCheck } from '../controllers/researchController.js';

const router = Router();

/**
 * POST /api/research
 * Body: { "company": "Tesla" }
 * Returns: Complete investment research report
 */
router.post('/research', researchCompany);

/**
 * GET /api/health
 * Returns: Service health status
 */
router.get('/health', healthCheck);

export default router;

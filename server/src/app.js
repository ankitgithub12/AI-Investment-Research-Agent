import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import researchRoutes from './routes/researchRoutes.js';
import logger from './utils/logger.js';
import { apiLimiter } from './middlewares/rateLimiter.js';

const app = express();

// Enable trust proxy in production to get correct client IPs for rate limiting
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// ── Security Middleware ──────────────────────────────────────────────
app.use(helmet());

// ── Rate Limiting ────────────────────────────────────────────────────
app.use('/api', apiLimiter);

// ── CORS ─────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_URL
      : ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// ── Request Parsing ──────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));

// ── Logging ──────────────────────────────────────────────────────────
app.use(morgan('dev'));

// ── API Routes ───────────────────────────────────────────────────────
app.use('/api', researchRoutes);

// ── 404 Handler ──────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.path}`,
  });
});

// ── Global Error Handler ─────────────────────────────────────────────
app.use((err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  logger.error(`[${statusCode}] ${message}`, {
    path: req.path,
    method: req.method,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });

  res.status(statusCode).json({
    success: false,
    error: err.name || 'ServerError',
    message:
      statusCode === 500 && process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred. Please try again later.'
        : message,
  });
});

export default app;

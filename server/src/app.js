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
const getAllowedOrigins = () => {
  const origins = [];
  
  if (process.env.CLIENT_URL) {
    const envOrigins = process.env.CLIENT_URL.split(',')
      .map(url => url.trim().replace(/\/$/, ''))
      .filter(Boolean);
    origins.push(...envOrigins);
  }
  
  // Default permitted origins (local dev + deployed app)
  origins.push(
    'https://ai-investment-research-agent-topaz.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5000'
  );
  
  return [...new Set(origins)];
};

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman, etc.)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = getAllowedOrigins();
      const originClean = origin.trim().replace(/\/$/, '');
      
      const isAllowed = allowedOrigins.includes(originClean) ||
        originClean.endsWith('.vercel.app') ||
        (process.env.NODE_ENV !== 'production' && (
          originClean.startsWith('http://localhost:') ||
          originClean.startsWith('http://127.0.0.1:') ||
          originClean.startsWith('http://192.168.')
        ));
        
      if (isAllowed) {
        callback(null, true);
      } else {
        logger.warn(`CORS blocked request from origin: ${origin}`);
        callback(null, false); // Omit Access-Control-Allow-Origin header to block the request
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
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

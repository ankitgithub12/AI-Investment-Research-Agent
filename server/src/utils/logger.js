const LEVELS = {
  info: { label: 'INFO', color: '\x1b[36m' },
  warn: { label: 'WARN', color: '\x1b[33m' },
  error: { label: 'ERROR', color: '\x1b[31m' },
  success: { label: 'OK', color: '\x1b[32m' },
  debug: { label: 'DEBUG', color: '\x1b[90m' },
};

const RESET = '\x1b[0m';

function formatMessage(level, message, meta) {
  const { label, color } = LEVELS[level];
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
  return `${color}[${label}]${RESET} ${timestamp} — ${message}${metaStr}`;
}

const logger = {
  info: (message, meta) => console.log(formatMessage('info', message, meta)),
  warn: (message, meta) => console.warn(formatMessage('warn', message, meta)),
  error: (message, meta) => console.error(formatMessage('error', message, meta)),
  success: (message, meta) => console.log(formatMessage('success', message, meta)),
  debug: (message, meta) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(formatMessage('debug', message, meta));
    }
  },
};

export default logger;

import axios from 'axios';

// The base URL can be customized via the VITE_API_URL environment variable.
// In development, the Vite proxy handles routing to the Express server when this is blank.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 120000, // 120s — matches Vite proxy timeout for long research pipelines
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

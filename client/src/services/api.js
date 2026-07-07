import axios from 'axios';

// The base URL can be customized via the VITE_API_URL environment variable.
// In development, the Vite proxy handles routing to the Express server when this is blank.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

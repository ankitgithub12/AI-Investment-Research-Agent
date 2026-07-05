import axios from 'axios';

/**
 * Axios instance configured for the API.
 * - Development: VITE_API_BASE_URL is empty, so baseURL = '/api' (Vite proxy handles it)
 * - Production:  VITE_API_BASE_URL = 'https://api.yourdomain.com/api'
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000, // 2 minutes — AI research takes time
});

/**
 * Sends a research request for a company.
 * @param {string} company - The company name to research
 * @returns {Promise<Object>} The research results
 */
export async function researchCompany(company) {
  const response = await api.post('/research', { company });
  return response.data;
}

export default api;

import { useMutation } from '@tanstack/react-query';
import api from '../services/api.js';

/**
 * Custom React Query hook for submitting investment research requests.
 * Uses a mutation to fetch the structured analysis report.
 */
export function useResearch() {
  return useMutation({
    mutationFn: async (companyName) => {
      const response = await api.post('/api/research', { company: companyName });
      return response.data;
    },
  });
}

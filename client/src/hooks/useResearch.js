import { useMutation } from '@tanstack/react-query';
import { researchCompany } from '@/services/api';

/**
 * React Query mutation hook for conducting company research.
 *
 * Usage:
 *   const { mutate, data, isPending, isError, error } = useResearch();
 *   mutate('Apple');
 */
export function useResearch() {
  return useMutation({
    mutationKey: ['research'],
    mutationFn: (company) => researchCompany(company),
    retry: false, // Don't retry on failure — LLM calls are expensive
  });
}

import { TavilySearch } from '@langchain/tavily';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import config from '../config/index.js';
import logger from '../utils/logger.js';

/**
 * Creates a LangChain tool that searches for company information using Tavily.
 * Returns structured search results about the company.
 */
export function createCompanySearchTool() {
  return new DynamicStructuredTool({
    name: 'company_search',
    description: 'Search for comprehensive information about a public company including business model, products, leadership, and market position.',
    schema: z.object({
      query: z.string().describe('The company name to search for'),
    }),
    func: async ({ query }) => {
      try {
        logger.info(`Searching for company: ${query}`);

        const tavilySearch = new TavilySearch({
          apiKey: config.tavily.apiKey,
          maxResults: 5,
        });

        const results = await tavilySearch.invoke({
          query: `${query} company overview business model products revenue 2024 2025`,
        });

        logger.success(`Company search completed for: ${query}`);
        return typeof results === 'string' ? results : JSON.stringify(results);
      } catch (error) {
        logger.error(`Company search failed for: ${query}`, { error: error.message });
        return JSON.stringify({
          error: true,
          message: `Failed to search for ${query}: ${error.message}`,
        });
      }
    },
  });
}

/**
 * Standalone function to search for company information.
 * Used directly by the research service without going through LLM tool calling.
 */
export async function searchCompany(companyName) {
  try {
    logger.info(`Searching for company: ${companyName}`);

    const tavilySearch = new TavilySearch({
      apiKey: config.tavily.apiKey,
      maxResults: 5,
    });

    const results = await tavilySearch.invoke({
      query: `${companyName} company overview business model products revenue market position 2024 2025`,
    });

    logger.success(`Company search completed for: ${companyName}`);
    return typeof results === 'string' ? results : JSON.stringify(results);
  } catch (error) {
    logger.error(`Company search failed: ${error.message}`);
    return `Unable to find detailed information about ${companyName}. The company may not be publicly traded or the search service is temporarily unavailable.`;
  }
}

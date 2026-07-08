import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { resolveTicker, getAggregatedFinancialData } from '../services/financialService.js';
import logger from '../utils/logger.js';

/**
 * Creates a LangChain tool that fetches financial data from the active provider.
 */
export function createFinancialDataTool() {
  return new DynamicStructuredTool({
    name: 'financial_data',
    description: 'Fetch financial data for a public company including stock price, market cap, P/E ratio, revenue, and key financial metrics.',
    schema: z.object({
      symbol: z.string().describe('The stock ticker symbol (e.g., AAPL, TSLA)'),
    }),
    func: async ({ symbol }) => {
      const data = await fetchFinancialData(symbol);
      return JSON.stringify(data);
    },
  });
}

/**
 * Resolves a company name to its stock ticker symbol.
 */
export async function resolveTickerSymbol(companyName) {
  return resolveTicker(companyName);
}

/**
 * Fetches comprehensive financial data for a given ticker symbol.
 * Returns a structured object even on failure so the pipeline can continue.
 */
export async function fetchFinancialData(symbol) {
  try {
    return await getAggregatedFinancialData(symbol);
  } catch (error) {
    logger.error(`Financial data fetch failed for ${symbol}: ${error.message}`);
    // Return a descriptive fallback so the LLM can still reason about the company
    return {
      symbol: symbol.toUpperCase(),
      error: true,
      message: `Financial data temporarily unavailable for ${symbol} due to connection issue or rate limit. The AI will analyze based on available search and news data.`,
      note: 'Financial provider is currently unavailable. Financial metrics are unavailable for this analysis.',
    };
  }
}

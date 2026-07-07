import { RunnableSequence } from '@langchain/core/runnables';
import { llm } from '../config/llm.js';
import { financePrompt } from '../prompts/financePrompt.js';
import logger from '../utils/logger.js';

/**
 * Financial Chain
 *
 * Takes raw financial data and produces a detailed financial health analysis.
 *
 * Pipeline: financePrompt → ChatGoogleGenerativeAI → string output
 */
export function createFinancialChain() {
  const chain = RunnableSequence.from([financePrompt, llm]);

  return {
    /**
     * Runs the financial chain to analyze financial health.
     * @param {string} companyName
     * @param {string} financialData - Stringified financial metrics
     * @returns {string} Financial health analysis
     */
    invoke: async (companyName, financialData) => {
      try {
        logger.info(`Running financial chain for: ${companyName}`);
        const result = await chain.invoke({
          companyName,
          financialData,
        });
        logger.success(`Financial chain completed for: ${companyName}`);
        return result.content;
      } catch (error) {
        logger.error(`Financial chain failed: ${error.message}`);
        throw error;
      }
    },
  };
}

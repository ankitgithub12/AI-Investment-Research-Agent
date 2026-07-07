import { RunnableSequence } from '@langchain/core/runnables';
import { llm } from '../config/llm.js';
import { businessPrompt } from '../prompts/businessPrompt.js';
import logger from '../utils/logger.js';

/**
 * Research Chain
 *
 * Takes raw search data and financial profile,
 * then produces a structured business overview using the LLM.
 *
 * Pipeline: businessPrompt → ChatGoogleGenerativeAI → string output
 */
export function createResearchChain() {
  const chain = RunnableSequence.from([businessPrompt, llm]);

  return {
    /**
     * Runs the research chain to generate a business overview.
     * @param {string} companyName
     * @param {string} searchData - Raw search results from Tavily
     * @param {string} financialData - Stringified financial data
     * @returns {string} Business overview analysis
     */
    invoke: async (companyName, searchData, financialData) => {
      try {
        logger.info(`Running research chain for: ${companyName}`);
        const result = await chain.invoke({
          companyName,
          searchData,
          financialData,
        });
        logger.success(`Research chain completed for: ${companyName}`);
        return result.content;
      } catch (error) {
        logger.error(`Research chain failed: ${error.message}`);
        throw error;
      }
    },
  };
}

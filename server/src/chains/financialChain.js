import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { financePrompt } from '../prompts/financePrompt.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';

/**
 * Financial Chain
 *
 * Takes raw financial data and produces a detailed financial health analysis.
 *
 * Pipeline: financePrompt → ChatOpenAI → string output
 */
export function createFinancialChain() {
  const model = new ChatOpenAI({
    modelName: config.openai.model,
    openAIApiKey: config.openai.apiKey,
    temperature: 0.2,
    maxTokens: 1500,
  });

  const chain = RunnableSequence.from([financePrompt, model]);

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

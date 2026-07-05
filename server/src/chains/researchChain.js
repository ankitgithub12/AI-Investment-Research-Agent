import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { businessPrompt } from '../prompts/businessPrompt.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';

/**
 * Research Chain
 *
 * Takes raw search data and financial profile,
 * then produces a structured business overview using the LLM.
 *
 * Pipeline: businessPrompt → ChatOpenAI → string output
 */
export function createResearchChain() {
  const model = new ChatOpenAI({
    modelName: config.openai.model,
    openAIApiKey: config.openai.apiKey,
    temperature: 0.3,
    maxTokens: 1500,
  });

  const chain = RunnableSequence.from([businessPrompt, model]);

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

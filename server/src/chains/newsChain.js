import { RunnableSequence } from '@langchain/core/runnables';
import { llm } from '../config/llm.js';
import { newsPrompt } from '../prompts/newsPrompt.js';
import logger from '../utils/logger.js';

/**
 * News Chain
 *
 * Takes raw news data and produces a sentiment analysis with key highlights.
 *
 * Pipeline: newsPrompt → ChatGoogleGenerativeAI → string output
 */
export function createNewsChain() {
  const chain = RunnableSequence.from([newsPrompt, llm]);

  return {
    /**
     * Runs the news chain to analyze recent news sentiment.
     * @param {string} companyName
     * @param {string} newsData - Stringified news articles
     * @returns {string} News sentiment analysis
     */
    invoke: async (companyName, newsData) => {
      try {
        logger.info(`Running news chain for: ${companyName}`);
        const result = await chain.invoke({
          companyName,
          newsData,
        });
        logger.success(`News chain completed for: ${companyName}`);
        return result.content;
      } catch (error) {
        logger.error(`News chain failed: ${error.message}`);
        throw error;
      }
    },
  };
}

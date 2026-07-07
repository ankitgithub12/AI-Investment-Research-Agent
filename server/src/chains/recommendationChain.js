import { RunnableSequence, RunnableLambda } from '@langchain/core/runnables';
import { llm } from '../config/llm.js';
import { recommendationPrompt } from '../prompts/recommendationPrompt.js';
import { parseJSON } from '../utils/jsonParser.js';
import logger from '../utils/logger.js';

/**
 * Recommendation Chain
 *
 * The final chain in the pipeline. Takes all previous analysis outputs
 * and generates a structured investment recommendation with scores,
 * chart data, and detailed reasoning.
 *
 * Pipeline: recommendationPrompt → ChatGoogleGenerativeAI → JSON parser → structured result
 */
export function createRecommendationChain() {
  /**
   * Custom parser that extracts JSON from the LLM response.
   * Uses the jsonParser utility to handle markdown code blocks.
   */
  const jsonParser = new RunnableLambda({
    func: (input) => parseJSON(input),
  });

  const chain = RunnableSequence.from([recommendationPrompt, llm, jsonParser]);

  return {
    /**
     * Runs the recommendation chain to generate the final investment recommendation.
     * @param {Object} params
     * @param {string} params.companyName
     * @param {string} params.businessOverview - From research chain
     * @param {string} params.financialAnalysis - From financial chain
     * @param {string} params.newsAnalysis - From news chain
     * @param {string} params.riskAnalysis - From analysis chain
     * @param {string} params.financialData - Raw financial data
     * @returns {Object} Structured recommendation JSON
     */
    invoke: async ({ companyName, businessOverview, financialAnalysis, newsAnalysis, riskAnalysis, financialData }) => {
      try {
        logger.info(`Running recommendation chain for: ${companyName}`);
        const result = await chain.invoke({
          companyName,
          businessOverview,
          financialAnalysis,
          newsAnalysis,
          riskAnalysis,
          financialData,
        });
        logger.success(`Recommendation chain completed for: ${companyName}`);
        return result;
      } catch (error) {
        logger.error(`Recommendation chain failed: ${error.message}`);
        throw error;
      }
    },
  };
}

import { RunnableSequence, RunnableLambda } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { recommendationPrompt } from '../prompts/recommendationPrompt.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';

/**
 * Recommendation Chain
 *
 * The final chain in the pipeline. Takes all previous analysis outputs
 * and generates a structured investment recommendation with scores,
 * chart data, and detailed reasoning.
 *
 * Pipeline: recommendationPrompt → ChatOpenAI → JSON parser → structured result
 */
export function createRecommendationChain() {
  const model = new ChatOpenAI({
    modelName: config.openai.model,
    openAIApiKey: config.openai.apiKey,
    temperature: 0.4,
    maxTokens: 4000,
  });

  /**
   * Custom parser that extracts JSON from the LLM response.
   * Handles cases where the LLM wraps JSON in markdown code blocks.
   */
  const jsonParser = new RunnableLambda({
    func: (input) => {
      const content = typeof input === 'string' ? input : input.content;
      try {
        // Try direct parse first
        return JSON.parse(content);
      } catch {
        // Try extracting from markdown code block
        const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[1].trim());
        }
        // Try finding the first { to last }
        const start = content.indexOf('{');
        const end = content.lastIndexOf('}');
        if (start !== -1 && end !== -1) {
          return JSON.parse(content.slice(start, end + 1));
        }
        throw new Error('Could not parse LLM response as JSON');
      }
    },
  });

  const chain = RunnableSequence.from([recommendationPrompt, model, jsonParser]);

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

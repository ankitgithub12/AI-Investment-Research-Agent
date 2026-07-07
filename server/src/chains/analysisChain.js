import { RunnableSequence } from '@langchain/core/runnables';
import { llm } from '../config/llm.js';
import { riskPrompt } from '../prompts/riskPrompt.js';
import logger from '../utils/logger.js';

/**
 * Analysis Chain
 *
 * Takes the outputs of previous chains (business overview, financial analysis,
 * news analysis) and produces a comprehensive risk and opportunity assessment.
 *
 * Pipeline: riskPrompt → ChatGoogleGenerativeAI → string output
 */
export function createAnalysisChain() {
  const chain = RunnableSequence.from([riskPrompt, llm]);

  return {
    /**
     * Runs the analysis chain to evaluate risks, opportunities, and competitive position.
     * @param {string} companyName
     * @param {string} businessOverview - Output from research chain
     * @param {string} financialAnalysis - Output from financial chain
     * @param {string} newsAnalysis - Output from news chain
     * @returns {string} SWOT and risk analysis
     */
    invoke: async (companyName, businessOverview, financialAnalysis, newsAnalysis) => {
      try {
        logger.info(`Running analysis chain for: ${companyName}`);
        const result = await chain.invoke({
          companyName,
          businessOverview,
          financialAnalysis,
          newsAnalysis,
        });
        logger.success(`Analysis chain completed for: ${companyName}`);
        return result.content;
      } catch (error) {
        logger.error(`Analysis chain failed: ${error.message}`);
        throw error;
      }
    },
  };
}

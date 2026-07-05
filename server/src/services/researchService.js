import { searchCompany } from '../tools/companySearchTool.js';
import { resolveTickerSymbol, fetchFinancialData } from '../tools/financialDataTool.js';
import { searchNews } from '../tools/newsSearchTool.js';
import { createResearchChain } from '../chains/researchChain.js';
import { createFinancialChain } from '../chains/financialChain.js';
import { createNewsChain } from '../chains/newsChain.js';
import { createAnalysisChain } from '../chains/analysisChain.js';
import { createRecommendationChain } from '../chains/recommendationChain.js';
import logger from '../utils/logger.js';

/**
 * Orchestrates the complete AI investment research pipeline.
 *
 * Pipeline Steps:
 * 1. Search company information (Tavily)
 * 2. Resolve ticker & fetch financial data (Yahoo Finance)
 * 3. Search recent news (Tavily/NewsAPI)
 * 4. Analyze business fundamentals (LLM)
 * 5. Analyze financial health (LLM)
 * 6. Analyze news sentiment (LLM)
 * 7. Evaluate risks & opportunities (LLM)
 * 8. Generate final recommendation (LLM)
 *
 * @param {string} companyName - The name of the public company to research
 * @param {Function} onProgress - Optional callback for progress updates
 * @returns {Object} Complete investment research report
 */
export async function conductResearch(companyName, onProgress) {
  const progress = onProgress || (() => {});

  logger.info(`Starting research pipeline for: ${companyName}`);
  const startTime = Date.now();

  // ── Step 1: Gather raw data in parallel ────────────────────────────
  progress({ step: 1, message: 'Searching company information...' });

  // Resolve ticker symbol first (needed for financial data)
  const tickerSymbol = await resolveTickerSymbol(companyName);
  logger.info(`Ticker resolved: ${tickerSymbol}`);

  // Fetch all raw data in parallel for speed
  const [searchData, financialData, newsData] = await Promise.all([
    searchCompany(companyName).then((data) => {
      progress({ step: 2, message: 'Company information gathered' });
      return data;
    }),
    fetchFinancialData(tickerSymbol).then((data) => {
      progress({ step: 3, message: 'Financial data collected' });
      return data;
    }),
    searchNews(companyName).then((data) => {
      progress({ step: 4, message: 'Recent news collected' });
      return data;
    }),
  ]);

  const financialDataStr = JSON.stringify(financialData, null, 2);
  const newsDataStr = typeof newsData === 'string' ? newsData : JSON.stringify(newsData);

  // ── Step 2: Run AI analysis chains ─────────────────────────────────
  // These chains run sequentially because each builds on the previous output

  // 2a. Business overview analysis
  progress({ step: 5, message: 'Analyzing business fundamentals...' });
  const researchChain = createResearchChain();
  const businessOverview = await researchChain.invoke(companyName, searchData, financialDataStr);

  // 2b. Financial health analysis
  progress({ step: 6, message: 'Analyzing financial health...' });
  const financialChain = createFinancialChain();
  const financialAnalysis = await financialChain.invoke(companyName, financialDataStr);

  // 2c. News sentiment analysis
  progress({ step: 7, message: 'Analyzing news sentiment...' });
  const newsChain = createNewsChain();
  const newsAnalysis = await newsChain.invoke(companyName, newsDataStr);

  // 2d. Risk and opportunity assessment
  progress({ step: 8, message: 'Evaluating investment risks...' });
  const analysisChain = createAnalysisChain();
  const riskAnalysis = await analysisChain.invoke(
    companyName,
    businessOverview,
    financialAnalysis,
    newsAnalysis
  );

  // ── Step 3: Generate final recommendation ──────────────────────────
  progress({ step: 9, message: 'Generating investment recommendation...' });
  const recommendationChain = createRecommendationChain();
  const recommendation = await recommendationChain.invoke({
    companyName,
    businessOverview,
    financialAnalysis,
    newsAnalysis,
    riskAnalysis,
    financialData: financialDataStr,
  });

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  logger.success(`Research pipeline completed for ${companyName} in ${elapsed}s`);

  progress({ step: 10, message: 'Research complete!' });

  // Ensure the recommendation has the company name
  return {
    ...recommendation,
    company: recommendation.company || companyName,
    ticker: tickerSymbol,
    researchedAt: new Date().toISOString(),
    processingTime: `${elapsed}s`,
  };
}

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
 * 1. Resolve ticker symbol (Yahoo Finance or local lookup)
 * 2. Wait briefly to avoid Yahoo rate-limiting
 * 3. Fetch financial data (Yahoo) + company info (Tavily) + news (Tavily) in parallel
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

  // ── Step 1: Resolve ticker FIRST (may use local lookup, no API call) ─
  progress({ step: 1, message: 'Resolving company ticker symbol...' });

  const tickerSymbol = await resolveTickerSymbol(companyName);
  logger.info(`Ticker resolved: ${tickerSymbol}`);

  // Brief pause to avoid Yahoo rate-limiting before next Yahoo call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // ── Step 2: Gather raw data in parallel ─────────────────────────
  // Financial data (Yahoo) runs alongside company search + news (Tavily)
  // Since Tavily and Yahoo are different APIs, they won't rate-limit each other
  progress({ step: 2, message: 'Gathering company data & financials...' });

  const [searchData, financialData, newsData] = await Promise.all([
    searchCompany(companyName).then((data) => {
      progress({ step: 3, message: 'Company information gathered' });
      return data;
    }),
    fetchFinancialData(tickerSymbol).then((data) => {
      progress({ step: 4, message: 'Financial data collected' });
      return data;
    }),
    searchNews(companyName).then((data) => {
      progress({ step: 5, message: 'Recent news collected' });
      return data;
    }),
  ]);

  const financialDataStr = JSON.stringify(financialData, null, 2);
  const newsDataStr = typeof newsData === 'string' ? newsData : JSON.stringify(newsData);

  // ── Step 3: Run AI analysis chains ──────────────────────────────
  // These chains run sequentially because each builds on the previous output

  // 3a. Business overview analysis
  progress({ step: 6, message: 'Analyzing business fundamentals...' });
  let businessOverview;
  try {
    const researchChain = createResearchChain();
    businessOverview = await researchChain.invoke(companyName, searchData, financialDataStr);
  } catch (error) {
    logger.error(`Business overview chain failed: ${error.message}`);
    businessOverview = `Business overview analysis could not be completed for ${companyName}. Available data: ${searchData?.substring(0, 500) || 'None'}`;
  }

  // 3b. Financial health analysis
  progress({ step: 7, message: 'Analyzing financial health...' });
  let financialAnalysis;
  try {
    const financialChain = createFinancialChain();
    financialAnalysis = await financialChain.invoke(companyName, financialDataStr);
  } catch (error) {
    logger.error(`Financial chain failed: ${error.message}`);
    financialAnalysis = `Financial analysis could not be completed for ${companyName}. Raw data: ${financialDataStr?.substring(0, 500) || 'None'}`;
  }

  // 3c. News sentiment analysis
  progress({ step: 8, message: 'Analyzing news sentiment...' });
  let newsAnalysis;
  try {
    const newsChain = createNewsChain();
    newsAnalysis = await newsChain.invoke(companyName, newsDataStr);
  } catch (error) {
    logger.error(`News chain failed: ${error.message}`);
    newsAnalysis = `News analysis could not be completed for ${companyName}. Raw news data: ${newsDataStr?.substring(0, 500) || 'None'}`;
  }

  // 3d. Risk and opportunity assessment
  progress({ step: 9, message: 'Evaluating investment risks...' });
  let riskAnalysis;
  try {
    const analysisChain = createAnalysisChain();
    riskAnalysis = await analysisChain.invoke(
      companyName,
      businessOverview,
      financialAnalysis,
      newsAnalysis
    );
  } catch (error) {
    logger.error(`Risk analysis chain failed: ${error.message}`);
    riskAnalysis = `Risk analysis could not be completed for ${companyName}. Will base recommendation on available analyses.`;
  }

  // ── Step 4: Generate final recommendation ───────────────────────
  progress({ step: 10, message: 'Generating investment recommendation...' });
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

  progress({ step: 11, message: 'Research complete!' });

  // Ensure the recommendation has the company name
  return {
    ...recommendation,
    company: recommendation.company || companyName,
    ticker: recommendation.ticker || tickerSymbol,
    researchedAt: new Date().toISOString(),
    processingTime: `${elapsed}s`,
  };
}

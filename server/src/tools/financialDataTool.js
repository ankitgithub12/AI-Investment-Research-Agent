import yahooFinance from 'yahoo-finance2';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import logger from '../utils/logger.js';

/**
 * Creates a LangChain tool that fetches financial data from Yahoo Finance.
 */
export function createFinancialDataTool() {
  return new DynamicStructuredTool({
    name: 'financial_data',
    description: 'Fetch financial data for a public company including stock price, market cap, P/E ratio, revenue, and key financial metrics.',
    schema: z.object({
      symbol: z.string().describe('The stock ticker symbol (e.g., AAPL, TSLA)'),
    }),
    func: async ({ symbol }) => {
      const data = await fetchFinancialData(symbol);
      return JSON.stringify(data);
    },
  });
}

/**
 * Resolves a company name to its stock ticker symbol.
 */
export async function resolveTickerSymbol(companyName) {
  try {
    const results = await yahooFinance.search(companyName);

    if (results.quotes && results.quotes.length > 0) {
      // Prefer equity type results
      const equity = results.quotes.find(
        (q) => q.quoteType === 'EQUITY' || q.typeDisp === 'Equity'
      );
      const match = equity || results.quotes[0];
      logger.info(`Resolved "${companyName}" to ticker: ${match.symbol}`);
      return match.symbol;
    }

    // Fallback: use the company name as-is (might work for simple tickers)
    logger.warn(`Could not resolve ticker for "${companyName}", using name as symbol`);
    return companyName.toUpperCase();
  } catch (error) {
    logger.error(`Ticker resolution failed for "${companyName}": ${error.message}`);
    return companyName.toUpperCase();
  }
}

/**
 * Fetches comprehensive financial data for a given ticker symbol.
 */
export async function fetchFinancialData(symbol) {
  try {
    logger.info(`Fetching financial data for: ${symbol}`);

    // Fetch quote data
    const quote = await yahooFinance.quote(symbol);

    // Fetch detailed summary with multiple modules
    let summary = {};
    try {
      summary = await yahooFinance.quoteSummary(symbol, {
        modules: [
          'assetProfile',
          'financialData',
          'defaultKeyStatistics',
          'incomeStatementHistory',
          'balanceSheetHistory',
          'cashflowStatementHistory',
          'earningsTrend',
        ],
      });
    } catch (summaryError) {
      logger.warn(`QuoteSummary partial failure for ${symbol}: ${summaryError.message}`);
    }

    const financials = {
      symbol: quote.symbol,
      companyName: quote.shortName || quote.longName || symbol,
      currentPrice: quote.regularMarketPrice,
      currency: quote.currency,
      marketCap: quote.marketCap,
      peRatio: quote.trailingPE,
      forwardPE: quote.forwardPE,
      priceToBook: quote.priceToBook,
      fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: quote.fiftyTwoWeekLow,
      dividendYield: quote.dividendYield,
      volume: quote.regularMarketVolume,
      averageVolume: quote.averageVolume,
      dayChange: quote.regularMarketChangePercent,

      // From asset profile
      sector: summary.assetProfile?.sector || 'N/A',
      industry: summary.assetProfile?.industry || 'N/A',
      employees: summary.assetProfile?.fullTimeEmployees || 'N/A',
      website: summary.assetProfile?.website || 'N/A',
      description: summary.assetProfile?.longBusinessSummary || '',

      // From financial data
      totalRevenue: summary.financialData?.totalRevenue || null,
      revenueGrowth: summary.financialData?.revenueGrowth || null,
      grossMargin: summary.financialData?.grossMargins || null,
      operatingMargin: summary.financialData?.operatingMargins || null,
      profitMargin: summary.financialData?.profitMargins || null,
      returnOnEquity: summary.financialData?.returnOnEquity || null,
      debtToEquity: summary.financialData?.debtToEquity || null,
      currentRatio: summary.financialData?.currentRatio || null,
      freeCashFlow: summary.financialData?.freeCashflow || null,
      operatingCashFlow: summary.financialData?.operatingCashflow || null,
      totalDebt: summary.financialData?.totalDebt || null,
      totalCash: summary.financialData?.totalCash || null,
      earningsGrowth: summary.financialData?.earningsGrowth || null,
      revenuePerShare: summary.financialData?.revenuePerShare || null,
      targetMeanPrice: summary.financialData?.targetMeanPrice || null,
      recommendationMean: summary.financialData?.recommendationMean || null,
      recommendationKey: summary.financialData?.recommendationKey || null,

      // Key statistics
      beta: summary.defaultKeyStatistics?.beta || null,
      enterpriseValue: summary.defaultKeyStatistics?.enterpriseValue || null,
      pegRatio: summary.defaultKeyStatistics?.pegRatio || null,
      shortRatio: summary.defaultKeyStatistics?.shortRatio || null,
    };

    logger.success(`Financial data fetched for: ${symbol}`);
    return financials;
  } catch (error) {
    logger.error(`Financial data fetch failed for ${symbol}: ${error.message}`);
    return {
      symbol,
      error: true,
      message: `Failed to fetch financial data for ${symbol}: ${error.message}`,
    };
  }
}

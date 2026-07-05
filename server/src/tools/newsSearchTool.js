import { TavilySearch } from '@langchain/tavily';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import config from '../config/index.js';
import logger from '../utils/logger.js';

/**
 * Creates a LangChain tool that searches for recent news about a company.
 */
export function createNewsSearchTool() {
  return new DynamicStructuredTool({
    name: 'news_search',
    description: 'Search for recent news articles about a public company.',
    schema: z.object({
      query: z.string().describe('The company name to search news for'),
    }),
    func: async ({ query }) => {
      const data = await searchNews(query);
      return JSON.stringify(data);
    },
  });
}

/**
 * Searches for recent news about a company using Tavily with news topic filter.
 * Falls back to NewsAPI if configured.
 */
export async function searchNews(companyName) {
  try {
    logger.info(`Searching news for: ${companyName}`);

    // Primary: Tavily with news topic
    const tavilySearch = new TavilySearch({
      apiKey: config.tavily.apiKey,
      maxResults: 8,
    });

    const results = await tavilySearch.invoke({
      query: `${companyName} latest news stock market financial results 2025`,
    });

    logger.success(`News search completed for: ${companyName}`);
    return typeof results === 'string' ? results : JSON.stringify(results);
  } catch (error) {
    logger.error(`News search failed: ${error.message}`);

    // Fallback: try NewsAPI if key is available
    if (config.newsApi.apiKey) {
      return await searchNewsApi(companyName);
    }

    return `Unable to find recent news for ${companyName}. News services may be temporarily unavailable.`;
  }
}

/**
 * Fallback news search using NewsAPI.
 */
async function searchNewsApi(companyName) {
  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(companyName)}&sortBy=publishedAt&pageSize=8&apiKey=${config.newsApi.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'ok' && data.articles) {
      const articles = data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        source: article.source?.name,
        url: article.url,
        publishedAt: article.publishedAt,
      }));
      return JSON.stringify(articles);
    }

    return `No news found for ${companyName} via NewsAPI.`;
  } catch (error) {
    logger.error(`NewsAPI fallback failed: ${error.message}`);
    return `Unable to fetch news for ${companyName}.`;
  }
}

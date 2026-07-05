import { PromptTemplate } from '@langchain/core/prompts';

/**
 * Prompt template for analyzing recent news and market sentiment.
 */
export const newsPrompt = PromptTemplate.fromTemplate(
  `You are a senior market analyst specializing in news sentiment analysis.

Analyze the following recent news about {companyName} and assess the overall market sentiment.

News Data:
{newsData}

Provide:
1. A summary of the key news themes
2. Overall sentiment assessment (Bullish, Neutral, or Bearish)
3. List of the 5 most significant recent news items with:
   - Title
   - Summary (1-2 sentences)
   - Sentiment (positive, neutral, or negative)
   - Potential impact on stock price (high, medium, low)
4. Any notable catalysts or headwinds mentioned in the news
5. How the news narrative might affect investor confidence

Be objective and balanced. Separate facts from opinions.`
);

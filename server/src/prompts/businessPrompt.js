import { PromptTemplate } from '@langchain/core/prompts';

/**
 * Prompt template for analyzing company business overview.
 * Takes raw search data and produces a structured business analysis.
 */
export const businessPrompt = PromptTemplate.fromTemplate(
  `You are a senior investment analyst specializing in business analysis.

Analyze the following company information and provide a comprehensive business overview.

Company: {companyName}

Search Data:
{searchData}

Financial Profile:
{financialData}

Provide your analysis focusing on:
1. What the company does (core business model)
2. Key products and services
3. Target markets and customer base
4. Competitive advantages (moat)
5. Leadership and management quality
6. Market position and industry standing

Be factual, specific, and cite numbers where available. If information is limited, state what is known and note gaps.`
);

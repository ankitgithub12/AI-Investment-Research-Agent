import { PromptTemplate } from '@langchain/core/prompts';

/**
 * Prompt template for evaluating investment risks.
 * Performs SWOT analysis and identifies key risk factors.
 */
export const riskPrompt = PromptTemplate.fromTemplate(
  `You are a senior risk analyst and investment strategist.

Based on all the following information about {companyName}, perform a comprehensive risk assessment.

Business Overview:
{businessOverview}

Financial Analysis:
{financialAnalysis}

News Sentiment:
{newsAnalysis}

Evaluate:
1. SWOT Analysis (Strengths, Weaknesses, Opportunities, Threats)
2. Key Risk Factors:
   - Market and competitive risks
   - Financial risks (debt, cash flow concerns)
   - Regulatory and legal risks
   - Operational risks
   - Macroeconomic risks
   - Technology and disruption risks
3. Growth Opportunities:
   - New markets and expansion
   - Product innovation
   - Strategic partnerships or M&A
   - Industry tailwinds
4. Overall Risk Level: Low, Medium, or High

Be specific and evidence-based. Rate each risk by likelihood and potential impact.`
);

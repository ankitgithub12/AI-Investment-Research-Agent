import { PromptTemplate } from '@langchain/core/prompts';

/**
 * Prompt template for generating the final investment recommendation.
 * Synthesizes all analyses into a structured Invest/Pass decision.
 */
export const recommendationPrompt = PromptTemplate.fromTemplate(
  `You are a senior investment advisor at a top-tier investment firm. You must provide a clear, well-reasoned investment recommendation.

Company: {companyName}

=== BUSINESS OVERVIEW ===
{businessOverview}

=== FINANCIAL HEALTH ===
{financialAnalysis}

=== NEWS & SENTIMENT ===
{newsAnalysis}

=== RISK ASSESSMENT ===
{riskAnalysis}

=== FINANCIAL DATA ===
{financialData}

Based on your comprehensive analysis, provide your final investment recommendation.

You MUST return a valid JSON object with EXACTLY this structure:
{{
  "company": "{companyName}",
  "recommendation": "Invest" or "Pass",
  "confidence": <number 0-100>,
  "investmentScore": <number 0-100>,
  "risk": "Low" or "Medium" or "High",
  "marketSentiment": "Bullish" or "Neutral" or "Bearish",
  "summary": "<3-4 sentence executive summary>",
  "businessOverview": "<comprehensive business description>",
  "financialHealth": {{
    "revenueGrowth": "<description with numbers>",
    "profitMargin": "<description with numbers>",
    "cashFlow": "<description with numbers>",
    "debtLevel": "<description with numbers>",
    "valuation": "<description with numbers>",
    "score": <number 0-100>
  }},
  "growth": {{
    "revenueGrowthRate": "<percentage or description>",
    "earningsGrowth": "<percentage or description>",
    "marketExpansion": "<description>",
    "innovationPipeline": "<description>",
    "score": <number 0-100>
  }},
  "valuation": {{
    "marketCap": "<formatted value>",
    "peRatio": "<value>",
    "forwardPE": "<value>",
    "pegRatio": "<value>",
    "priceToBook": "<value>",
    "assessment": "Undervalued" or "Fair Value" or "Overvalued"
  }},
  "competitivePosition": {{
    "marketPosition": "<description>",
    "competitiveAdvantages": ["<advantage1>", "<advantage2>"],
    "threats": ["<threat1>", "<threat2>"],
    "score": <number 0-100>
  }},
  "recentNews": [
    {{
      "title": "<news title>",
      "summary": "<brief summary>",
      "sentiment": "positive" or "neutral" or "negative",
      "impact": "high" or "medium" or "low"
    }}
  ],
  "risks": ["<risk1>", "<risk2>", "<risk3>", "<risk4>", "<risk5>"],
  "opportunities": ["<opportunity1>", "<opportunity2>", "<opportunity3>", "<opportunity4>", "<opportunity5>"],
  "reasoning": ["<reason1>", "<reason2>", "<reason3>", "<reason4>", "<reason5>"],
  "chartData": {{
    "investmentScoreBreakdown": [
      {{"category": "Financial Health", "score": <0-100>}},
      {{"category": "Growth", "score": <0-100>}},
      {{"category": "Valuation", "score": <0-100>}},
      {{"category": "Competitive Position", "score": <0-100>}},
      {{"category": "Market Sentiment", "score": <0-100>}},
      {{"category": "Management", "score": <0-100>}}
    ],
    "riskDistribution": [
      {{"category": "Market Risk", "level": <0-100>}},
      {{"category": "Financial Risk", "level": <0-100>}},
      {{"category": "Operational Risk", "level": <0-100>}},
      {{"category": "Regulatory Risk", "level": <0-100>}},
      {{"category": "Competition Risk", "level": <0-100>}}
    ],
    "sentimentBreakdown": [
      {{"name": "Positive", "value": <percentage>}},
      {{"name": "Neutral", "value": <percentage>}},
      {{"name": "Negative", "value": <percentage>}}
    ]
  }}
}}

Important:
- Be decisive: recommend either "Invest" or "Pass"
- Confidence must reflect your certainty (0-100)
- Investment score reflects overall attractiveness (0-100)
- All array fields must have at least 3 items
- All scores must be realistic and justified
- Return ONLY the JSON object, no markdown formatting`
);

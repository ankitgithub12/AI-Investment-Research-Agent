import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";
import config from "./index.js";
import logger from "../utils/logger.js";

const googleApiKey = config.google.apiKey;
const openRouterApiKey = config.openRouter.apiKey;
const geminiModel = config.google.model;
const openRouterModel = config.openRouter.model;

let primaryModel = null;
const fallbacks = [];

const getGeminiModel = () => {
  return new ChatGoogleGenerativeAI({
    apiKey: googleApiKey,
    model: geminiModel,
    temperature: 0.3,
    maxRetries: 1,
  });
};

const getOpenRouterModel = () => {
  return new ChatOpenAI({
    apiKey: openRouterApiKey,
    model: openRouterModel,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
    temperature: 0.3,
    maxRetries: 1,
  });
};

const hasGoogleKey = googleApiKey && googleApiKey !== 'your-gemini-api-key-here';
const hasOpenRouterKey = !!openRouterApiKey;

if (hasGoogleKey) {
  primaryModel = getGeminiModel();
  if (hasOpenRouterKey) {
    logger.info("LLM Layer: Configured Google Gemini as primary, OpenRouter as fallback.");
    fallbacks.push(getOpenRouterModel());
  } else {
    logger.info("LLM Layer: Configured Google Gemini as primary. No fallback configured.");
  }
} else if (hasOpenRouterKey) {
  primaryModel = getOpenRouterModel();
  if (hasGoogleKey) {
    logger.info("LLM Layer: Configured OpenRouter as primary, Google Gemini as fallback.");
    fallbacks.push(getGeminiModel());
  } else {
    logger.info("LLM Layer: Configured OpenRouter as primary. No fallback configured.");
  }
} else {
  throw new Error("No active LLM configurations found.");
}

export const llm = fallbacks.length > 0 
  ? primaryModel.withFallbacks({ fallbacks }) 
  : primaryModel;


import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
  temperature: 0.3,
});

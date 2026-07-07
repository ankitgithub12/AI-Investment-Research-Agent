import logger from './logger.js';

/**
 * Robustly parses a JSON string, stripping markdown code fences or surrounding text if present.
 * @param {string|Object} input - The input text from the LLM or message object
 * @returns {Object} Parsed JSON object
 * @throws {Error} If parsing fails after clean attempts
 */
export function parseJSON(input) {
  let text = typeof input === 'string' ? input : input?.content;
  if (!text) {
    text = String(input || '');
  }

  const cleanText = text.trim();

  // Try direct parse first
  try {
    return JSON.parse(cleanText);
  } catch (directError) {
    // Try extracting from markdown code block
    const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)```/i;
    const match = cleanText.match(jsonBlockRegex);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1].trim());
      } catch (blockError) {
        logger.warn('Failed to parse content inside markdown code block', { error: blockError.message });
      }
    }

    // Try finding the first '{' and last '}'
    const startIndex = cleanText.indexOf('{');
    const endIndex = cleanText.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      const candidate = cleanText.slice(startIndex, endIndex + 1);
      try {
        return JSON.parse(candidate);
      } catch (substringError) {
        logger.warn('Failed to parse content between first { and last }', { error: substringError.message });
      }
    }

    logger.error('All JSON parsing attempts failed', { rawText: text });
    throw new Error('Could not parse response as valid JSON.');
  }
}

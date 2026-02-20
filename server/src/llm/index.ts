import LlmFactory from './LlmFactory';
import LlmManager from './LlmManager';

const gemini = LlmFactory.create('gemini');
const groq = LlmFactory.create('groq');

export const llmProvider = new LlmManager([gemini, groq]);

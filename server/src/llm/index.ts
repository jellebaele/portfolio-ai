import { config } from '@/config';
import { LlmConfig } from './ILlmProvider';
import LlmFactory from './LlmFactory';
import LlmManager from './LlmManager';

const llmProviders: LlmConfig[] = [
  {
    tier: 'smart',
    type: 'gemini',
    apiKey: config.llm.apiKeyGemini,
    modelName: config.llm.modelNameGemini
  },
  {
    tier: 'fast',
    type: 'gemini',
    apiKey: config.llm.apiKeyGemini,
    modelName: config.llm.modelNameGeminiLite
  },
  { tier: 'fast', type: 'groq', apiKey: config.llm.apiKeyGroq, modelName: config.llm.modelNameGroq }
];

const providers = llmProviders.map(p => LlmFactory.create(p));

export const llmProvider = new LlmManager(providers);

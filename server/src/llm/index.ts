import LlmFactory from './LlmFactory';
import LlmManager from './LlmManager';

const gemini = LlmFactory.create('gemini');

export const llmProvider = new LlmManager([gemini]);

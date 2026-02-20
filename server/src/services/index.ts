import LlmFactory from '@/llm/LlmFactory';
import IngestService from './IngestService';
import ResumeService from './ResumeService';

const llmProvider = LlmFactory.create();

export const resumeService = new ResumeService(llmProvider);
export const ingestService = new IngestService();

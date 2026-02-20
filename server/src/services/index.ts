import { llmProvider } from '@/llm';
import IngestService from './IngestService';
import ResumeService from './ResumeService';

export const resumeService = new ResumeService(llmProvider);
export const ingestService = new IngestService();

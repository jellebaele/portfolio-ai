import { llmProvider } from '@/llm';
import IngestService from './IngestService';
import ResumeService from './ResumeService';
import VectorService from './VectorService';

const vectorService = new VectorService(llmProvider);
export const resumeService = new ResumeService(llmProvider, vectorService);
export const ingestService = new IngestService();

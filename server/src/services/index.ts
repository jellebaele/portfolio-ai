import { llmProvider } from '@/llm';
import ResumeService from './ResumeService';
import VectorService from './VectorService';
import IngestService from './ingestService';

const vectorService = new VectorService(llmProvider);
export const resumeService = new ResumeService(llmProvider, vectorService);
export const ingestService = new IngestService();

import { llmProvider } from '@/llm';
import VectorService from './VectorService';
import IngestService from './ingestService';
import ResumeService from './resumeService';

const vectorService = new VectorService(llmProvider);
export const resumeService = new ResumeService(llmProvider, vectorService);
export const ingestService = new IngestService();

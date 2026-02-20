import { connectDB } from '@/database/database';
import IngestService from '@/services/ingestService';

async function seed() {
  await connectDB();
  const service = new IngestService();
  await service.ingestMarkdownFiles();
}

seed();

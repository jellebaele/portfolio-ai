import { connectVectorDatabase } from '@/database/vectorDatabase';
import { ingestService } from '@/services';

async function seed() {
  await connectVectorDatabase();
  await ingestService.ingestMarkdownFiles();
}

seed();
